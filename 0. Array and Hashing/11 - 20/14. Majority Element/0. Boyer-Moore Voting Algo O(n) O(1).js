//* The majority element is the element that appears MORE THAN (n / 2) times
//* We are also guaranteed that a majority element exists
//*     - Mathematically speaking, this implies that the array must be of odd length
//*       otherwise, it would not be possible to have a non-majority element
//* Regardless of our approach, this is fundamentally a "frequency" problem
//* Instead of using a frequency map, we can use the Boyer-Moore Voting Algorithm
//* In our case, since the majority element's frequency only needs to be > (n / 2), we don't need to verify
//*     - In other words, there is no need to do a second pass through the array to verify the candidate
//* The "candidate" is the element that we "think" is our majority element
//*     - Track the running total (prefix sum) of the current candidate
//* If nums[i] !== candidate, decrement the count
//* Whenever the count becomes 0, we are "resetting" and need to pick a new candidate
//* But because the majority element appears MORE THAN (n / 2) times, it cannot be cancelled out completely
//* No matter how we reset, the true majority element will dominate overall
function majorityElement(nums) {
  let candidate = nums[0]; //* The element we "think" is the most frequent
  let count = 1; //* The count of our candidate. When this becomes 0, the candidate changes

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }

    //* The "new" candidate becomes the current element
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    }
  }

  return candidate;
}

console.log(majorityElement([1])); //* 1
console.log(majorityElement([4, 3, 4, 1, 4])); //* 4
console.log(majorityElement([3, 2, 3])); //* 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2])); //* 2

//* Time: O(n) - We iterate through the array once and simply track the frequency of every element

//* Space: O(1) - The memory usage remains constant regardless of input size
