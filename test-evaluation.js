// Simple test of evaluation logic
const testUserResponses = [
  {
    stepId: 0,
    userText: "Patient ambulated in hall for 10 minutes and tolerated it well",
    timestamp: new Date()
  }
];

const testMonologueCues = [
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
  }
];

console.log("Test data created successfully");
console.log("User responses:", testUserResponses);
console.log("Monologue cues:", testMonologueCues);
