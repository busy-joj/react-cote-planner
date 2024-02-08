export const getBackjoonSolvedData = data => {
  const newData = data.reduce((acc, cur) => {
    let existingIndex = acc.findIndex(
      obj => obj.problemNum === cur.problemNum && obj.language === cur.language,
    );
    if (existingIndex >= 0) {
      acc[existingIndex].solvedTime.push(cur.solvedTime);
    } else {
      acc.push({
        problemNum: cur.problemNum,
        problemLink: cur.problemLink,
        language: cur.language,
        solvedTime: new Array(cur.solvedTime),
      });
    }
    return acc;
  }, []);
  return Object.values(newData);
};
