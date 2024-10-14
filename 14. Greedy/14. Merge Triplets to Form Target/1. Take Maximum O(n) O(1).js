//* We can work toward our goal by only including triplets with values <= target[i]
//* For example, if our target is [3, 4, 5]
//*     - Including [4, 4, 5] would lead us to the incorrect result
//!     - So we should skip a triplet if it has a value > target[i] in ANY position
//*         - Why any position? We MUST merge the ENTIRE array
//*         - We can't pick and choose which indices we want to take the max() of
//* Then, we validate whether each index matches
//*     - That is, ensure result[i] === target[i] for every position
function mergeTriplets(triplets, target) {
  const result = new Array(3).fill(0);

  //* Try every triplet, skip the ones that have triplet[i] > target[i]
  for (const triplet of triplets) {
    if (
      triplet[0] <= target[0] &&
      triplet[1] <= target[1] &&
      triplet[2] <= target[2]
    ) {
      result[0] = Math.max(result[0], triplet[0]);
      result[1] = Math.max(result[1], triplet[1]);
      result[2] = Math.max(result[2], triplet[2]);
    }
  }

  //* Ensure that every value matches
  return result.every((val, i) => val === target[i]);
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

console.log(mergeTriplets([[1, 3, 1]], [1, 3, 2]));

//* Time: O(n) - We iterate over every triplet, which takes O(n)
//* The max() calls will always take O(1) since we only compare 2 values each time
//* It takes O(3) to validate if result === target, but this is constant time

//* Space: O(1) - We always create an array of length 3, so the space usage is constant
