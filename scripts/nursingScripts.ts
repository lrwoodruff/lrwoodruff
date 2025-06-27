export interface MonologueCue {
  id: number;
  cueText: string;
  expectedContent: string;
  guidance: string;
  keyPoints: string[];
  timeEstimate: string; // e.g., "30-45 seconds"
  evaluationCriteria: string[];
}

export interface ConversationStep {
  id: number;
  patientStatement: string;
  expectedNurseResponse: string;
  agentGuidance: string;
  keyPoints: string[];
  evaluationCriteria: string[];
  followUpQuestions?: string[];
  therapeuticTechniques: string[];
}

export interface NursingScript {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'pre-operative' | 'post-operative' | 'emergency' | 'mental-health' | 'pediatric' | 'geriatric';
  type: 'monologue' | 'conversation';
  monologueCues?: MonologueCue[];
  conversationSteps?: ConversationStep[];
}

// Legacy support for existing conversation scripts
export interface ScriptStep extends ConversationStep {}

export const nursingScripts: NursingScript[] = [
  {
    id: 'pre-op-anxiety',
    title: 'Pre-Operative Anxiety Management',
    description: 'Help a patient manage anxiety before surgery',
    difficulty: 'beginner',
    category: 'pre-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "Nurse, I'm feeling really anxious about my surgery tomorrow. Can you help me understand what to expect?",
        expectedNurseResponse: "I understand your concerns, and it's completely normal to feel anxious before surgery. Let me walk you through what will happen step by step to help ease your worries.",
        agentGuidance: "Use therapeutic communication techniques: acknowledge feelings, normalize the experience, and offer information. Maintain a calm, reassuring tone.",
        keyPoints: [
          "Acknowledge the patient's anxiety",
          "Normalize pre-surgical anxiety",
          "Offer to provide information",
          "Use empathetic tone"
        ],
        evaluationCriteria: [
          "Shows empathy and understanding",
          "Validates patient's feelings",
          "Offers appropriate support",
          "Maintains professional demeanor"
        ],
        followUpQuestions: [
          "What specific aspects of the surgery are you most concerned about?",
          "Have you had any previous surgeries?",
          "Would you like me to explain the pre-operative process?"
        ],
        therapeuticTechniques: [
          "Active listening",
          "Empathetic responding",
          "Information giving",
          "Reassurance"
        ]
      },
      {
        id: 2,
        patientStatement: "Will I be in a lot of pain afterward? I'm worried about how I'll manage.",
        expectedNurseResponse: "Pain management is one of our top priorities. We have several effective options available including medications and comfort measures. We'll work together to keep you as comfortable as possible throughout your recovery.",
        agentGuidance: "Address pain concerns directly, explain available options, and emphasize collaborative care. Avoid minimizing their concerns.",
        keyPoints: [
          "Acknowledge pain concerns as valid",
          "Explain available pain management options",
          "Emphasize team approach to care",
          "Provide reassurance about pain control"
        ],
        evaluationCriteria: [
          "Addresses concerns directly",
          "Provides specific information about pain management",
          "Reassures without dismissing concerns",
          "Mentions collaborative approach"
        ],
        followUpQuestions: [
          "Do you have any allergies to pain medications?",
          "What is your typical pain tolerance like?",
          "Would you like to know more about our pain scale?"
        ],
        therapeuticTechniques: [
          "Information giving",
          "Reassurance",
          "Collaborative planning",
          "Education"
        ]
      },
      {
        id: 3,
        patientStatement: "Thank you for explaining everything. I feel much better now. When should I stop eating before the surgery?",
        expectedNurseResponse: "I'm so glad you're feeling better! For your safety during anesthesia, you should stop eating solid foods 8 hours before your surgery and clear liquids 2 hours before. This helps prevent complications during the procedure.",
        agentGuidance: "Acknowledge their improved emotional state, then provide clear, specific pre-operative instructions with rationale for patient safety.",
        keyPoints: [
          "Acknowledge patient's improved feelings",
          "Provide specific NPO (nothing by mouth) guidelines",
          "Explain rationale for fasting requirements",
          "Emphasize patient safety"
        ],
        evaluationCriteria: [
          "Recognizes patient's emotional improvement",
          "Provides accurate NPO instructions",
          "Explains reasoning behind instructions",
          "Emphasizes safety aspects"
        ],
        followUpQuestions: [
          "Do you have any other questions about the pre-operative instructions?",
          "Would you like a written copy of these instructions?",
          "Is there anything else about the surgery that concerns you?"
        ],
        therapeuticTechniques: [
          "Positive reinforcement",
          "Patient education",
          "Safety teaching",
          "Clear communication"
        ]
      }
    ]
  },
  {
    id: 'handoff-report',
    title: 'Patient Handoff Report',
    description: 'Practice delivering a comprehensive handoff report using SBAR format',
    difficulty: 'intermediate',
    category: 'pre-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Situation: Introduce the patient and current status",
        expectedContent: "Patient identification, age, admission reason, current condition",
        guidance: "Start with patient name, age, room number, and primary diagnosis. Be clear and concise.",
        keyPoints: [
          "Patient name and room number",
          "Age and admission date",
          "Primary diagnosis or reason for admission",
          "Current status (stable, critical, etc.)"
        ],
        timeEstimate: "30-45 seconds",
        evaluationCriteria: [
          "Includes all essential patient identifiers",
          "States primary diagnosis clearly",
          "Indicates current condition status",
          "Uses professional terminology"
        ]
      },
      {
        id: 2,
        cueText: "Background: Provide relevant medical history and context",
        expectedContent: "Pertinent medical history, allergies, medications, recent procedures",
        guidance: "Share relevant medical history that impacts current care. Include allergies and current medications.",
        keyPoints: [
          "Relevant medical history",
          "Known allergies",
          "Current medications",
          "Recent procedures or treatments"
        ],
        timeEstimate: "45-60 seconds",
        evaluationCriteria: [
          "Includes pertinent medical history",
          "States allergies clearly",
          "Lists current medications",
          "Mentions relevant recent procedures"
        ]
      },
      {
        id: 3,
        cueText: "Assessment: Share current assessment findings and concerns",
        expectedContent: "Vital signs, assessment findings, current concerns or issues",
        guidance: "Report current vital signs, physical assessment findings, and any concerns or changes in condition.",
        keyPoints: [
          "Current vital signs",
          "Key assessment findings",
          "Any concerns or changes",
          "Pain assessment if applicable"
        ],
        timeEstimate: "60-90 seconds",
        evaluationCriteria: [
          "Reports current vital signs",
          "Describes key assessment findings",
          "Identifies current concerns",
          "Uses systematic approach"
        ]
      },
      {
        id: 4,
        cueText: "Recommendations: Suggest next steps and priority actions",
        expectedContent: "Immediate needs, follow-up requirements, priority interventions",
        guidance: "Clearly state what needs to be done next, any immediate priorities, and follow-up requirements.",
        keyPoints: [
          "Immediate priorities",
          "Scheduled treatments or procedures",
          "Follow-up requirements",
          "Special considerations"
        ],
        timeEstimate: "30-45 seconds",
        evaluationCriteria: [
          "Identifies immediate priorities",
          "States follow-up requirements",
          "Mentions scheduled interventions",
          "Provides clear recommendations"
        ]
      }
    ]
  },
  {
    id: 'post-op-care',
    title: 'Post-Operative Care and Recovery',
    description: 'Guide a patient through post-operative recovery',
    difficulty: 'intermediate',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "I just woke up from surgery and I'm feeling nauseous. Is this normal?",
        expectedNurseResponse: "Yes, feeling nauseous after surgery is very common, especially after general anesthesia. This should improve as the medication wears off. Let me help you get more comfortable and see what we can do to reduce the nausea.",
        agentGuidance: "Normalize the experience, provide reassurance, and focus on immediate comfort measures. Assess for other symptoms.",
        keyPoints: [
          "Validate that nausea is normal post-surgery",
          "Explain the cause (anesthesia effects)",
          "Offer immediate comfort measures",
          "Assess for other symptoms"
        ],
        evaluationCriteria: [
          "Normalizes the patient's experience",
          "Provides clear explanation",
          "Offers practical solutions",
          "Shows concern for patient comfort"
        ],
        followUpQuestions: [
          "On a scale of 1-10, how would you rate your nausea?",
          "Are you experiencing any pain as well?",
          "Would you like me to get you some anti-nausea medication?"
        ],
        therapeuticTechniques: [
          "Normalization",
          "Patient education",
          "Comfort measures",
          "Symptom assessment"
        ]
      }
    ]
  },
  {
    id: 'medication-education',
    title: 'Medication Education Presentation',
    description: 'Educate a patient about their new medication regimen',
    difficulty: 'advanced',
    category: 'pre-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Introduction: Explain the purpose of medication education",
        expectedContent: "Welcome the patient and explain why medication education is important",
        guidance: "Start by welcoming the patient and explaining that you'll be teaching them about their medications to ensure safe use at home.",
        keyPoints: [
          "Welcome the patient warmly",
          "Explain the purpose of the session",
          "Emphasize importance for safety",
          "Ask about their current understanding"
        ],
        timeEstimate: "30-45 seconds",
        evaluationCriteria: [
          "Creates welcoming environment",
          "Explains purpose clearly",
          "Emphasizes patient safety",
          "Assesses baseline knowledge"
        ]
      },
      {
        id: 2,
        cueText: "Medication Details: Describe the medication name, purpose, and dosing",
        expectedContent: "Medication name (generic and brand), what it treats, how much to take, when to take it",
        guidance: "Clearly state both generic and brand names, explain what condition it treats, and provide specific dosing instructions.",
        keyPoints: [
          "Both generic and brand names",
          "What condition it treats",
          "Exact dosing instructions",
          "When to take it (timing)"
        ],
        timeEstimate: "60-90 seconds",
        evaluationCriteria: [
          "States medication names clearly",
          "Explains therapeutic purpose",
          "Provides specific dosing",
          "Includes timing instructions"
        ]
      },
      {
        id: 3,
        cueText: "Side Effects and Precautions: Discuss potential side effects and when to call",
        expectedContent: "Common side effects, serious side effects to watch for, when to contact healthcare provider",
        guidance: "Discuss both common and serious side effects. Be clear about when they should seek immediate medical attention.",
        keyPoints: [
          "Common side effects",
          "Serious side effects requiring attention",
          "When to call healthcare provider",
          "Emergency warning signs"
        ],
        timeEstimate: "90-120 seconds",
        evaluationCriteria: [
          "Discusses common side effects",
          "Identifies serious warning signs",
          "Provides clear contact instructions",
          "Emphasizes safety monitoring"
        ]
      }
    ]
  },
  {
    id: 'pediatric-fear',
    title: 'Pediatric Fear and Anxiety',
    description: 'Help a child cope with medical procedures',
    difficulty: 'advanced',
    category: 'pediatric',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "I don't want the shot! It's going to hurt and I want my mommy!",
        expectedNurseResponse: "I know you're scared, and that's okay. It's normal to feel worried about shots. Your mommy is right here with you, and I'm going to help make this as easy as possible. Would you like to hold her hand?",
        agentGuidance: "Use age-appropriate communication, acknowledge fears, involve the parent, and offer choices to give the child some control.",
        keyPoints: [
          "Validate the child's fears",
          "Use simple, age-appropriate language",
          "Include the parent in comfort measures",
          "Offer choices to increase sense of control"
        ],
        evaluationCriteria: [
          "Uses developmentally appropriate communication",
          "Acknowledges and validates emotions",
          "Involves family in care",
          "Provides comfort and distraction techniques"
        ],
        followUpQuestions: [
          "Would you like to count to three with me?",
          "Do you have a favorite stuffed animal or toy here?",
          "Would you like to choose which arm for the shot?"
        ],
        therapeuticTechniques: [
          "Age-appropriate communication",
          "Family-centered care",
          "Distraction techniques",
          "Offering choices"
        ]
      }
    ]
  },
  {
    id: 'head-to-toe-assessment',
    title: 'Head-to-Toe Assessment',
    description: 'Practice conducting a comprehensive head-to-toe patient assessment',
    difficulty: 'intermediate',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "Good morning, nurse.",
        expectedNurseResponse: "Good morning, John. I am going to do your assessment. You'll hear me repeat some things to the ambient documentation device again. Can you tell me your name and birthdate?",
        agentGuidance: "Begin with proper identification and explain what you're doing. Always verify patient identity before any assessment.",
        keyPoints: [
          "Greet patient warmly",
          "Explain the assessment process",
          "Verify patient identity",
          "Mention documentation process"
        ],
        evaluationCriteria: [
          "Professional greeting",
          "Clear explanation of procedure",
          "Proper patient identification",
          "Transparency about documentation"
        ],
        followUpQuestions: [
          "Are you comfortable?",
          "Do you have any questions before we begin?",
          "Is this a good time for your assessment?"
        ],
        therapeuticTechniques: [
          "Clear communication",
          "Patient education",
          "Informed consent",
          "Professional presence"
        ]
      },
      {
        id: 2,
        patientStatement: "John Doe. 1/1/1970. I'm at DAX Hospital because I have pneumonia.",
        expectedNurseResponse: "Great, you're alert and oriented. I'm going to listen to your heart and lungs now. You have some crackles in the right bases of your lungs. Your heart sounds are normal. I'm going to listen to your belly. Is there any tenderness when I press here?",
        agentGuidance: "Perform systematic assessment while explaining findings. Always ask about comfort and pain during palpation.",
        keyPoints: [
          "Acknowledge orientation status",
          "Explain each assessment step",
          "Share normal findings to reassure",
          "Ask about discomfort during palpation"
        ],
        evaluationCriteria: [
          "Systematic assessment approach",
          "Clear communication of findings",
          "Patient comfort prioritized",
          "Appropriate technique demonstrated"
        ],
        followUpQuestions: [
          "Does this pressure cause any pain?",
          "Have you noticed any changes in your breathing?",
          "Are you experiencing any chest pain?"
        ],
        therapeuticTechniques: [
          "Systematic assessment",
          "Patient education",
          "Comfort measures",
          "Clear communication"
        ]
      },
      {
        id: 3,
        patientStatement: "No, it feels fine. My throat is still a bit sore though.",
        expectedNurseResponse: "Your bowel sounds are active and your abdomen is soft and nontender, which is good. Let me take a look at your throat. Your throat appears red and inflamed. Are you still experiencing frequent coughing?",
        agentGuidance: "Continue systematic assessment while addressing patient concerns. Explain normal findings and investigate symptoms mentioned.",
        keyPoints: [
          "Share positive assessment findings",
          "Address patient-mentioned symptoms",
          "Perform focused assessment of concerning areas",
          "Ask follow-up questions about symptoms"
        ],
        evaluationCriteria: [
          "Addresses patient concerns",
          "Explains assessment findings",
          "Performs focused examination",
          "Uses appropriate assessment techniques"
        ],
        followUpQuestions: [
          "When did the sore throat start?",
          "Is it worse when you swallow?",
          "Have you been taking anything for the pain?"
        ],
        therapeuticTechniques: [
          "Focused assessment",
          "Symptom investigation",
          "Patient advocacy",
          "Therapeutic communication"
        ]
      }
    ]
  },
  {
    id: 'mobility-assessment',
    title: 'Mobility and Activity Assessment',
    description: 'Practice assessing and encouraging patient mobility',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "I feel pretty good after that walk.",
        expectedNurseResponse: "Great job walking in the hall today. You walked for 10 minutes! I'm glad you tolerated that much movement so well. After you use this bedside commode, I'll help you get into the chair for a little while.",
        agentGuidance: "Provide positive reinforcement for mobility achievements. Set up next mobility goals and provide specific instructions.",
        keyPoints: [
          "Praise mobility achievements",
          "Give specific feedback on duration/distance",
          "Plan next mobility activities",
          "Offer assistance with transitions"
        ],
        evaluationCriteria: [
          "Provides positive reinforcement",
          "Documents specific achievements",
          "Plans progressive mobility",
          "Offers appropriate assistance"
        ],
        followUpQuestions: [
          "How is your energy level now?",
          "Any pain or discomfort from the activity?",
          "Would you like to try sitting up for a while?"
        ],
        therapeuticTechniques: [
          "Positive reinforcement",
          "Goal setting",
          "Progressive mobility",
          "Safety assessment"
        ]
      },
      {
        id: 2,
        patientStatement: "That walk was difficult for me. I don't feel good.",
        expectedNurseResponse: "Okay, you walked about 10 feet here in your room. I'm sorry that wasn't tolerated well. Let's get you back to bed and rest. I'm going to put the SCDs back on your legs, okay?",
        agentGuidance: "Acknowledge when activities are not well tolerated. Prioritize patient comfort and safety while still documenting the attempt.",
        keyPoints: [
          "Acknowledge patient's difficulty",
          "Document actual distance achieved",
          "Prioritize rest and comfort",
          "Resume safety measures (SCDs)"
        ],
        evaluationCriteria: [
          "Shows empathy for patient difficulty",
          "Accurately documents activity level",
          "Prioritizes patient safety",
          "Implements appropriate interventions"
        ],
        followUpQuestions: [
          "What specifically didn't feel good?",
          "Are you experiencing any pain?",
          "Would you like me to check your vital signs?"
        ],
        therapeuticTechniques: [
          "Empathetic response",
          "Safety prioritization",
          "Comfort measures",
          "Assessment skills"
        ]
      }
    ]
  },
  {
    id: 'pain-assessment',
    title: 'Pain Assessment and Management',
    description: 'Practice comprehensive pain assessment and follow-up',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "My pain is about a 3 now.",
        expectedNurseResponse: "Alright, a pain of 3 is better – still just at your surgical site on your right knee? Can you describe your pain for me?",
        agentGuidance: "Follow up on pain medication effectiveness. Use specific pain assessment questions to gather comprehensive information.",
        keyPoints: [
          "Acknowledge improvement in pain level",
          "Confirm location of pain",
          "Ask for pain description/quality",
          "Compare to previous pain levels"
        ],
        evaluationCriteria: [
          "Uses standardized pain scale",
          "Assesses pain location specifically",
          "Gathers qualitative pain description",
          "Compares to baseline/previous levels"
        ],
        followUpQuestions: [
          "What makes the pain better or worse?",
          "Is this level of pain acceptable to you?",
          "When did you last take pain medication?"
        ],
        therapeuticTechniques: [
          "Systematic pain assessment",
          "Active listening",
          "Therapeutic communication",
          "Pain scale utilization"
        ]
      }
    ]
  },
  {
    id: 'documentation-monologue',
    title: 'Patient Assessment Documentation',
    description: 'Practice documenting comprehensive patient assessments',
    difficulty: 'intermediate',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document patient safety measures and environmental setup",
        expectedContent: "ID, allergy, and fall risk bands on, bed in lowest position, wheels locked",
        guidance: "Always document safety measures first. Include patient identification, safety bands, and bed/equipment safety.",
        keyPoints: [
          "Patient identification bands",
          "Allergy bands present",
          "Fall risk identification",
          "Bed safety position"
        ],
        timeEstimate: "15-30 seconds",
        evaluationCriteria: [
          "Documents all required identification",
          "Notes safety equipment/measures",
          "Confirms environmental safety",
          "Uses clear, concise language"
        ]
      },
      {
        id: 2,
        cueText: "Document patient positioning and comfort measures",
        expectedContent: "Patient repositioned, bed alarm on, call light within reach",
        guidance: "Document comfort measures, positioning, and accessibility of call systems for patient safety.",
        keyPoints: [
          "Patient positioning",
          "Bed alarm status",
          "Call light accessibility",
          "Patient comfort measures"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Documents positioning changes",
          "Notes safety alarm systems",
          "Confirms call light access",
          "Addresses patient comfort"
        ]
      },
      {
        id: 3,
        cueText: "Document fall prevention measures implemented",
        expectedContent: "Nonskid socks on, fall risk sign on door, hourly rounding done, 2 of 4 side rails up, fall mat in place",
        guidance: "Comprehensively document all fall prevention interventions to ensure continuity of care.",
        keyPoints: [
          "Nonskid footwear",
          "Fall risk signage",
          "Rounding frequency",
          "Side rail configuration",
          "Fall mat placement"
        ],
        timeEstimate: "30-45 seconds",
        evaluationCriteria: [
          "Documents all fall prevention measures",
          "Notes specific equipment used",
          "Records rounding completion",
          "Uses standard terminology"
        ]
      }
    ]
  },
  {
    id: 'mobility-documentation',
    title: 'Mobility and Activity Documentation',
    description: 'Practice documenting patient mobility assessments and activities',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document successful mobility activities",
        expectedContent: "Patient ambulated in hall for 10 minutes and tolerated it well",
        guidance: "Document specific mobility achievements including duration, distance, and tolerance level.",
        keyPoints: [
          "Specific activity performed",
          "Duration of activity",
          "Patient tolerance level",
          "Location of activity"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Includes specific timeframes",
          "Documents patient tolerance",
          "Notes location/setting",
          "Uses objective language"
        ]
      },
      {
        id: 2,
        cueText: "Document mobility equipment and assistance needs",
        expectedContent: "Used bedside commode and then sat in chair. Ambulated in room using walker.",
        guidance: "Document equipment used and level of independence or assistance required for mobility.",
        keyPoints: [
          "Equipment utilized",
          "Assistance level needed",
          "Multiple activities performed",
          "Patient independence level"
        ],
        timeEstimate: "20-30 seconds",
        evaluationCriteria: [
          "Documents equipment used",
          "Notes assistance requirements",
          "Records multiple activities",
          "Indicates independence level"
        ]
      },
      {
        id: 3,
        cueText: "Document mobility limitations and interventions",
        expectedContent: "Ambulated in room 10 feet, tolerated poorly. Bilateral below knee SCDs on. Two person assist, turned to left side, bilateral heel protectors on.",
        guidance: "When mobility is limited, document specific limitations, distance achieved, and compensatory interventions implemented.",
        keyPoints: [
          "Specific distance achieved",
          "Tolerance level",
          "Compensatory interventions",
          "Assistance level required"
        ],
        timeEstimate: "30-45 seconds",
        evaluationCriteria: [
          "Documents actual achievement vs. goal",
          "Notes poor tolerance",
          "Lists compensatory measures",
          "Specifies assistance needs"
        ]
      }
    ]
  },
  {
    id: 'intake-output-documentation',
    title: 'Intake and Output Documentation',
    description: 'Practice accurate documentation of patient intake and output',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document nutritional intake",
        expectedContent: "Patient ate 100% of breakfast, drank 120ml Ensure Plus",
        guidance: "Document both solid food intake as percentages and liquid intake with specific volumes.",
        keyPoints: [
          "Percentage of meal consumed",
          "Specific beverage volumes",
          "Type of nutritional supplements",
          "Time frame of intake"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Uses percentage for solid intake",
          "Provides specific volumes for liquids",
          "Notes supplement types",
          "Documents completely"
        ]
      },
      {
        id: 2,
        cueText: "Document urinary output with characteristics",
        expectedContent: "250ml clear, yellow urine, no odor. 300ml of urine, amber, cloudy, malodorous.",
        guidance: "Always document volume, color, clarity, and odor of urine output. Note any abnormal characteristics.",
        keyPoints: [
          "Specific volume measured",
          "Color description",
          "Clarity assessment",
          "Odor characteristics"
        ],
        timeEstimate: "20-30 seconds",
        evaluationCriteria: [
          "Provides accurate volume",
          "Describes color appropriately",
          "Notes clarity/cloudiness",
          "Documents odor presence/absence"
        ]
      },
      {
        id: 3,
        cueText: "Document incontinence episodes",
        expectedContent: "1 large urine and 1 large brown stool occurrence, incontinent of both",
        guidance: "Document incontinence episodes with size/amount and characteristics while maintaining patient dignity.",
        keyPoints: [
          "Number of episodes",
          "Size/amount estimation",
          "Stool characteristics",
          "Continence status"
        ],
        timeEstimate: "15-25 seconds",
        evaluationCriteria: [
          "Counts episodes accurately",
          "Estimates amounts appropriately",
          "Describes characteristics",
          "Uses professional language"
        ]
      }
    ]
  },
  {
    id: 'daily-care-documentation',
    title: 'Daily Care Activities Documentation',
    description: 'Practice documenting patient hygiene and daily care activities',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document independent patient care",
        expectedContent: "Patient independent, showered, brushed teeth, changed gown",
        guidance: "Document patient's independence level and specific hygiene activities completed.",
        keyPoints: [
          "Patient independence level",
          "Specific hygiene activities",
          "Self-care abilities",
          "Activities of daily living"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Notes independence level",
          "Lists specific activities",
          "Documents self-care ability",
          "Uses clear terminology"
        ]
      },
      {
        id: 2,
        cueText: "Document assisted patient care",
        expectedContent: "Complete linen change, face washed, and pericare done. Patient dependent, mouth swabbed, hair washed, and shaved.",
        guidance: "Document comprehensive care provided, noting level of assistance required and specific care activities.",
        keyPoints: [
          "Linen changes completed",
          "Personal hygiene provided",
          "Dependence level noted",
          "Comprehensive care list"
        ],
        timeEstimate: "25-35 seconds",
        evaluationCriteria: [
          "Documents all care provided",
          "Notes assistance level",
          "Lists specific activities",
          "Maintains professional language"
        ]
      },
      {
        id: 3,
        cueText: "Document specialized care and patient refusals",
        expectedContent: "CHG bath completed, incontinent pad replaced. Foley, nail, and denture care done. Patient refused hygiene care.",
        guidance: "Document specialized care procedures and any patient refusals, maintaining respect for patient autonomy.",
        keyPoints: [
          "Specialized care procedures",
          "Medical device care",
          "Patient refusals",
          "Reason for refusal if given"
        ],
        timeEstimate: "30-40 seconds",
        evaluationCriteria: [
          "Documents specialized procedures",
          "Notes device care completed",
          "Records patient refusals objectively",
          "Respects patient autonomy"
        ]
      }
    ]
  },
  
  // NEW REALISTIC NURSING SCRIPTS FROM PROVIDED EXAMPLES
  {
    id: 'head-to-toe-assessment',
    title: 'Head-to-Toe Assessment Conversation',
    description: 'Practice conducting a comprehensive head-to-toe assessment with patient interaction',
    difficulty: 'intermediate',
    category: 'pre-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "Good morning, nurse.",
        expectedNurseResponse: "Good morning, John. I am going to do your assessment. You'll hear me repeat some things to the ambient documentation device again.",
        agentGuidance: "Greet the patient warmly and explain what you'll be doing. Mention documentation to set expectations.",
        keyPoints: [
          "Professional greeting",
          "Explain the assessment process",
          "Set expectations about documentation",
          "Use patient's name"
        ],
        evaluationCriteria: [
          "Uses professional, warm greeting",
          "Explains assessment purpose clearly",
          "Addresses patient by name",
          "Sets appropriate expectations"
        ],
        therapeuticTechniques: [
          "Clear communication",
          "Explanation of procedures",
          "Building rapport"
        ]
      },
      {
        id: 2,
        patientStatement: "Okay",
        expectedNurseResponse: "Can you tell me your name and birthdate?",
        agentGuidance: "Verify patient identity as the first step in any assessment for patient safety.",
        keyPoints: [
          "Patient identification verification",
          "Two identifiers required",
          "Safety protocol adherence"
        ],
        evaluationCriteria: [
          "Requests two patient identifiers",
          "Clear, direct questioning",
          "Follows safety protocols"
        ],
        therapeuticTechniques: [
          "Safety verification",
          "Direct questioning"
        ]
      },
      {
        id: 3,
        patientStatement: "John Doe. 1/1/1970",
        expectedNurseResponse: "Can you tell me the year, where you are, and why you're here?",
        agentGuidance: "Assess orientation to person, place, time, and situation as part of neurological assessment.",
        keyPoints: [
          "Orientation assessment",
          "Neurological evaluation",
          "Mental status check",
          "Alert and oriented evaluation"
        ],
        evaluationCriteria: [
          "Assesses all four orientation categories",
          "Clear, simple questioning",
          "Evaluates cognitive function"
        ],
        therapeuticTechniques: [
          "Neurological assessment",
          "Mental status evaluation"
        ]
      },
      {
        id: 4,
        patientStatement: "2025. I'm at DAX Hospital because I have pneumonia.",
        expectedNurseResponse: "Great, you're alert and oriented x 4. I'm going to listen to your heart and lungs now. You have some crackles in the right bases of your lungs. Your heart sounds are normal.",
        agentGuidance: "Document orientation status and proceed with cardiopulmonary assessment. Explain findings to patient.",
        keyPoints: [
          "Document orientation status",
          "Cardiopulmonary assessment",
          "Share assessment findings",
          "Patient education"
        ],
        evaluationCriteria: [
          "Accurately documents orientation",
          "Explains assessment findings",
          "Uses appropriate medical terminology",
          "Keeps patient informed"
        ],
        therapeuticTechniques: [
          "Patient education",
          "Transparent communication",
          "Clinical assessment"
        ]
      },
      {
        id: 5,
        patientStatement: "No, it feels fine.",
        expectedNurseResponse: "Your bowel sounds are active and your abdomen is soft and nontender, which is good. Is your throat still sore?",
        agentGuidance: "Document abdominal assessment findings and continue with systematic assessment of symptoms.",
        keyPoints: [
          "Abdominal assessment documentation",
          "Systematic symptom evaluation",
          "Reassurance when appropriate",
          "Continued assessment"
        ],
        evaluationCriteria: [
          "Documents assessment findings accurately",
          "Provides appropriate reassurance",
          "Continues systematic evaluation",
          "Uses proper terminology"
        ],
        therapeuticTechniques: [
          "Systematic assessment",
          "Reassurance",
          "Clinical documentation"
        ]
      }
    ]
  },

  {
    id: 'mobility-assessment-conversation',
    title: 'Mobility Assessment and Encouragement',
    description: 'Practice mobility assessment and patient encouragement during ambulation',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "I feel pretty good.",
        expectedNurseResponse: "Great job walking in the hall today. You walked for 10 minutes! How do you feel?",
        agentGuidance: "Provide positive reinforcement for mobility achievements and assess patient tolerance.",
        keyPoints: [
          "Positive reinforcement",
          "Specific achievement recognition",
          "Assessment of tolerance",
          "Encouragement"
        ],
        evaluationCriteria: [
          "Provides specific positive feedback",
          "Assesses patient response to activity",
          "Shows enthusiasm and encouragement",
          "Documents activity tolerance"
        ],
        therapeuticTechniques: [
          "Positive reinforcement",
          "Motivational interviewing",
          "Assessment"
        ]
      },
      {
        id: 2,
        patientStatement: "I feel pretty good.",
        expectedNurseResponse: "I'm glad you tolerated that much movement so well. After you use this bedside commode, I'll help you get into the chair for a little while.",
        agentGuidance: "Acknowledge good tolerance and plan next mobility activities to promote progressive mobilization.",
        keyPoints: [
          "Acknowledge tolerance",
          "Plan progressive activities",
          "Encourage continued mobility",
          "Set realistic goals"
        ],
        evaluationCriteria: [
          "Recognizes good activity tolerance",
          "Plans appropriate next steps",
          "Promotes progressive mobility",
          "Sets achievable goals"
        ],
        therapeuticTechniques: [
          "Progressive mobilization",
          "Goal setting",
          "Encouragement"
        ]
      },
      {
        id: 3,
        patientStatement: "Oh thank you, I almost forgot.",
        expectedNurseResponse: "Here is your walker, please use this while you walk around your room.",
        agentGuidance: "Provide assistive devices and reinforce safety measures for independent mobility.",
        keyPoints: [
          "Safety equipment provision",
          "Fall prevention",
          "Independence promotion",
          "Safety reinforcement"
        ],
        evaluationCriteria: [
          "Provides appropriate assistive devices",
          "Emphasizes safety measures",
          "Promotes safe independence",
          "Prevents falls"
        ],
        therapeuticTechniques: [
          "Safety promotion",
          "Independence support",
          "Fall prevention"
        ]
      }
    ]
  },

  {
    id: 'pain-assessment-conversation',
    title: 'Pain Assessment and Follow-up',
    description: 'Practice pain assessment and medication effectiveness evaluation',
    difficulty: 'intermediate',
    category: 'post-operative',
    type: 'conversation',
    conversationSteps: [
      {
        id: 1,
        patientStatement: "3.",
        expectedNurseResponse: "I'm coming back to make sure your pain medication was effective and check-in. What's your pain rating on a 0-10 scale?",
        agentGuidance: "Follow up on pain medication effectiveness using standardized pain scale assessment.",
        keyPoints: [
          "Medication effectiveness evaluation",
          "Standardized pain scale use",
          "Follow-up assessment",
          "Patient comfort priority"
        ],
        evaluationCriteria: [
          "Uses standardized pain scale",
          "Follows up on medication effectiveness",
          "Shows concern for patient comfort",
          "Documents pain assessment"
        ],
        therapeuticTechniques: [
          "Pain assessment",
          "Medication evaluation",
          "Follow-up care"
        ]
      },
      {
        id: 2,
        patientStatement: "Yeah, just my knee.",
        expectedNurseResponse: "Alright, a pain of 3 is better – still just at your surgical site on your right knee?",
        agentGuidance: "Confirm pain location and acknowledge improvement in pain levels.",
        keyPoints: [
          "Pain location verification",
          "Improvement acknowledgment",
          "Surgical site assessment",
          "Pain trend evaluation"
        ],
        evaluationCriteria: [
          "Confirms specific pain location",
          "Acknowledges pain improvement",
          "Relates to surgical site",
          "Evaluates pain trends"
        ],
        therapeuticTechniques: [
          "Pain localization",
          "Trend assessment",
          "Positive reinforcement"
        ]
      },
      {
        id: 3,
        patientStatement: "It's dull now.",
        expectedNurseResponse: "Can you describe your pain?",
        agentGuidance: "Assess pain quality characteristics for comprehensive pain evaluation.",
        keyPoints: [
          "Pain quality assessment",
          "Comprehensive evaluation",
          "Pain characteristics",
          "Detailed assessment"
        ],
        evaluationCriteria: [
          "Assesses pain quality/characteristics",
          "Uses open-ended questions",
          "Gathers comprehensive information",
          "Documents pain description"
        ],
        therapeuticTechniques: [
          "Pain assessment",
          "Open-ended questioning",
          "Comprehensive evaluation"
        ]
      }
    ]
  },

  // MONOLOGUE SCRIPTS FOR DOCUMENTATION PRACTICE
  {
    id: 'mobility-documentation-monologue',
    title: 'Mobility Documentation Practice',
    description: 'Practice documenting various mobility activities and patient responses',
    difficulty: 'intermediate',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document a successful ambulation activity in the hallway",
        expectedContent: "Patient ambulated in hall for 10 minutes and tolerated it well",
        guidance: "Include duration, location, and patient tolerance. Be concise and objective.",
        keyPoints: [
          "Activity duration (10 minutes)",
          "Location (hallway)",
          "Patient tolerance (tolerated well)",
          "Objective language"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Includes specific time duration",
          "Mentions location of activity",
          "Documents patient tolerance",
          "Uses objective, professional language"
        ]
      },
      {
        id: 2,
        cueText: "Document bedside commode use and chair transfer",
        expectedContent: "Used bedside commode and then sat in chair",
        guidance: "Document the sequence of mobility activities. Keep it brief but complete.",
        keyPoints: [
          "Bedside commode use",
          "Chair transfer",
          "Sequence of activities",
          "Brief documentation"
        ],
        timeEstimate: "10-15 seconds",
        evaluationCriteria: [
          "Documents commode use",
          "Notes chair transfer",
          "Shows activity sequence",
          "Concise documentation"
        ]
      },
      {
        id: 3,
        cueText: "Document walker use for room ambulation",
        expectedContent: "Ambulated in room using walker",
        guidance: "Include assistive device used and location of ambulation.",
        keyPoints: [
          "Assistive device (walker)",
          "Location (room)",
          "Safety measure compliance",
          "Independence level"
        ],
        timeEstimate: "10 seconds",
        evaluationCriteria: [
          "Mentions assistive device used",
          "Specifies ambulation location",
          "Shows safety compliance",
          "Brief and clear"
        ]
      },
      {
        id: 4,
        cueText: "Document poor activity tolerance",
        expectedContent: "Ambulated in room 10 feet, tolerated poorly",
        guidance: "Document both the activity performed and the poor tolerance objectively.",
        keyPoints: [
          "Specific distance (10 feet)",
          "Location (room)",
          "Poor tolerance",
          "Objective documentation"
        ],
        timeEstimate: "15 seconds",
        evaluationCriteria: [
          "Includes specific distance",
          "Documents poor tolerance",
          "Uses objective language",
          "Complete but concise"
        ]
      },
      {
        id: 5,
        cueText: "Document safety devices applied",
        expectedContent: "Bilateral below knee SCDs on",
        guidance: "Document safety/medical devices accurately including location and type.",
        keyPoints: [
          "Device type (SCDs)",
          "Location (bilateral below knee)",
          "Safety measure",
          "Accurate placement"
        ],
        timeEstimate: "10 seconds",
        evaluationCriteria: [
          "Specifies device type",
          "Includes bilateral placement",
          "Shows safety compliance",
          "Accurate medical terminology"
        ]
      }
    ]
  },

  {
    id: 'safety-documentation-monologue',
    title: 'Safety Documentation Practice',
    description: 'Practice documenting safety measures and fall prevention strategies',
    difficulty: 'beginner',
    category: 'pre-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document basic safety measures for a fall risk patient",
        expectedContent: "ID, allergy, and fall risk bands on, bed in lowest position, wheels locked",
        guidance: "Document all basic safety measures including identification, bed position, and equipment status.",
        keyPoints: [
          "Patient identification bands",
          "Allergy band present",
          "Fall risk identification",
          "Bed in lowest position",
          "Wheelchair/bed locks engaged"
        ],
        timeEstimate: "20-25 seconds",
        evaluationCriteria: [
          "Mentions all required bands",
          "Documents bed position",
          "Notes lock status",
          "Comprehensive safety check"
        ]
      },
      {
        id: 2,
        cueText: "Document patient repositioning and safety equipment",
        expectedContent: "Patient repositioned, bed alarm on, call light within reach",
        guidance: "Document comfort measures and communication/alarm systems for patient safety.",
        keyPoints: [
          "Patient repositioning",
          "Bed alarm activation",
          "Call light accessibility",
          "Patient comfort and safety"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Documents repositioning",
          "Notes alarm activation",
          "Confirms call light access",
          "Shows safety priority"
        ]
      },
      {
        id: 3,
        cueText: "Document seizure precautions",
        expectedContent: "Seizure precautions, oxygen and suction at bedside, padded rails",
        guidance: "Document specific seizure safety equipment and environmental modifications.",
        keyPoints: [
          "Seizure precautions label",
          "Emergency equipment (oxygen, suction)",
          "Padded side rails",
          "Bedside accessibility"
        ],
        timeEstimate: "20 seconds",
        evaluationCriteria: [
          "Mentions seizure precautions",
          "Lists emergency equipment",
          "Notes padded rails",
          "Shows comprehensive preparation"
        ]
      },
      {
        id: 4,
        cueText: "Document hourly rounding completion",
        expectedContent: "Hourly rounding done, 2 of 4 side rails up, fall mat in place",
        guidance: "Document completion of safety rounds and specific safety equipment status.",
        keyPoints: [
          "Hourly rounding completion",
          "Side rail configuration",
          "Fall prevention equipment",
          "Safety compliance"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Documents rounding completion",
          "Specifies rail configuration",
          "Notes fall prevention measures",
          "Shows protocol compliance"
        ]
      }
    ]
  },

  {
    id: 'intake-output-documentation-monologue',
    title: 'Intake and Output Documentation',
    description: 'Practice documenting fluid intake, output, and nutritional consumption',
    difficulty: 'beginner',
    category: 'post-operative',
    type: 'monologue',
    monologueCues: [
      {
        id: 1,
        cueText: "Document patient's breakfast consumption and supplement intake",
        expectedContent: "Patient ate 100% of breakfast, drank 120ml Ensure Plus",
        guidance: "Document percentage of meal consumed and specific supplement amounts with measurements.",
        keyPoints: [
          "Percentage of meal consumed",
          "Specific supplement name",
          "Exact volume measurements",
          "Nutritional intake tracking"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Includes meal percentage",
          "Specifies supplement details",
          "Uses accurate measurements",
          "Complete nutritional documentation"
        ]
      },
      {
        id: 2,
        cueText: "Document normal urine output characteristics",
        expectedContent: "250ml clear, yellow urine, no odor",
        guidance: "Include volume, color, clarity, and odor characteristics for complete assessment.",
        keyPoints: [
          "Specific volume measurement",
          "Color description",
          "Clarity assessment",
          "Odor evaluation"
        ],
        timeEstimate: "15 seconds",
        evaluationCriteria: [
          "Includes exact volume",
          "Describes color and clarity",
          "Notes odor characteristics",
          "Complete urine assessment"
        ]
      },
      {
        id: 3,
        cueText: "Document incontinence episode",
        expectedContent: "1 large urine and 1 large brown stool occurrence, incontinent of both",
        guidance: "Document size/amount and type of elimination, noting incontinence status.",
        keyPoints: [
          "Urine amount/size",
          "Stool amount and color",
          "Incontinence status",
          "Complete elimination record"
        ],
        timeEstimate: "20-25 seconds",
        evaluationCriteria: [
          "Documents both elimination types",
          "Includes size/amount descriptors",
          "Notes incontinence clearly",
          "Professional terminology"
        ]
      },
      {
        id: 4,
        cueText: "Document abnormal urine characteristics",
        expectedContent: "300ml amber, cloudy, malodorous urine",
        guidance: "Document concerning urine characteristics that may indicate infection or other issues.",
        keyPoints: [
          "Exact volume",
          "Abnormal color (amber)",
          "Abnormal clarity (cloudy)",
          "Abnormal odor (malodorous)"
        ],
        timeEstimate: "15-20 seconds",
        evaluationCriteria: [
          "Accurate volume measurement",
          "Describes abnormal characteristics",
          "Uses appropriate medical terms",
          "Indicates need for follow-up"
        ]
      }
    ]
  }
];

// Helper function to get script by ID
export const getScriptById = (id: string): NursingScript | undefined => {
  return nursingScripts.find(script => script.id === id);
};

// Helper function to get scripts by category
export const getScriptsByCategory = (category: NursingScript['category']): NursingScript[] => {
  return nursingScripts.filter(script => script.category === category);
};

// Helper function to get scripts by difficulty
export const getScriptsByDifficulty = (difficulty: NursingScript['difficulty']): NursingScript[] => {
  return nursingScripts.filter(script => script.difficulty === difficulty);
};
