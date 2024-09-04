//* We have two choices to make at each level of recursion
//*     - Append "zero" 0s
//*     - Append "ones" 1s
//! There is no need to actually use a string
//*     - Just track the LENGTH of what the string would be
//*     - If length > high, this is NOT a valid "good" string

//! Recurrence Relation: F(n) = F(n + zero) + F(n + ones)
function countGoodStrings(low, high, zero, one) {
  function count(length) {
    //* No longer a good string
    if (length > high) return 0;

    let goodStrings = 0;

    //* Valid good string
    if (length >= low) goodStrings++;

    //* Case 1: Append zeroes
    goodStrings += count(length + zero);

    //* Case 2: Append ones
    goodStrings += count(length + one);

    return goodStrings % (10 ** 9 + 7);
  }

  return count(0) % (10 ** 9 + 7);
}

console.log(countGoodStrings(3, 3, 1, 1)); //* 8
console.log(countGoodStrings(1, 1, 1, 1)); //* 2
console.log(countGoodStrings(2, 3, 1, 2)); //*  5

//* Time: O(2^high) - At each level of recursion there are two choices we can make
//* Thus, the branching factor is 2. In the worst case, we only increase the length by 1 each call
//* Therefore the depth of the recursion tree scales with "high"

//* Space: O(high) - The depth of the recursion tree scales with "high"
//* Each level of recursion holds "s", whose max length scales with "high"
