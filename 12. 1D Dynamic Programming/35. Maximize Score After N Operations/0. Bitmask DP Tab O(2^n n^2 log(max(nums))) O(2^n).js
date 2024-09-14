//* The array is size 2n
//* We need to perform "n" operations
//*     So number of operations === n / 2
//!     The array will always have an EVEN length
//* At in each iteration, we need to repeatedly select TWO elements
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
//* Apply tabulation to avoid redundant work
//*     - We only have to cache the mask itself
//*     - Regardless of the prior choices, the REMAINING unused indices could stay the same
//*         - So the "same" subproblem appears at multiple instances
function maxScore(nums) {
  if (nums.length === 0) return 0;

  const n = nums.length;
  const maxOperations = n / 2;

  //* dp[mask] = Maximum score we can get using elements according to mask
  const dp = new Array(1 << n).fill(0);

  //* For each element, we either include it or exclude it
  //* So there are 2^n possible subsets, thus, 2^n masks
  for (let mask = 0; mask < 1 << n; mask++) {
    const usedCount = countSetBits(mask);

    //* Current operation (based on no. of pairs selected thus far)
    const operation = Math.floor(usedCount / 2) + 1;

    //* Skip this mask; used all our operations already
    if (operation > maxOperations) continue;

    //* Try every possible pair of elements for this mask
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        //* Ensure neither the i-th or j-th element has been taken
        if (mask & (1 << i) || mask & (1 << j)) continue;

        //* Create a new mask with the ith and jth elements "taken"
        let newMask = mask | (1 << i) | (1 << j);

        let score = operation * gcd(nums[i], nums[j]);
        dp[newMask] = Math.max(dp[newMask], dp[mask] + score);
      }
    }
  }

  //* Return max score where every element is taken
  return dp[(1 << n) - 1];
}

//* Euclid's Algorithm
//* O(log(min(a, b)))
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

//* Count number of 1 bits
//* O(log n)
function countSetBits(n) {
  let count = 0;

  while (n > 0) {
    n = n & (n - 1);
    count++;
  }

  return count;
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

//* Space: O(2^n) - There are 2^n possible masks, thus there are 2^n possible keys/values
