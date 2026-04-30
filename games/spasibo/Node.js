// analyze_scenes.js – run with: node analyze_scenes.js
const fs = require('fs');
const path = require('path');

// Load your SCENES object – adjust the path to where your scenes are defined
const SCENES = require('./scenes.js').SCENES;

const report = {
  missingNext: [],
  unreachable: new Set(),
  intentMismatch: [],
  longLines: [],
  totalScenes: 0
};

function analyze() {
  const allSceneIds = new Set(Object.keys(SCENES));
  report.totalScenes = allSceneIds.size;

  // 1. Check each scene
  for (const [id, scene] of Object.entries(SCENES)) {
    // long lines in text
    const textArray = Array.isArray(scene.text) ? scene.text : [scene.text];
    for (let i = 0; i < textArray.length; i++) {
      const line = textArray[i];
      if (line && line.length > 100) {
        report.longLines.push({ scene: id, index: i, line: line.slice(0, 80) + '…' });
      }
    }

    // choices with missing next
    if (scene.choices) {
      for (let ci = 0; ci < scene.choices.length; ci++) {
        const ch = scene.choices[ci];
        if (!ch.next && !ch.roll && !ch.startRitual) {
          report.missingNext.push({ scene: id, choiceIndex: ci, text: ch.text });
        }
        // intent mismatch (if scene expects intent)
        if (scene.expectedIntent && ch.intent) {
          const expected = Array.isArray(scene.expectedIntent) ? scene.expectedIntent : [scene.expectedIntent];
          if (!expected.includes(ch.intent)) {
            report.intentMismatch.push({ scene: id, choiceIndex: ci, intent: ch.intent, expected: scene.expectedIntent });
          }
        }
      }
    }

    // mark reachable scenes from this scene's choices
    if (scene.choices) {
      for (const ch of scene.choices) {
        if (ch.next && SCENES[ch.next]) report.unreachable.delete(ch.next);
        if (ch.roll && ch.roll.successNext && SCENES[ch.roll.successNext]) report.unreachable.delete(ch.roll.successNext);
        if (ch.roll && ch.roll.partialNext && SCENES[ch.roll.partialNext]) report.unreachable.delete(ch.roll.partialNext);
        if (ch.roll && ch.roll.failNext && SCENES[ch.roll.failNext]) report.unreachable.delete(ch.roll.failNext);
      }
    }
    if (scene.return_to && SCENES[scene.return_to]) report.unreachable.delete(scene.return_to);
  }

  // initially all scenes are potentially unreachable
  for (const id of allSceneIds) report.unreachable.add(id);
  // mark starting scene reachable
  if (SCENES.chapel_waking) report.unreachable.delete('chapel_waking');
  // re‑run reachability (simple BFS)
  const reachable = new Set();
  const queue = ['chapel_waking'];
  while (queue.length) {
    const current = queue.shift();
    if (reachable.has(current)) continue;
    const scene = SCENES[current];
    if (!scene) continue;
    reachable.add(current);
    const collectNext = (nextId) => {
      if (nextId && SCENES[nextId] && !reachable.has(nextId)) queue.push(nextId);
    };
    if (scene.choices) {
      for (const ch of scene.choices) {
        if (ch.next) collectNext(ch.next);
        if (ch.roll) {
          if (ch.roll.successNext) collectNext(ch.roll.successNext);
          if (ch.roll.partialNext) collectNext(ch.roll.partialNext);
          if (ch.roll.failNext) collectNext(ch.roll.failNext);
        }
      }
    }
    if (scene.return_to) collectNext(scene.return_to);
  }
  for (const id of allSceneIds) if (!reachable.has(id)) report.unreachable.add(id);
  else report.unreachable.delete(id);

  // Output report
  console.log(JSON.stringify(report, null, 2));
}

analyze();