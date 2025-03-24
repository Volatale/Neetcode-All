//* The reason for using a class is that we need to track "w" (the input array)
//* And we also need to access the sum of the entire "w" array
//* Within pickIndex(), we generate a random index between 0 and the sum of the array
//* Then, we can simply iterate through the array and track the cumulative sum of elements
//*     - This is essentially a prefix sum approach
//* The key intuition is that w[i] >= 1, so adding an element will ALWAYS increase the cumulative sum
//* If sum > number (the randomly generated index), return the current "i"
//! Instead of brute force searching the array to find the index, we can use binary search
//* Why? Because the range of possible indices is monotonically increasing
//*     - For example, with [1, 2, 3], the sum of the array is 6
//*         - Thus, the range of indices is [0, 5] -> 0, 1, 2, 3, 4, 5
//*         - i = 0 only corresponds to index 0
//*         - i = 1 corresponds to index 1 and 2
//*         - i = 2 corresponds ton index 3, 4, and 5
//*     - In other words, the list of indices is essentially SORTED
//* Use binary search to find the smallest index where prefixSum >= target
//* The only issue is, that we have to actually create the prefix array
//*     - The "w" array is not guaranteed to be monotonically increasing
//* Take this example:
//*     - nums = [1, 2, 3]
//*     - pref = [1, 3, 6]
//! As you can see, the pref array is monotonically increasing
//* So we can binary search to find the first index where pref[mid] >= target
//*     - If pref[mid] < target, then search the right portion of the array
//*     - If pref[mid] >= target, then we shouldn't eliminate "mid" from the search space (this could be the result)
//* The reason this works is because we can essentially assign multiple numbers to the same index
//*     - Since pref[1] = 3 and pref[0] = 1, take the difference
//*         - (3 - 1) = 2, so there are TWO indices that map to index 1
//*     - pref[2] = 6, pref[1] = 3
//*         - (6 - 3) = 3, so there are THREE indices that map to index 2, and so forth
//* Thus, our binary search is trying to find the earliest index that "target" maps to
class Solution {
  #pref;
  #totalSum;

  constructor(w) {
    this.#pref = new Array(w.length).fill(0);
    this.#pref[0] = w[0];

    //* Calculate the prefix sum
    for (let i = 1; i < w.length; i++) {
      this.#pref[i] = this.#pref[i - 1] + w[i];
    }

    //* The last index holds the sum of the entire array
    this.#totalSum = this.#pref[this.#pref.length - 1];
  }

  pickIndex() {
    //* Generate a random number (index) in the range [0, n - 1]
    const target = Math.random() * this.#totalSum;

    //* The search space is the range of indices (0 to n - 1)
    let left = 0;
    let right = this.#pref.length - 1;

    while (left < right) {
      const mid = left + ((right - left) >> 1);

      if (this.#pref[mid] >= target) {
        right = mid; //* We have either found the index, or we need an earlier index
      } else {
        left = mid + 1; //* We need a larger sum
      }
    }

    return left;
  }
}

//* Time: O(n) - It takes O(n) to create the class (prefix sums take O(n) time to generate)
//* However, the time complexity of pickIndex has reduced from O(n) to O(log n) due to binary search

//* Space: O(n) - We are creating a new array (pref) of length "n"
