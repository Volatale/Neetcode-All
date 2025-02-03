//* Get the frequencies of every EVEN element in nums (skip the odd elements)
//* While doing so, keep track of whatever the maximum frequency element was
//* Then, iterate through the keys in the object
//*     - If the frequency of an element matches the maxEvenFreq, this is a potential "smallest frequent even"
function mostFrequentEven(nums) {
  const freq = {};
  let maxEvenFreq = -1;
  let smallest = Infinity;

  //* Get the frequency of every even element (skip the odd elements)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] & 1) continue;

    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
    maxEvenFreq = Math.max(maxEvenFreq, freq[nums[i]]);
  }

  //* Find the smallest frequency
  for (const [num, count] of Object.entries(freq)) {
    if (count === maxEvenFreq) {
      smallest = Math.min(smallest, parseInt(num));
    }
  }

  //* There are no even numbers in the array
  return smallest === Infinity ? -1 : smallest;
}

console.log(mostFrequentEven([0, 1, 2, 2, 4, 4, 1])); //* 2
console.log(mostFrequentEven([4, 4, 4, 9, 2, 4])); //* 4
console.log(mostFrequentEven([29, 47, 21, 41, 13, 37, 25, 7])); //* -1
console.log(mostFrequentEven([1, 1, 1, 1, 8])); //* 8
console.log(mostFrequentEven([2, 4, 2, 4])); //* 2
console.log(mostFrequentEven([4, 6, 4, 6, 0, 0])); //* 0

//* Time: O(n) - We iterate through the entire array once, and then every unique element in the frequency map
//* In the worst case, every element in the array is unique and even, so the second loop takes O(n) time

//* Space: O(k) - The space usage scales with the number of unique numbers in the input array
