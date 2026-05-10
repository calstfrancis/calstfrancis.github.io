// Act 3: Endings, Epilogues
const SCENES_ACT3 = {
  act3_approach: { location: "The Ship's Chapel", mood: "neutral", on_enter: { flag: "act3_unlocked" }, text: "DYNAMIC", choices: [ { text: "Go to the hold. Make your choice.", next: "the_choice" } ] },
  the_choice: { location: "Forward Hold — Lower Aft", mood: "tense", text: "DYNAMIC", choices: [
    { text: "Complete the mission. Authenticate the transfer. The icons go West.", next: "ending_intercept", tags: ["doubt"], theosis: -5 },
    { text: "Facilitate the return. Refuse to authenticate. The icons go back to the people they belong to.", next: "ending_facilitate", requires_playcount: 2, tags: ["solidarity", "agape"], theosis: 10, theosisFlash: 0.9 },
    { text: "Witness and record. Do not act. Let the mechanism play out without your hand in it.", next: "ending_witness", requires_playcount: 1, tags: ["witness"], theosis: 3 }
  ], anamnesis_lines: ["Last crossing, you stood here. You know what you did."] },
  ending_intercept: { location: "Forward Hold — Lower Aft", mood: "tense", text: "DYNAMIC", choices: [ { text: "[ See what followed ]", next: "epilogue_intercept" } ] },
  ending_facilitate: { location: "Forward Hold — Lower Aft", mood: "revelation", text: "DYNAMIC", choices: [ { text: "[ See what followed ]", next: "epilogue_facilitate" } ] },
  ending_witness: { location: "Forward Hold — Lower Aft", mood: "uncanny", text: "DYNAMIC", choices: [ { text: "[ Continue ]", next: "non_erat_dominus" } ] },
  non_erat_dominus: { location: "The Ship's Chapel — After", mood: "uncanny", text: "DYNAMIC", choices: [ { text: "[ See what followed ]", next: "epilogue_witness" } ] },
  epilogue_intercept: { location: "After the Crossing", mood: "tense", text: "DYNAMIC", choices: [ { text: "[ Begin the next crossing ]", next: "__new_play__", style: "cold" } ] },
  epilogue_facilitate: { location: "After the Crossing", mood: "revelation", text: "DYNAMIC", choices: [ { text: "[ Begin the next crossing ]", next: "__new_play__", style: "cold" } ] },
  epilogue_witness: { location: "After the Crossing", mood: "uncanny", text: "DYNAMIC", choices: [ { text: "[ Begin the next crossing ]", next: "__new_play__", style: "cold" } ] }
};