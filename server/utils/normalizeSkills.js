import {
  skillDictionary
}
from "./skillDictionary.js";

export const normalizeSkills =
(text) => {

  let normalized =
    text.toLowerCase();

  Object.entries(
    skillDictionary
  ).forEach(([key, value]) => {

    const regex =
      new RegExp(
        `\\b${key}\\b`,
        "gi"
      );

    normalized =
      normalized.replace(
        regex,
        value
      );
  });

  return normalized;
};