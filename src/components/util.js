const numberToPaddedHex = (number, bytes) => {
  if (bytes === undefined) bytes = 1;
  return number
    .toString(16)
    .padStart(2 * bytes, '0')
    .toUpperCase();
};

export { numberToPaddedHex };
