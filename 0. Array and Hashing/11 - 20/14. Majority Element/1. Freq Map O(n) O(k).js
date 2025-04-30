//* The majority element is the element that appears MORE THAN (n / 2) times
//* We are also guaranteed that a majority element exists
//*     - Mathematically speaking, this implies that the array must be of odd length
//*       otherwise, it would not be possible to have a non-majority element
//* Regardless of our approach, this is fundamentally a "frequency" problem
//* So we can simply compute (n / 2) and use that as our threshold
//* Use a map to track the frequency of every element
//*     - The first element we find whose frequency > threshold is our majority element
function majorityElement(nums) {
  //* Tracks the frequency of each element
  const freq = {};
  const threshold = nums.length / 2;

  //* Look for the first element whose frequency > threshold
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;

    //* Check if the current element is the majority element
    if (freq[nums[i]] > threshold) {
      return nums[i];
    }
  }
}

console.log(majorityElement([1])); //* 1
console.log(majorityElement([4, 3, 4, 1, 4])); //* 4
console.log(majorityElement([3, 2, 3])); //* 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2])); //* 2

//* Time: O(n) - We iterate through the array once and simply track the frequency of every element

//* Space: O(k) - The memory usage scales with the number of unique elements in nums (k)
