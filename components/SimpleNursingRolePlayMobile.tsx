'use client';

import React, { useState, useEffect, useRef } from 'react';

interface DialogueLine {
  speaker: 'nurse' | 'patient';
  text: string;
  id: number;
}

const SimpleNursingRolePlayMobile: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [userResponse, setUserResponse] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Sample nursing scenario dialogue
  const scenario: DialogueLine[] = [
    { id: 1, speaker: 'patient', text: 'Nurse, I\'m feeling really anxious about my surgery tomorrow. Can you help me understand what to expect?' },
    { id: 2, speaker: 'nurse', text: 'I understand your concerns. It\'s completely normal to feel anxious before surgery. Let me walk you through what will happen...' },
    { id: 3, speaker: 'patient', text: 'Will I be in a lot of pain afterward? I\'m worried about how I\'ll manage.' },
    { id: 4, speaker: 'nurse', text: 'Pain management is one of our top priorities. We have several effective options available to keep you comfortable...' },
    { id: 5, speaker: 'patient', text: 'Thank you for explaining everything. I feel much better now. When should I stop eating before the surgery?' },
    { id: 6, speaker: 'nurse', text: 'You should stop eating solid foods 8 hours before your surgery, and clear liquids 2 hours before. This helps ensure your safety during the procedure.' }
  ];

  useEffect(() => {
    // Check if speech recognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setUserResponse(transcript);
          setShowResponse(true);
          setIsListening(false);
        };
        
        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      setUserResponse('');
      setShowResponse(false);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const nextStep = () => {
    if (currentStep < scenario.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowResponse(false);
      setUserResponse('');
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setShowResponse(false);
      setUserResponse('');
    }
  };

  const resetScenario = () => {
    setCurrentStep(0);
    setShowResponse(false);
    setUserResponse('');
    setIsListening(false);
  };

  const currentDialogue = scenario[currentStep];
  const isNurseResponse = currentDialogue.speaker === 'nurse';

  return (
    <div className="max-w-md mx-auto p-4 bg-white min-h-screen">
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-blue-800 mb-2">
          Nursing Role-Play Practice
        </h1>
        <p className="text-sm text-blue-600">
          Practice responding to patient concerns in a realistic scenario
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{currentStep + 1} of {scenario.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / scenario.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current dialogue */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg ${
          currentDialogue.speaker === 'patient' 
            ? 'bg-gray-100 border-l-4 border-gray-400' 
            : 'bg-green-50 border-l-4 border-green-400'
        }`}>
          <div className="flex items-center mb-2">
            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
              currentDialogue.speaker === 'patient' ? 'bg-gray-400' : 'bg-green-400'
            }`}></span>
            <span className="font-semibold text-sm">
              {currentDialogue.speaker === 'patient' ? 'Patient' : 'Nurse'}
            </span>
          </div>
          <p className="text-gray-800 leading-relaxed">
            {currentDialogue.text}
          </p>
        </div>
      </div>

      {/* Response section - only show for patient lines */}
      {!isNurseResponse && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your Response as the Nurse:</h3>
          
          {/* Speech recognition controls */}
          {speechSupported && (
            <div className="mb-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  isListening 
                    ? 'bg-red-500 text-white' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={showResponse}
              >
                {isListening ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-pulse mr-2">🎤</span>
                    Listening... Tap to stop
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

          {/* Manual text input fallback */}
          <div className="mb-4">
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder={speechSupported ? "Or type your response here..." : "Type your response here..."}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none"
              rows={3}
            />
          </div>

          {/* Show response button */}
          {userResponse && !showResponse && (
            <button
              onClick={() => setShowResponse(true)}
              className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Show Sample Response
            </button>
          )}

          {/* Sample response */}
          {showResponse && scenario[currentStep + 1] && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
              <h4 className="font-medium text-green-800 mb-2">Sample Nurse Response:</h4>
              <p className="text-green-700 text-sm leading-relaxed">
                {scenario[currentStep + 1].text}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation controls */}
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
          disabled={currentStep === scenario.length - 1}
          className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Reset button */}
      <button
        onClick={resetScenario}
        className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
      >
        Reset Scenario
      </button>

      {/* Speech support indicator */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          {speechSupported ? (
            <span className="text-green-600">✓ Speech recognition supported</span>
          ) : (
            <span className="text-orange-600">⚠ Speech recognition not available - use text input</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default SimpleNursingRolePlayMobile;