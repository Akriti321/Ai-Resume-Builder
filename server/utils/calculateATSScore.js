export const calculateATSScore = (
  matchedSkills,
  missingSkills
) => {

  const totalSkills =
    matchedSkills.length +
    missingSkills.length;

  if (totalSkills === 0) {
    return 0;
  }

  const score =
    (matchedSkills.length / totalSkills) * 100;

  return Math.round(score);
};