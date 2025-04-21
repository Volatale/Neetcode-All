//* We want to track the frequency of every element in nums
//* Then, whenever we find an element whose frequency > 1, return true
//* Otherwise return false
function containsDuplicate(nums) {
  if (nums.length === 0) return false;

  //* nums[i] : frequency
  const freq = {};

  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;

    //* Found a duplicate
    if (freq[nums[i]] > 1) return true;
  }

  //* No Duplicates found
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1])); //* True
console.log(containsDuplicate([1, 2, 3, 4])); //* False
console.log(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])); //* True

//* Time: O(n) - In the worst case, there are no duplicates
//* So we need to explore the entire array

//* Space: O(n) - In the worst case, there are no duplicates, so there are "n" keys / values
