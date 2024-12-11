//* We want to find two numbers (nums[i], nums[j]) such that their sum % K = 0
//*     - In other words, their sum must be divisible by K
//! We can apply the Distributive Law of Modulo
//*     - (a + b) % k = ((a % k) + (b % k)) % k
//! So instead of summing the elements themselves, we can actually just SUM THEIR REMAINDERS
//* rem_1 + rem_2 = k
//* Using algebra, we can isolate rem_2
//*     - rem_1 + rem_2 = k
//*             Subtract rem_2 from both sides
//*     - rem_1 = k - rem_2
//*             Subtract k from bothb sides
//*     - -rem_2 = rem_1 - k (that is MINUS -rem2, we want POSITIVE rem_2 not NEGATIVE rem_2)
//*             Multiply through -1 (flip the signs)
//*     - rem_2 = k - rem_1
//! All we have to do is get the remainder of every element
//*     - Use an array or hashtable to track the frequency of each number
//!     - Remember, a remainder will ALWAYS be in the range [0, k - 1]
//*         - The pigeonhole principle applies here, so there will be overlaps
//* If freq[0] % 2 !== 0, then we return false
//*     - The number of elements DIRECTLY divisible by K should be even
//* Lastly, we just pair "i" with "k - i"
//*     - There are only 2 pairs, so we divide k by 2
//!         - rem_2 = k - rem_1
//!         - rem_1 = k - rem_2
function canArrange(arr, k) {
  //* remanderCount[i] = Frequency of that remainder (remainder is always in range [0, k-1])
  const remainderCount = new Array(k).fill(0);

  //* Get all of the remainders (they are in the range [0, k - 1])
  for (let i = 0; i < arr.length; i++) {
    const remainder = ((arr[i] % k) + k) % k;
    remainderCount[remainder]++;
  }

  //* The number of elements directly divisible by k should be even
  if (remainderCount[0] % 2 !== 0) return false;

  //* Pair all of the elements using their REMAINDERS, not their actual sum: rem_2 = k - rem_1 (i represents rem_1)
  //* (a + b) % k = ((a % k) + (b % k)) % k, so we can sum their remainders instead of the elements themselves
  for (let i = 1; i <= k / 2; i++) {
    if (remainderCount[i] !== remainderCount[k - i]) {
      return false;
    }
  }

  return true;
}

console.log(canArrange([1, 2, 3, 4, 5, 10, 6, 7, 8, 9], 5)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 7)); //* True
console.log(canArrange([1, 2, 3, 4, 5, 6], 10)); //* False
console.log(canArrange([1, -1, 2, 4], 2)); //* True
console.log(canArrange([1, 2, 3, 4], 2)); //* True

//* Time: O(n + k) - It takes O(n) to find the remainder of every element (n = arr.length)
//* Then, it takes O(k / 2) -> O(k) to pair every element in the worst case
//* That gives us n + k

//* Space: O(k) - The array size scales with k itself: the range of remainders is always [0, k-1]
//* Thus the array size will scale with the number of possible remainders (pigeonhole principle applies)
