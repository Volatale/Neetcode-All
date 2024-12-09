//* We are not allowed to have overlapping pairs (indices must be distinct)
//* Thus, we need to ensure we only use each index ONCE per pair
//* In a brute force manner, we can apply a backtracking approach
//*     - Try every possible permutation of pairs until we reach the final base case
//* A "used" array can be used to track which elements have already been paired in this branch
//* Our goal is to make n / 2 pairs, thus, that is also our base case
function canArrange(arr, k) {
  function backtrack(pairs) {
    //* Base Case: Managed to form "n / 2" pairs
    if (pairs.length === totalPairs) return true;

    //* Choose the element for index i (arr[i])
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;

      //* Choose an element to pair with arr[i] (index j)
      for (let j = i + 1; j < arr.length; j++) {
        if (used[j]) continue;

        //* Validate candidate
        if ((arr[i] + arr[j]) % k === 0) {
          used[j] = true;

          //* Explore these choices until we hit a base case
          if (backtrack([...pairs, [i, j]])) {
            return true;
          }

          //* Unchoose "j"; it failed (backtrack)
          used[j] = false;
        }
      }

      used[i] = false; //* Backtrack
      break; //! Only consider ONE pairing for the first element
    }

    return false;
  }

  //* The array length is odd
  if (arr.length & 1) return false;

  //* used[i] = whether or not arr[i] has already been used (avoid overlapping pairs)
  const used = new Array(arr.length).fill(false);
  const totalPairs = arr.length / 2;

  return backtrack([]);
}

console.log(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 7)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 10)); //* False
console.log(canArrange([1, -1, 2, 4, 3], 2)); //* False
console.log(canArrange([1, 2, 3, 4], 2)); //* True

//* Time: O(n!) - Technically it is O((n / 2)!) but we drop constants
//* We are exploring every possible permutation through the use of backtracking

//* Space: O(n) - The used array uses O(n) space, and the recursion depth is at most n / 2
