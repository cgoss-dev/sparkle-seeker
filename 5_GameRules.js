// NOTE: 5_GameRules
// Score thresholds, progression rules, win-goal helpers,
// and shared progression/help copy used by the UI.
//
// Owned here:
// - level rules
// - win score / progression constants
// - overlay timing constants tied to game feel
// - win-goal and title helpers
// - shared screen copy for welcome / paused / help screens
// - helpers for current level / progress meter
//
// NOT owned here:
// - screen state
// - menu layout
// - rendering
// - general UI flow
//
// Newbie note:
// - If code answers "how far through the run is the player?",
//   "what is the goal?", or "what text explains that goal?",
//   it belongs here.

import {
     sparkleScore
} from "./3_State.js";

// ====================================================================================================
// NOTE: LEVELS
// `scoreMin` is inclusive. Ten levels cover scores 0-999; 1000+ wins.
// ====================================================================================================

export const winScore = 1000;
export const startOverlayDuration = 120;
export const overlayFadeFrames = 30;
export const levelPopupDuration = 120;
export const maxLevelProgressUnits = 10;
export const progressUnitsPerCircle = 2;

const levelRules = Array.from({ length: maxLevelProgressUnits }, (_, index) => ({
     levelNumber: index + 1,
     scoreMin: index * 100
}));

// ====================================================================================================
// NOTE: WELCOME / BUTTON TEXT
// ====================================================================================================

const welcomeTitleLines = ["SPARKLE", "SEEKER"];
const screenActionTexts = ["NEW GAME", "TIPS", "OPTIONS"];
const pausedActionTexts = ["RESUME", "TIPS", "OPTIONS"];

export function getWelcomeTitleLines() {
     return welcomeTitleLines;
}

export function getWinGoalText() {
     return `Reach ${winScore}+ sparkles to win.`;
}

export function getWinTitleLines() {
     return ["YOU", "WIN"];
}

export function getLoseTitleLines() {
     return ["TRY", "AGAIN"];
}

export function getScreenTitleLinesForMode(gameScreenMode) {
     if (gameScreenMode === "screenYouWin") {
          return getWinTitleLines();
     }

     if (gameScreenMode === "screenTryAgain") {
          return getLoseTitleLines();
     }

     return getWelcomeTitleLines();
}

export function getCurrentScreenActionTexts() {
     return screenActionTexts;
}

export function getCurrentPausedActionTexts() {
     return pausedActionTexts;
}

// ====================================================================================================
// NOTE: TIPS TEXT
// ====================================================================================================

export function getHowToPlayLines() {
     return [
          "Seek sparkles to level and heal.",
          "Avoid bombs. They deal damage.",
          getWinGoalText()
     ];
}

export function getEffectLines() {
     return [
          "{iconLuck} Luck: doubles points.",
          "{iconMagnet} Magnet: triples pickup range.",
          "{iconSlowmo} Slowmo: objects 1/4 speed.",

          "{iconFreeze} Freeze: freezes player.",
          "{iconDaze} Daze: reverses movement.",
          "{iconFog} Fog: limits visible area."
     ];
}

export function getDifficultyOptionLines() {
     return [
          "OFF: sparkles only.",
          "MIN: sparkles and bombs; bombs fall 1 per 2 sparkles.",
          "LOW: effects fall 1 per 24 sparkles.",
          "MED: effects fall 1 per 16 sparkles.",
          "MAX: effects fall 1 per 8 sparkles."
     ];
}

export function getAudioOptionLines() {
     return [
          "OFF",
          "MIN: 25%",
          "LOW: 50%",
          "MED: 75%",
          "MAX: 100%"
     ];
}

export function getMovementOptionLines() {
     return [
          "Touch/Click: move toward taps and clicks.",
          "WASD/Arrows: keyboard-only movement.",
          "Joystick Left: lower-left touch joystick.",
          "Joystick Right: lower-right touch joystick."
     ];
}

export function getColorOptionLines() {
     return [
          "Full Color: original rainbow board.",
          "Black & White: monochrome accessibility board.",
          "High Contrast: bombs red, sparkles blue, effects green."
     ];
}

// ==================================================
// LEVEL HELPERS
// ==================================================

export function getCurrentLevelData() {
     let currentLevelData = levelRules[0];

     for (let i = 0; i < levelRules.length; i += 1) {
          if (sparkleScore >= levelRules[i].scoreMin) {
               currentLevelData = levelRules[i];
          } else {
               break;
          }
     }

     return currentLevelData;
}

export function getCurrentLevelMeterUnits() {
     const currentLevelData = getCurrentLevelData();
     const pointsIntoLevel = sparkleScore - currentLevelData.scoreMin;
     const completedLevels = currentLevelData.levelNumber - 1;
     const halfwayToNextLevel = pointsIntoLevel >= 50 ? 1 : 0;

     return Math.min(maxLevelProgressUnits, completedLevels + halfwayToNextLevel);
}

export function getCurrentLevelNumber() {
     return getCurrentLevelData().levelNumber;
}
