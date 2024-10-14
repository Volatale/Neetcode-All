//* Instead of actually updating something using max()
//* We can instead just try to find a matching value for every index
//* Avoid using any triplet that has a value > target[i]
//!     - Its inclusion would prevent us from reaching the correct result
//* Whenever we find a matching value, add the index to the set
//*     - If the set's size is 3, then we know we found a value for every index
function mergeTriplets(triplets, target) {
  const matchedIndices = new Set();

  //* Any triplet that has a value > what we need in that place is invalid
  for (const triplet of triplets) {
    if (
      triplet[0] > target[0] ||
      triplet[1] > target[1] ||
      triplet[2] > target[2]
    ) {
      continue;
    }

    //* Try to find a match for every value in target
    for (let i = 0; i < triplet.length; i++) {
      if (triplet[i] === target[i]) {
        matchedIndices.add(i);
      }
    }
  }

  //* Whether or not we matched all 3 indices of target
  return matchedIndices.size === 3;
}

console.log(
  mergeTriplets(
    [
      [2, 5, 3],
      [1, 8, 4],
      [1, 7, 5],
    ],
    [2, 7, 5]
  )
); //* True

console.log(
  mergeTriplets(
    [
      [3, 4, 5],
      [4, 5, 6],
    ],
    [3, 2, 5]
  )
); //* False

console.log(
  mergeTriplets(
    [
      [2, 5, 3],
      [2, 3, 4],
      [1, 2, 5],
      [5, 2, 3],
    ],
    [5, 5, 5]
  )
); //* True

//* Time: O(n) - We iterate over every triplet, which takes O(n)
//* The nested loop will always do 3 iterations max, so the true time complexity is O(n * 3)
//* But we need to drop constants in Big O Notation

//* Space: O(1) - The set's size is capped at 3 since we only ever have 3 find 3 indices
