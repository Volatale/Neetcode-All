//* The array is size 2n
//* We need to perform "n" operations
//*     So number of operations === n / 2
//!     The array will always have an EVEN length
//* At each level of recursion, we need to repeatedly select TWO elements
//*         - Compute their GCD
//*         - There are C(n,2) (n * (n - 1) / 2) possible combinations
//* In order to track which elements have ALREADY been taken
//*     - Use a bitmask at each level of recursion
//!         - If the ith bit is set (1), the ith element has been taken
//!         - Do the same for the jth element
//*     - A bitmask specifically is not required, we COULD use a boolean array
//!         - But this would use more space and increase the runtime
//* Brute force works here because we don't know what the optimal selection is
//*     - So we compute EVERY possible path and calculate the best option from there
function maxScore(nums) {
  function getScore(mask, operation, memo) {
    //* Base Case: Made too many operations
    if (operation > maxOperations) return 0;

    let maxScore = 0;

    //* Try every possible pair of elements; we don't know which will be the best
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        //* Ensure neither the ith or jth element have been taken
        if (mask & (1 << i) || mask & (1 << j)) continue;

        //* Flag the ith and jth bit in a NEW mask
        let newMask = mask | (1 << i) | (1 << j);

        let score = operation * gcd(nums[i], nums[j]);
        maxScore = Math.max(
          maxScore,
          score + getScore(newMask, operation + 1, memo)
        );
      }
    }

    return maxScore;
  }

  const maxOperations = nums.length / 2;

  //* Mask starts at 0, and we start at the FIRST operation
  return getScore(0, 1);
}

//* Find the GCD of a and b
//* O(log min(a, b))
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

console.log(maxScore([1, 2])); //* 1
console.log(maxScore([3, 4, 6, 8])); //* 11
console.log(maxScore([1, 2, 3, 4, 5, 6])); //* 14

//* Time: O(2^n * n^2 * log(max(nums))) - There are "n" elements in total and we have a nested for loop
//* The recursion depth scales with n / 2 since there are "n" elements and we remove two each call
//* Each element can either be included or excluded, so there are two decisions for each element
//* Calculating the GCD takes is BOUNDED by O(log(max(nums)))
//* Technically we could say O(log(min(a,b))), but in the worst case, a or b will be the largest number in the array
//* We calculate the GCD within each inner loop

//* Space: O(n) - The depth of the recursion tree scales with the number of operations
//* The array has a length of "n", and there are n / 2 operations, so the space usage scales with "n"
