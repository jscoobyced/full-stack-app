import { randomNumber } from "./crypto"

describe('Crypto', () => {

  it('can return a random value', () => {
    const myRandom = randomNumber(100);
    expect(myRandom).toBeLessThan(100);
  })
})