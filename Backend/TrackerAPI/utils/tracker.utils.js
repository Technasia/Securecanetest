const calcPosition = (string, positionInSplit, sliceNumber) => {
  let stringParsed = string.split(',')[positionInSplit].replace('.', '');
  let firstNumbers = parseInt(stringParsed.substring(0, sliceNumber));
  stringParsed = stringParsed.slice(sliceNumber).replace('.', '');
  stringParsed = parseInt(stringParsed)/60
  stringParsed = parseInt(stringParsed)
  return parseFloat(`${firstNumbers.toString()}.${(stringParsed).toString()}`);
}

const getPositionFromNMEA = (string) => {
  const latResult = calcPosition(string, 3, 2);
  const lonResult = calcPosition(string, 5, 3);
  return {
    "lat": latResult || null,
    "lng": lonResult || null
  }
};

module.exports = {
  getPositionFromNMEA
}
