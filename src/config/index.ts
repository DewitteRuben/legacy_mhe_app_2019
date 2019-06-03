export default {
  defaultLanguage: "nl",
  experiences: [
    { positive: true, value: "Good time with someone" },
    { positive: true, value: "Achievement" },
    { positive: true, value: "Relaxation" },
    { positive: false, value: "Conflict with someone" },
    { positive: false, value: "Overwhelming task" },
    { positive: false, value: "Emptiness or boredom" }
  ],
  emotions: {
    pleasant_activated: [
      "Astonished",
      "Excited",
      "Amused",
      "Happy",
      "Delighted",
      "Glad",
      "Pleased"
    ],
    pleasant_deactivated: [
      "Content",
      "Serene",
      "At Ease",
      "Calm",
      "Relaxed",
      "Tired",
      "Sleepy"
    ],
    unpleasant_activated: [
      "Alarmed",
      "Frustrated",
      "Tensed",
      "Annoyed",
      "Distressed"
    ],
    unpleasant_deactivated: [
      "Miserable",
      "Sad",
      "Depressed",
      "Gloomy",
      "Lethargic",
      "Fatigued"
    ]
  }
};
