//* We need to know how many elements AFTER nums[i] are smaller than nums[i]
//* So in a brute force manner, we could simply try every possibility
//* For each index "i", count how many elements AFTER index i are smaller
function countSmaller(nums) {
  //* counts[i] = No. of Elements AFTER "i" SMALLER than nums[i]
  const counts = new Array(nums.length).fill(0);

  for (let i = 0; i < nums.length; i++) {
    let smaller = 0;

    for (let j = i + 1; j < nums.length; j++) {
      //* Found an element smaller than nums[i]
      if (nums[j] < nums[i]) {
        smaller++;
      }
    }

    counts[i] = smaller;
  }

  return counts;
}

console.log(countSmaller([5, 2, 6, 1])); //* [2, 1, 1, 0]
console.log(countSmaller([-1])); //* [-1]
console.log(countSmaller([-1, 0])); //* [0, 0]
console.log(countSmaller([1, 2, 3])); //* [0, 0, 0]
console.log(countSmaller([3, 2, 1])); //* [2, 1, 0]
console.log(countSmaller([1, 5, 2, -1, 2, 3])); //* [1, 4, 1, 0, 0, 0]

//* Time: O(n^2) - We have a pair of nested for loops, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
