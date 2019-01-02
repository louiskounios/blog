/**
 * Returns a shuffled copy of the input array. Input array is unchanged.
 * @param {Array} arrayIn items An array containing the items.
 * Adapted from https://stackoverflow.com/a/6274381
 */
function shuffle(arrayIn) {
  const arrayOut = [...arrayIn];
  for (let i = arrayOut.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOut[i], arrayOut[j]] = [arrayOut[j], arrayOut[i]];
  }

  return arrayOut;
}

export default shuffle;
