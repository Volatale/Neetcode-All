//* Track the maximum frequency (of an even number) found thus far
//* But also track whatever the smallest even number is that also has the maximum frequency
//* It is possible to do this in a single pass using the above variables
//* Every time we encounter an even number, increment the frequency of nums[i]
//* If we found a number with a frequency higher than previously recorded
//*     - The smallest even becomes "num"
//*     - And maxFreq is set to freq[num]
//* Else if, we found a number that has the SAME frequency as the max recorded thus far AND its < smallest
//*     - Then we found a number that is equal frequency, but wins out in the tie-breaker
//*     - [2, 4, 2, 4]
//*         - Here, 2 will be the most frequent (smallest) even number
//*         - 4 ALSO has 2 occurrences, but 4 > 2, so we don't update
function mostFrequentEven(nums) {
  const freq = {};

  let smallestEven = Infinity;
  let maxFreq = 0;

  for (let num of nums) {
    //* Skip odd numbers
    if (num & 1) continue;

    //* Increase frequency
    freq[num] = (freq[num] || 0) + 1;

    //* If we found a new maxFreq, or, we found an EQUAL max freq, but "num" is SMALLER
    if (freq[num] > maxFreq || (freq[num] === maxFreq && num < smallestEven)) {
      smallestEven = num;
      maxFreq = freq[num];
    }
  }

  return maxFreq === 0 ? -1 : smallestEven;
}

console.log(mostFrequentEven([0, 1, 2, 2, 4, 4, 1])); //* 2
console.log(mostFrequentEven([4, 4, 4, 9, 2, 4])); //* 4
console.log(mostFrequentEven([29, 47, 21, 41, 13, 37, 25, 7])); //* -1
console.log(mostFrequentEven([1, 1, 1, 1, 8])); //* 8
console.log(mostFrequentEven([2, 4, 2, 4])); //* 2
console.log(mostFrequentEven([4, 6, 4, 6, 0, 0])); //* 0

//* Time: O(n) - We iterate through the entire array once, so the time taken scales with the input size

//* Space: O(1) - The memory usage does not scale with the input size
