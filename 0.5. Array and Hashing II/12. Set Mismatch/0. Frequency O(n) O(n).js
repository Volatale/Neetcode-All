//* Track the frequency of each number
//* If a number has an occurrence of two, we found the duplicated number
//* Then, check for the number that is missing
//* Any number that does not exist in the hashtable is missing
function findErrorNums(nums) {
  const freq = {}; //* Track frequency of each number
  const results = [];

  //* Get frequency of every number
  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
    if (freq[nums[i]] === 2) results.push(nums[i]);
  }

  //* Find the number that does not exist
  for (let i = 1; i <= nums.length; i++) {
    //* "i" is missing from the hashtable
    if (freq[i] === undefined) {
      results.push(i);
    }
  }

  return results;
}

console.log(findErrorNums([1, 2, 2, 4])); //* [2, 3]
console.log(findErrorNums([1, 1])); //* [1, 2]
console.log(findErrorNums([1, 2, 3, 4, 5, 6, 4])); //* [4, 7]

//* Time: O(n) - It takes O(n) to get the frequency of each number
//* And then it takes O(n) to determine which number is missing

//* Space: O(n) - The frequency map uses O(n) space; the number of keys scales with "n", and there are n - 1 keys/values to store
