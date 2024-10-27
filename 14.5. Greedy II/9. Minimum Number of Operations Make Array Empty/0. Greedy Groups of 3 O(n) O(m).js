//* Each group of numbers needs to be decomposed into groups of 2 or 3
//*     - Ideally, we want to delete as many 3 groups as possible
//*     - Then delete a 2 group using the remainder
//* Get the frequency of every task
//*     - If the frequency of the current task is 1, return -1
//*         - It is impossible to delete all of the numbers in this case
//*     - Otherwise, it is definitely possible to decompose the frequency
//* If freq % 3 === 0
//*     - Then we can evenly delete this number in groups of 3
//*     - This results in the minimum number of "deletions" needed
//*         - rounds += freq / 3
//* Else
//*     - We will need one extra round of 2
//*     - rounds += Math.floor(freq / 3) + 1
//*         - For example, 5 can be built using (3 + 2) = 5
//*         - 8 can be built using (3 + 3 + 2) = 8
//*         - 11 can be built using (3 + 3 + 3 + 2) = 11
//*     - 8 % 3 = 2, so there is two left over
//*         - Hence we need one extra round to handle these numbers
function minOperations(nums) {
  //* It isn't possible to delete any numbers with < 2 occurrences
  if (nums.length < 2) return -1;

  let deletions = 0;

  //* Get frequency of each number
  const freqMap = {};

  for (let num of nums) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }

  //* Try to delete as many numbers in threes as we can
  for (let num in freqMap) {
    const freq = freqMap[num];

    //* Can't delete a lone number
    if (freq === 1) return -1;

    if (freq % 3 === 0) {
      //* We can delete this number in groups of 3
      deletions += freq / 3;
    } else {
      //* We need one additional round to handle excess
      deletions += Math.floor(freq / 3) + 1;
    }
  }

  return deletions;
}

//* Time: O(n) - Building the frequency map takes O(n) where "n" is the number of numbers
//* Processing the frequency map takes O(n) in the worst case, but will generally be less than "n"

//* Space: O(m) - The frequency map uses O(m) space where "m" is the number of unique numbers

console.log(minOperations([3, 3, 3, 3, 3])); //* 2
console.log(minOperations([2, 2, 3, 3, 2, 4, 4, 4, 4, 4])); //* 4
console.log(minOperations([2, 3, 3])); //* -1
console.log(minOperations([1])); //* -1
console.log(minOperations([5, 2, 1])); //* -1
console.log(minOperations([5, 5])); //* 1
