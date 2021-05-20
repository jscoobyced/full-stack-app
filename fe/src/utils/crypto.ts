export const randomNumber = (maxValue: number): number => {
  const crypto = window.crypto || window.Crypto;
  const array = new Uint32Array(1);
  const randoms = crypto.getRandomValues(array);
  return randoms[0] % maxValue;
}
