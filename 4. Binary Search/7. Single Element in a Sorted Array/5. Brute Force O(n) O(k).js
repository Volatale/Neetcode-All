//* We are given a SORTED array consisting of only integers that appear exactly twice
//* Except ONE integer appears once
//* The goal is to return the single element that appears once
//* Ultimately, this problem involves tracking frequencies
//* We can use a hashtable to keep track of key-value pairs
//* Then at the end, we can check for the element that only appeared once
function singleNonDuplicate(nums) {
  //* Integer : Frequency
  const freq = {};

  for (let i = 0; i < nums.length; i++) {
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Check which element only had a frequency of 1
  for (let key in freq) {
    if (freq.hasOwnProperty(key) && freq[key] === 1) {
      return Number(key);
    }
  }
}

console.log(singleNonDuplicate([1, 2, 2])); //* 1
console.log(singleNonDuplicate([1, 1, 2, 3, 3])); //* 2
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); //* 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); //* 10
console.log(singleNonDuplicate([50, 51, 51, 52, 52])); //* 50
console.log(singleNonDuplicate([0, 0, 1, 2, 2])); //* 1

//* Time: O(n) - The time taken scales with the size of the input array

//* Space: O(k) - The memory usage scales with the number of unique integers in the input
