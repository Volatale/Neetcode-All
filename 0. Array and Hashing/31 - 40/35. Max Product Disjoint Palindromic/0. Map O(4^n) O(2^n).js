function maxProduct(s) {
  if (s.length === 2) return 1;

  const n = s.length;
  const map = new Map(); //* Bitmask : Length
  const palindromes = []; //* Store palindromes for each mask
  let maxProduct = 0;

  //* Start at 1 because "0" would imply choosing 0 elements, which is NOT a subsequence
  //* 1 << n is equivalent to 2 ** n, just more optimized since CPUs operate at the bit level
  for (let mask = 1; mask < 1 << n; mask++) {
    let subsequence = "";

    //* Go through every spot in the bitmask
    for (let i = 0; i < n; i++) {
      //* Does the bitmask include the character at this position?
      if (mask & (1 << i)) {
        //* If so, include it
        subsequence += s[i]; //* subsequence += s[n - 1 - i] works too
      }
    }

    if (isPalindrome(subsequence)) {
      map.set(mask, subsequence.length);
      palindromes[mask] = subsequence.length; //* Store palindrome for this mask
    }
  }

  //* Determine the longest pair of disjoint sequences
  for (let mask1 of map.keys()) {
    for (let mask2 of map.keys()) {
      //* They are disjoint
      if ((mask1 & mask2) === 0) {
        maxProduct = Math.max(
          maxProduct,
          palindromes[mask1] * palindromes[mask2]
        );
      }
    }
  }

  return maxProduct;
}

function isPalindrome(s) {
  for (let i = 0; i < s.length / 2; i++) {
    if (s[i] !== s[s.length - 1 - i]) return false;
  }

  return true;
}
console.log(maxProduct("leetcodecom")); //* 9
console.log(maxProduct("bb")); //* 1
console.log(maxProduct("accbcaxxcxx")); //* 25

//* Time: O(4^n) - We have to brute force the entire input
//* It takes O(2^n) time to iterate through all combinations of characters
//* At each step, we either include or exclude the character
//* It takes O(m) time to check for a palindrome
//* The final nested for loop takes O(2^n) in the worst case too, so we end up with O(4^n)

//* Space: O(2^n) - We use a map to store the palindrome lengths
//* The map can have 2^n possible subsequences if each entry is unique
//* The array also scales at a rate of 2^n
