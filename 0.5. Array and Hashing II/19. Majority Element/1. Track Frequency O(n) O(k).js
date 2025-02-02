//* The majority element appears more than n / 2 times
//* Thus, we immediately calculate what that would be
//*     - half = Math.floor(nums.length / 2)
//* Instead of testing the frequency of each element in nums repeatedly (including duplicates)
//* We can track the frequency of each element as we go (in a single pass)
//* If the frequency of nums[i] is ever > half, then we found the majority element
function majorityElement(nums) {
  //* There is only one element
  if (nums.length === 1) return nums[0];

  const half = Math.floor(nums.length / 2);
  const freq = {};

  //* Get the frequency of each element
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;

    //* Found majority element
    if (freq[nums[i]] > half) return nums[i];
  }
}

console.log(majorityElement([3, 2, 3])); //* 3
console.log(majorityElement([2, 2, 1, 1, 1, 2, 2])); //* 2
console.log(majorityElement([-4, -4, 1, 2, 3, -4, -4])); //* -4
console.log(majorityElement([5, 5, 1, 2, -5, 5, 5])); //* 5

//* Time: O(n) - In the worst case, we iterate over the entire input

//* Space: O(k) - "k" represents the number of unique elements in freq
