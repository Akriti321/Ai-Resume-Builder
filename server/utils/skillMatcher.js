import { skillDictionary } from "./skillDictionary.js";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts a list of canonical skills found in the provided text.
 * Uses a custom word-boundary regular expression that handles special characters like C++, C#, etc.
 * 
 * @param {string} text - The input text to scan.
 * @returns {string[]} Array of canonical skill names found.
 */
export const extractSkills = (text) => {
  if (!text) return [];
  const lowercaseText = text.toLowerCase();
  const foundSkills = new Set();

  Object.entries(skillDictionary).forEach(([key, canonicalName]) => {
    const escapedKey = escapeRegExp(key);
    // Custom boundary check:
    // Match the key only if it is preceded and followed by:
    // - start/end of string OR
    // - any character that is NOT alphanumeric, underscore, '#', or '+'
    const pattern = `(?:^|[^a-zA-Z0-9_#+])(${escapedKey})(?:$|[^a-zA-Z0-9_#+])`;
    const regex = new RegExp(pattern, "i");

    if (regex.test(lowercaseText)) {
      foundSkills.add(canonicalName);
    }
  });

  return Array.from(foundSkills);
};
