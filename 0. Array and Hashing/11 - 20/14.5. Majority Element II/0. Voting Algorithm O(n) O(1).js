//* We need to find all of the elements that appear MORE than (n / 3) times
//*     - "All" implies that there could be multiple
//* The number of times an element appears is analogous to its frequency
//* However, simply tracking the frequency of each element requires O(n) space
//* Instead, we can use the Boyer-Moore Voting Algorithm
//* Since the threshold is elements whose frequency is > (n / 3), we need to verify the candidates

//! Mathematical Observation:
//* If an element appears more than (n / 3) times, there can't be more than 2 such elements
//* Why? Lets assume for the sake of contradiction that there ARE 3 elements that each appear > (n / 3) times, then:
//*     - Each appears more than (n / 3) times
//*     - Their combined frequencies would be > n (since (n / 3) + (n / 3) + (n / 3) = n)
//* But the array ONLY has "n" elements, so this is impossible
//* Therefore, AT MOST 2 elements can satisfy the condition of appearing more than (n / 3) times
//* Lets say n = 7
//*     - (7 / 3) = 2.3333, and 2.33333 * 3 = 7
//* For an element to have a frequency GREATER than 2.333, it'd have to be AT LEAST 3
//* We're saying there are potentially THREE elements whose frequency is at least 3, given n
//* However, mathematically, that is not possible, which was proven above
function majorityElement(nums) {
  if (nums.length === 0) return [];
  if (nums.length === 1) return [nums[0]];

  const results = [];

  let candidate1 = nums[0];
  let count1 = 0;
  let candidate2 = nums[0];
  let count2 = 0;

  const threshold = nums.length / 3;

  //* Find the candidates (mathematically, there can only be at most 2)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate1) {
      count1++;
    } else if (nums[i] === candidate2) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = nums[i];
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = nums[i];
      count2 = 1;
    } else {
      //* Value doesn't match either candidate
      count1--;
      count2--;
    }
  }

  //* Validate each of the candidates to ensure the are the majority elements
  count1 = 0;
  count2 = 0;

  //* Else if is used so we don't double count identical candidates
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate1) {
      count1++;
    } else if (nums[i] === candidate2) {
      count2++;
    }
  }

  //* Only add the valid candidates to the results array
  if (count1 > threshold) results.push(candidate1);
  if (count2 > threshold) results.push(candidate2);

  return results;
}

console.log(majorityElement([1, 2, 3, 1, 2, 1])); //* [1]
console.log(majorityElement([3])); //* [3]
console.log(majorityElement([2, 3, 2])); //* [2]
console.log(majorityElement([1, 2, 1, 4, 1]));
console.log(majorityElement([1, 5])); //* [1, 5]
console.log(majorityElement([1, 2, 1, 2, 1, 2])); //* [1, 2]
console.log(majorityElement([5, 2, 9])); //* []

//* Time: O(n) - We iterate through the entire array once, which takes O(n)
//* Then, we iterate through the array once more to validate the candidates

//* Space: O(1) - The memory usage remains constant regardless of input size
