'use client';

import React, { useState, useEffect, useRef } from 'react';
import { nursingScripts, getScriptById, type ConversationStep, type MonologueCue } from '../scripts/nursingScripts';

const SimpleNursingRolePlayMobile: React.FC = () => {
  // Basic state
  const [selectedScriptId, setSelectedScriptId] = useState('pre-op-anxiety');
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  // Audio state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Get current script
  const currentScript = getScriptById(selectedScriptId);
  const isMonologue = currentScript?.type === 'monologue';
  const isConversation = currentScript?.type === 'conversation';

  // Get the appropriate script data based on type
  const monologueCues = currentScript?.monologueCues || [];
  const conversationSteps = currentScript?.conversationSteps || [];

  // Initialize speech recognition and synthesis
  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Check if speech recognition is supported (only on client)
    if (typeof window !== 'undefined') {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        setSpeechSupported(true);
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          recognitionRef.current.lang = 'en-US';
          
          recognitionRef.current.onresult = (event) => {
            console.log('Speech recognition result received:', event);
            const transcript = event.results[0][0].transcript;
            console.log('Transcript:', transcript);
            setUserResponse(transcript);
            setIsListening(false);
          };
          
          recognitionRef.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert(`Speech recognition error: ${event.error}. Please check microphone permissions.`);
            setIsListening(false);
          };
          
          recognitionRef.current.onstart = () => {
            console.log('Speech recognition started');
          };
          
          recognitionRef.current.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
          };
        }
      }

      // Initialize speech synthesis (only on client)
      if ('speechSynthesis' in window) {
        synthRef.current = window.speechSynthesis;
      }
    }
  }, []);

  // Request microphone permission
  const requestMicrophonePermission = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        return true;
      }
    } catch (error) {
      console.error('Microphone permission denied:', error);
      alert('Microphone access was denied. Please allow microphone access to use voice input.');
      return false;
    }
    return false;
  };

  // Speech functions
  const startListening = async () => {
    console.log('startListening called', { recognitionRef: !!recognitionRef.current, speechSupported });
    
    if (recognitionRef.current && speechSupported) {
      // Request microphone permission first
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        return;
      }
      
      try {
        setIsListening(true);
        setUserResponse('');
        console.log('Starting speech recognition...');
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert(`Error starting microphone: ${error instanceof Error ? error.message : 'Unknown error'}. Please check microphone permissions.`);
        setIsListening(false);
      }
    } else {
      console.log('Speech recognition not available', { recognitionRef: !!recognitionRef.current, speechSupported });
      alert('Speech recognition is not available. Please check browser compatibility and microphone permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speakText = (text: string, voiceType: 'patient' | 'system' = 'patient') => {
    if (synthRef.current) {
      // Stop any current speech
      synthRef.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice based on type
      const voices = synthRef.current.getVoices();
      if (voiceType === 'patient') {
        // Try to find a more natural voice for patient
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Natural') || 
          voice.name.includes('Enhanced') ||
          voice.name.includes('Premium')
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
      } else {
        // System voice - more neutral
        const systemVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        if (systemVoice) {
          utterance.voice = systemVoice;
        }
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      synthRef.current.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
    }
  };

  // Auto-play patient statements when entering conversation steps
  useEffect(() => {
    if (isConversation && autoPlayEnabled && conversationSteps[currentStep]) {
      // Small delay to ensure UI is ready
      setTimeout(() => {
        speakText(conversationSteps[currentStep].patientStatement, 'patient');
      }, 500);
    }
  }, [currentStep, isConversation, autoPlayEnabled, conversationSteps]);

  // Navigation functions
  const changeScript = (scriptId: string) => {
    stopSpeaking();
    setSelectedScriptId(scriptId);
    setCurrentStep(0);
    setUserResponse('');
    setShowResponse(false);
    setShowGuidance(false);
  };

  const nextStep = () => {
    stopSpeaking();
    const maxSteps = isMonologue ? monologueCues.length : conversationSteps.length;
    if (currentStep < maxSteps - 1) {
      setCurrentStep(currentStep + 1);
      setUserResponse('');
      setShowResponse(false);
      setShowGuidance(false);
    }
  };

  const previousStep = () => {
    stopSpeaking();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setUserResponse('');
      setShowResponse(false);
      setShowGuidance(false);
    }
  };

  const resetScenario = () => {
    stopSpeaking();
    setCurrentStep(0);
    setUserResponse('');
    setShowResponse(false);
    setShowGuidance(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-blue-800 mb-2">
          Nursing Role-Play Practice
        </h1>
        <p className="text-sm text-blue-600">
          Practice with voice - speak your responses and hear patient interactions
        </p>
      </div>

      {/* Audio Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Audio Settings</span>
          <div className="flex items-center space-x-4">
            {speechSupported && (
              <button
                onClick={startListening}
                className="text-blue-600 hover:text-blue-800 text-sm"
                disabled={isListening || isPlaying}
              >
                🎤 Test Microphone
              </button>
            )}
            {isPlaying && (
              <button
                onClick={stopSpeaking}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                🔇 Stop Audio
              </button>
            )}
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={autoPlayEnabled}
                onChange={(e) => setAutoPlayEnabled(e.target.checked)}
                className="mr-2"
              />
              Auto-play Patient
            </label>
          </div>
        </div>
        <div className="text-xs text-gray-600">
          {speechSupported ? (
            <span className="text-green-600">✓ Voice recognition available</span>
          ) : (
            <span className="text-orange-600">⚠ Voice recognition not supported</span>
          )}
          {' | '}
          {isClient && typeof window !== 'undefined' && 'speechSynthesis' in window ? (
            <span className="text-green-600">✓ Voice synthesis available</span>
          ) : (
            <span className="text-orange-600">⚠ Voice synthesis not supported</span>
          )}
        </div>
      </div>

      {/* Script Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a Scenario:
        </label>
        <select 
          value={selectedScriptId}
          onChange={(e) => changeScript(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg bg-white"
        >
          {nursingScripts.map((script) => (
            <option key={script.id} value={script.id}>
              {script.title} ({script.type} - {script.difficulty})
            </option>
          ))}
        </select>
        {currentScript && (
          <div className="mt-2">
            <p className="text-xs text-gray-600">
              {currentScript.description}
            </p>
            <p className="text-xs text-blue-600 font-medium mt-1">
              Type: {currentScript.type === 'monologue' ? 'Documentation Practice' : 'Patient Conversation'}
            </p>
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{currentStep + 1} of {isMonologue ? monologueCues.length : conversationSteps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${isMonologue ? 
                ((currentStep + 1) / Math.max(monologueCues.length, 1)) * 100 : 
                ((currentStep + 1) / Math.max(conversationSteps.length, 1)) * 100}%` 
            }}
          ></div>
        </div>
      </div>

      {/* Monologue Content */}
      {isMonologue && monologueCues[currentStep] && (
        <div className="mb-6">
          <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-2 bg-blue-400"></span>
                <span className="font-semibold text-sm">Documentation Cue #{currentStep + 1}</span>
              </div>
              <button
                onClick={() => speakText(monologueCues[currentStep].cueText, 'system')}
                className="text-blue-600 hover:text-blue-800 text-sm"
                disabled={isPlaying}
              >
                🔊 Play Cue
              </button>
            </div>
            <p className="text-gray-800 leading-relaxed font-medium">
              {monologueCues[currentStep].cueText}
            </p>
            <div className="mt-3 text-sm text-blue-600">
              <span className="font-medium">Time estimate:</span> {monologueCues[currentStep].timeEstimate}
            </div>
          </div>

          {/* Voice Recording for Monologue */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">🎤 Speak Your Documentation:</h3>
            
            {speechSupported && (
              <div className="mb-4">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-full py-4 px-4 rounded-lg font-medium transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                  disabled={isPlaying}
                >
                  {isListening ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-pulse mr-2">🎤</span>
                      Recording... Tap to stop
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🎤</span>
                      Tap to record your documentation
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Fallback text input */}
            <div className="mb-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder={speechSupported ? "Your spoken response will appear here, or type directly..." : "Type your documentation response here..."}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
              />
            </div>

            {userResponse && !showResponse && (
              <button
                onClick={() => setShowResponse(true)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Show Feedback
              </button>
            )}

            {/* Monologue feedback */}
            {showResponse && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <h4 className="font-medium text-green-800 mb-2">Evaluation Criteria:</h4>
                <ul className="list-disc list-inside text-sm text-green-700 space-y-1 mb-3">
                  {monologueCues[currentStep].evaluationCriteria.map((criteria: string, index: number) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
                
                <div className="border-t border-green-200 pt-3">
                  <p className="text-sm font-medium text-green-800 mb-2">Expected Content Example:</p>
                  <p className="text-sm text-green-700">
                    {monologueCues[currentStep].expectedContent}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conversation Content */}
      {isConversation && conversationSteps[currentStep] && (
        <div className="mb-6">
          <div className="p-4 rounded-lg bg-gray-100 border-l-4 border-gray-400 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 rounded-full mr-2 bg-gray-400"></span>
                <span className="font-semibold text-sm">Patient Says:</span>
              </div>
              <button
                onClick={() => speakText(conversationSteps[currentStep].patientStatement, 'patient')}
                className="text-gray-600 hover:text-gray-800 text-sm"
                disabled={isPlaying}
              >
                🔊 Replay
              </button>
            </div>
            <p className="text-gray-800 leading-relaxed">
              {conversationSteps[currentStep].patientStatement}
            </p>
          </div>

          {/* Voice Recording for Conversation */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-3">🎤 Your Therapeutic Response:</h3>
            
            {speechSupported && (
              <div className="mb-4">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-full py-4 px-4 rounded-lg font-medium transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  disabled={isPlaying}
                >
                  {isListening ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-pulse mr-2">🎤</span>
                      Recording... Tap to stop
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">🎤</span>
                      Tap to speak your response
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Fallback text input */}
            <div className="mb-4">
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder={speechSupported ? "Your spoken response will appear here, or type directly..." : "Type your therapeutic response here..."}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
            </div>

            {userResponse && !showResponse && (
              <button
                onClick={() => setShowResponse(true)}
                className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Show Sample Response & Feedback
              </button>
            )}

            {/* Conversation feedback */}
            {showResponse && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-800">Sample Nurse Response:</h4>
                  <button
                    onClick={() => speakText(conversationSteps[currentStep].expectedNurseResponse, 'system')}
                    className="text-green-600 hover:text-green-800 text-sm"
                    disabled={isPlaying}
                  >
                    🔊 Hear Sample
                  </button>
                </div>
                <p className="text-green-700 text-sm leading-relaxed mb-3">
                  {conversationSteps[currentStep].expectedNurseResponse}
                </p>
                
                <div className="border-t border-green-200 pt-3">
                  <p className="text-sm font-medium text-green-800 mb-2">Key Points to Address:</p>
                  <ul className="list-disc list-inside text-sm text-green-700 space-y-1 mb-3">
                    {conversationSteps[currentStep].keyPoints.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-green-200 pt-3 mt-3">
                  <p className="text-sm font-medium text-green-800 mb-2">Therapeutic Techniques:</p>
                  <div className="flex flex-wrap gap-1">
                    {conversationSteps[currentStep].therapeuticTechniques.map((technique: string, index: number) => (
                      <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      {((isMonologue && monologueCues.length > 0) || (isConversation && conversationSteps.length > 0)) && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={previousStep}
            disabled={currentStep === 0}
            className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={
              currentStep >= (isMonologue ? monologueCues.length : conversationSteps.length) - 1
            }
            className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Reset button */}
      {((isMonologue && monologueCues.length > 0) || (isConversation && conversationSteps.length > 0)) && (
        <button
          onClick={resetScenario}
          className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors mb-4"
        >
          Reset Scenario
        </button>
      )}

      {/* No scenarios loaded fallback */}
      {(!isMonologue || monologueCues.length === 0) && (!isConversation || conversationSteps.length === 0) && (
        <div className="text-center">
          <p>Selected: {currentScript?.title}</p>
          <p className="text-sm text-gray-600 mt-2">
            {isMonologue ? 'Documentation Practice Mode' : 'Conversation Practice Mode'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SimpleNursingRolePlayMobile;
