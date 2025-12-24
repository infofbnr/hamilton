// data.js
// Hamilton-connected themes, archetypes, and dynamics.
// Short quotes only. Focus on meaning, not lyrics dumping.

window.HAMILT_DATA = {

  /* =====================
     HOME: ROTATING QUOTES
     ===================== */
  quotes: [
    { line: "History has its eyes on you.", from: "Accountability" },
    { line: "I’m young, scrappy, and hungry.", from: "Ambition" },
    { line: "Who lives, who dies, who tells your story?", from: "Legacy" },
    { line: "The room where it happens.", from: "Power" },
    { line: "Wait for it.", from: "Patience" },
    { line: "Talk less. Smile more.", from: "Strategy" },
    { line: "If you stand for nothing…", from: "Principles" },
    { line: "This is not a moment, it’s the movement.", from: "Change" },
    { line: "Why do you write like you’re running out of time?", from: "Drive" },
    { line: "I imagine death so much it feels more like a memory.", from: "Pressure" },
    { line: "No one else was in the room where it happened.", from: "Exclusion" }
  ],

  /* =====================
     CORE THEMES
     ===================== */
  themes: [
    "ambition",
    "patience",
    "power",
    "legacy",
    "loyalty",
    "strategy",
    "identity",
    "conflict",
    "leadership",
    "revolution"
  ],

  /* =====================
     HISTORY → HAMILTON
     (DYNAMICS, NOT RANDOM EVENTS)
     ===================== */
  history: [
    {
      title: "Revolutions: ideals vs consequences",
      theme: "revolution",
      quotePool: [
        "This is not a moment, it’s the movement.",
        "History has its eyes on you."
      ],
      summary:
        "Revolutions begin with ideals but are judged by outcomes. Momentum empowers people, but it also removes control.",
      parallels: [
        "Moral urgency overtakes caution",
        "Leaders become symbols",
        "The crowd accelerates decisions"
      ],
      tags: ["revolution", "power", "history"]
    },
    {
      title: "Power behind closed doors",
      theme: "power",
      quotePool: [
        "The room where it happens.",
        "No one else was in the room where it happened."
      ],
      summary:
        "Most decisions that shape societies are made privately. Power is often invisible until it’s too late to influence.",
      parallels: [
        "Access matters more than speeches",
        "Presence beats popularity",
        "Exclusion creates resentment"
      ],
      tags: ["power", "politics", "elite"]
    },
    {
      title: "Political rivals and ego",
      theme: "conflict",
      quotePool: [
        "If you stand for nothing…",
        "Sit down, John."
      ],
      summary:
        "Rivalries can sharpen ideas or destroy institutions. When ego replaces principle, everyone loses.",
      parallels: [
        "Debate becomes personal",
        "Winning replaces truth",
        "Public trust erodes"
      ],
      tags: ["conflict", "rivalry", "ethics"]
    },
    {
      title: "Leadership under pressure",
      theme: "leadership",
      quotePool: [
        "History has its eyes on you.",
        "Winning is easy, governing is harder."
      ],
      summary:
        "Leadership isn’t about momentum — it’s about restraint, responsibility, and long-term thinking.",
      parallels: [
        "Decisions affect others",
        "Stability over popularity",
        "Burden of authority"
      ],
      tags: ["leadership", "responsibility"]
    },
    {
      title: "Identity and belonging",
      theme: "identity",
      quotePool: [
        "I’m just like my country, I’m young, scrappy, and hungry.",
        "Immigrants. We get the job done."
      ],
      summary:
        "Nations and people define themselves through struggle. Identity is built through contribution, not acceptance.",
      parallels: [
        "Outsiders push change",
        "Belonging must be earned",
        "Resistance fuels ambition"
      ],
      tags: ["identity", "society"]
    },
    {
      title: "Legacy and narrative control",
      theme: "legacy",
      quotePool: [
        "Legacy. What is a legacy?",
        "Who lives, who dies, who tells your story?"
      ],
      summary:
        "History remembers narratives, not intentions. Legacy is shaped by those who tell the story, not just those who lived it.",
      parallels: [
        "Silence erases impact",
        "Storytelling shapes memory",
        "Reputation outlives truth"
      ],
      tags: ["legacy", "memory", "history"]
    }
  ],

  /* =====================
     LYRICS → LIFE
     ===================== */
  lyricsToLife: [
    {
      lines: [
        "I am not throwing away my shot.",
        "I’m young, scrappy, and hungry."
      ],
      idea: "Act before you feel ready.",
      apply:
        "This fits moments of risk: exams, speeches, applications, starting something new. Confidence is built by action.",
      doThis: [
        "Start before you feel prepared",
        "Accept visible imperfection",
        "Turn pressure into fuel"
      ]
    },
    {
      lines: [
        "Wait for it.",
        "I am the one thing in life I can control."
      ],
      idea: "Discipline over impulse.",
      apply:
        "Some situations reward patience. Control your response, not the outcome.",
      doThis: [
        "Pause before reacting",
        "Let emotions settle",
        "Choose timing deliberately"
      ]
    },
    {
      lines: [
        "Talk less. Smile more."
      ],
      idea: "Strategic silence.",
      apply:
        "In conflict or negotiation, silence can be power. Not everything needs a reply.",
      doThis: [
        "Listen more than you speak",
        "Let others reveal themselves",
        "Respond only when it matters"
      ]
    },
    {
      lines: [
        "Who lives, who dies, who tells your story?"
      ],
      idea: "Think beyond the moment.",
      apply:
        "Choose actions that make sense long after the moment passes.",
      doThis: [
        "Build habits, not hype",
        "Choose meaning over attention",
        "Care about your future self"
      ]
    }
  ],

  /* =====================
     QUIZ
     ===================== */
quiz: {
  questions: [
    {
      title: "You’re given an important opportunity with a tight deadline.",
      subtitle: "What do you do first?",
      answers: [
        {
          text: "Jump in immediately. I’ll learn as I go.",
          scores: { Hamilton: 3, Jefferson: 1 }
        },
        {
          text: "Pause and assess the risks before acting.",
          scores: { Burr: 3, Washington: 1 }
        },
        {
          text: "Map out every possible outcome quietly.",
          scores: { Angelica: 3 }
        },
        {
          text: "Think about who else this decision affects.",
          scores: { Eliza: 3 }
        }
      ]
    },
    {
      title: "A disagreement breaks out in a group you’re part of.",
      subtitle: "What’s your instinctive move?",
      answers: [
        {
          text: "Argue your position clearly and forcefully.",
          scores: { Hamilton: 2, Jefferson: 2 }
        },
        {
          text: "Stay calm and wait for the right moment to respond.",
          scores: { Burr: 3 }
        },
        {
          text: "Step in to calm things down and restore order.",
          scores: { Washington: 3 }
        },
        {
          text: "Read the room and adjust your tone strategically.",
          scores: { Angelica: 2 }
        }
      ]
    },
    {
      title: "You’re planning your future.",
      subtitle: "What worries you the most?",
      answers: [
        {
          text: "Not leaving something meaningful behind.",
          scores: { Eliza: 2, Washington: 2 }
        },
        {
          text: "Being excluded from important decisions.",
          scores: { Jefferson: 3 }
        },
        {
          text: "Wasting my potential or falling behind.",
          scores: { Hamilton: 3 }
        },
        {
          text: "Making the wrong move at the wrong time.",
          scores: { Burr: 2 }
        }
      ]
    },
    {
      title: "People usually rely on you because…",
      subtitle: "Choose the one that fits best.",
      answers: [
        {
          text: "You push things forward when others hesitate.",
          scores: { Hamilton: 3 }
        },
        {
          text: "You stay level-headed under pressure.",
          scores: { Burr: 3, Washington: 1 }
        },
        {
          text: "You understand people and social dynamics.",
          scores: { Angelica: 2, Jefferson: 1 }
        },
        {
          text: "You’re dependable and steady.",
          scores: { Washington: 3, Eliza: 1 }
        }
      ]
    },
    {
      title: "When something goes wrong, you tend to blame yourself for…",
      subtitle: "Be honest.",
      answers: [
        {
          text: "Moving too fast or too aggressively.",
          scores: { Hamilton: 2 }
        },
        {
          text: "Waiting too long to take action.",
          scores: { Burr: 2 }
        },
        {
          text: "Taking on more responsibility than I should.",
          scores: { Washington: 2, Eliza: 2 }
        },
        {
          text: "Overthinking instead of saying what I want.",
          scores: { Angelica: 3 }
        }
      ]
    },
    {
      title: "In a leadership role, you believe the best approach is to…",
      subtitle: "Gut feeling.",
      answers: [
        {
          text: "Lead from the front and set the pace.",
          scores: { Hamilton: 2 }
        },
        {
          text: "Wait, watch, and act only when necessary.",
          scores: { Burr: 2 }
        },
        {
          text: "Keep everyone aligned and focused on stability.",
          scores: { Washington: 3 }
        },
        {
          text: "Influence outcomes from behind the scenes.",
          scores: { Angelica: 2, Jefferson: 1 }
        }
      ]
    },
    {
      title: "Which situation frustrates you the most?",
      subtitle: "This one reveals a lot.",
      answers: [
        {
          text: "Feeling underestimated or overlooked.",
          scores: { Hamilton: 2, Jefferson: 2 }
        },
        {
          text: "Being forced to decide before I’m ready.",
          scores: { Burr: 3 }
        },
        {
          text: "Watching people act irresponsibly.",
          scores: { Washington: 3 }
        },
        {
          text: "Having to suppress my feelings for the greater good.",
          scores: { Eliza: 3 }
        }
      ]
    }
  ],


    results: {
      Hamilton: {
        quotes: [
          "I am not throwing away my shot.",
          "Why do you write like you’re running out of time?"
        ],
        strengths: ["Driven", "Fast learner", "Ambitious"],
        flaws: ["Impulsive", "Burns bridges", "Overworks"],
        explain:
          "You run on urgency and momentum. Your growth comes from learning restraint without losing fire."
      },
      Burr: {
        quotes: [
          "Wait for it.",
          "I am the one thing in life I can control."
        ],
        strengths: ["Strategic", "Composed", "Observant"],
        flaws: ["Hesitant", "Avoids commitment"],
        explain:
          "You value control and timing. Your challenge is choosing a side before the moment passes."
      },
      Eliza: {
        quotes: [
          "Who lives, who dies, who tells your story?"
        ],
        strengths: ["Loyal", "Grounded", "Resilient"],
        flaws: ["Self-sacrificing", "Emotionally burdened"],
        explain:
          "You preserve meaning and memory. Your growth is learning to protect yourself too."
      },
      Angelica: {
        quotes: [
          "Satisfied.",
          "I know my sister like I know my own mind."
        ],
        strengths: ["Sharp", "Socially intelligent"],
        flaws: ["Overthinks", "Suppresses emotion"],
        explain:
          "You see everything clearly. Your challenge is letting yourself want things openly."
      },
      Washington: {
        quotes: [
          "History has its eyes on you."
        ],
        strengths: ["Stable leader", "Long-term thinker"],
        flaws: ["Emotionally distant"],
        explain:
          "You carry responsibility well. Growth comes from delegation and trust."
      },
      Jefferson: {
        quotes: [
          "What’d I miss?",
          "The room where it happens."
        ],
        strengths: ["Charismatic", "Persuasive"],
        flaws: ["Ego-driven", "Provocative"],
        explain:
          "You command attention easily. Your challenge is consistency beyond performance."
      }
    }
  }

};
