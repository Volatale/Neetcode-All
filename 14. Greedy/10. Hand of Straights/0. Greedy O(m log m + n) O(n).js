//* To even be able to evenly distribute cards
//*     - The number of cards (n) must be divisible by groupSize
//* Every group has a Minimum and Maximum card
//*     - If "1" is our minimum, the LAST card in the group is "1 + groupSize - 1"
//*         - [1, 2, 3], if group size = 3
//*         - 1 + 4 - 1 = 3, so 3 is our final card
//* Instead of building groups one at a time
//*     - We can build multiple at the same time (if possible)
//* If 1 has a frequency of 2
//*     - Then every card put into the group must also have a frequency >= 2
//* [1, 1, 2, 2, 3, 3, 4, 4], groupSize = 2
//*     - Our groups are: [1, 2, 3, 4], [1, 2, 3, 4]
//*         - Since "1" has a frequency of 2
//*         - Every other card in the same group must have a frequency >= 2
//* Otherwise, if we had something like [1, 2, 3, 4], groupSize = 2
//*     - [1, 2], [3, 4] are the groups in this case
//*         - The frequency of both 1 and 3 (the minimums in each group) is 1
//*         - Thus, any cards in each of their respective groups need only have frequency of 1
function isNStraightHand(hand, groupSize) {
  //* Impossible to evenly distribute cards
  if (hand.length % groupSize !== 0) return false;

  const freq = {};

  //* Get count of all freq
  for (const card of hand) {
    freq[card] = (freq[card] || 0) + 1;
  }

  //* Sort the hand so we can try to form groups starting from the smallest card
  const uniqueCards = Object.keys(freq)
    .map(Number)
    .sort((a, b) => a - b);

  //* Try using each card to form consecutive groups
  for (const card of uniqueCards) {
    if (freq[card] > 0) {
      //* How many groups we need to form using this card
      const groupStartCount = freq[card];

      //* Use the current card as the "minimum" card
      for (let i = card; i < card + groupSize; i++) {
        //* Next card either doesn't exist, or there aren't enough of them
        if (!freq[i] || freq[i] < groupStartCount) return false;
        freq[i] -= groupStartCount; //* Use the required number of cards in this group
      }
    }
  }

  return true;
}

console.log(isNStraightHand([1, 1, 2, 2, 3, 3, 4, 4], 2)); //* True
console.log(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3)); //* True
console.log(isNStraightHand([1, 2, 3, 4, 5], 4)); //* False
console.log(isNStraightHand([4, 5, 1, 2, 3, 6], 2)); //* True
console.log(isNStraightHand([1, 2, 3], 1)); //* True
console.log(isNStraightHand([5, 5, 5, 5], 4)); //* False

//* Time: O(m log m + n) - It takes O(m log m) to sort the unique values
//* Creating the frequency map, getting all of the keys and mapping all take O(n) in the worst case
//* Validating groups takes O(n) - We process each value once

//* Space: O(n) - In the worst case, every element is unique
//* So the objects / arrays use O(n) space
