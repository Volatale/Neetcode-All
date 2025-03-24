//* The reason for using a class is that we need to track "w" (the input array)
//* And we also need to access the sum of the entire "w" array
//* Within pickIndex(), we generate a random index between 0 and the sum of the array
//* Then, we can simply iterate through the array and track the cumulative sum of elements
//*     - This is essentially a prefix sum approach
//* The key intuition is that w[i] >= 1, so adding an element will ALWAYS increase the cumulative sum
//* If sum > number (the randomly generated index), return the current "i"
//* For example, [1, 2, 3]
//*     - Lets say the randomly generated index is 0
//*     - The sum is 6, so the range of indices is [0, 5]
//*     - At i = 0, sum = 1 (0 + 1)
//!         - sum (1) > number (0), so we found the index we are looking for
//* [1, 2, 3, 4, 5]
//*     - Random index is 4
//*     - i = 0, sum = 1
//*     - i = 1, sum = 3
//*     - i = 2, sum = 6
//!         - sum (6) > number (4); we found the correct index
//* Why does this work? Because multiple numbers can map to the same index
//* For example, in an array like: [1, 2, 3]
//*     - The sum is 6, so the range of indices is [0, 5]
//*     - If the random index is 2
//*     - At i = 0, sum = 1
//*     - At i = 1, sum = 3
//*     - At i = 2, sum = 6
//!         - sum (6) > number (2)
class Solution {
  #nums;
  #sum;

  constructor(w) {
    this.#nums = w;
    this.#sum = this.#nums.reduce((acc, curr) => acc + curr, 0);
  }

  pickIndex() {
    //* Generate a random
    const number = Math.random() * this.#sum;
    let sum = 0;

    //* Sum the elements until we reach the correct index
    for (let i = 0; i < this.#nums.length; i++) {
      sum += this.#nums[i];

      if (sum > number) {
        return i;
      }
    }

    //* Fallback (this code should not be reached)
    return this.#nums.length - 1;
  }
}

//* Time: O(n) - It takes O(n) to find the correct index (and O(n) for the class setup)

//* Space: O(1) - We are passing an array reference to the class constructor, not creating a new array
