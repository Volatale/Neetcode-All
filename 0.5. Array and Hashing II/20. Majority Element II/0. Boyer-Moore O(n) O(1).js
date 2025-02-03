//* We can use the Boyer-Moore Vote Algorithm
//!     - But we need to verify our candidates at the end, if we don't, we may end up with false positives
//*     - It is not possible to do check for majority elements in O(n) time and O(1) in a single pass
//* Choose two elements (nums[0] and nums[1]), and track their frequencies throughout the array
//* If nums[i] === candidate 1 or candidate2, increment that respective count
//* If count1 or count2 === 0, then we find a new candidate
//*     - Set candidate_i = nums[i]
//*     - Then, count_i++ (because this element counts as an occurrence)
//* If nums[i] does not equal candidate1 OR candidate2, decrement the counts of both
//*     - We ONLY find a new candidate if the count of either is at 0
//* After completing the first pass, we have our chosen candidates, but they still need verification
//* Reset the counts of both respective numbers
//* Then, iterate through again, getting the frequency of each (candidate1, candidate2)
//* Lastly, if the frequency of a candidate > (n / 3), that number is a majority element
//* Mathematically speaking, it is not possible to have more than 2 majority elements
//*     - So the result will either be an array of 1 or 2 numbers
function majorityElement(nums) {
  //* There is only one element, so just return that
  if (nums.length === 1) return [nums[0]];

  const result = [];

  //* Elements whose frequency > lowerLimit are majority elements
  const lowerLimit = Math.floor(nums.length / 3);

  let count1 = 0;
  let count2 = 0;
  let candidate1 = nums[0];
  let candidate2 = nums[1];

  //* 1. Find the candidates
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate1) {
      //* Continue with candidate1
      count1++;
    } else if (nums[i] === candidate2) {
      //* Continue with candidate2
      count2++;
    } else if (count1 === 0) {
      //* Found new majority candidate1
      candidate1 = nums[i];
      count1++;
    } else if (count2 === 0) {
      //* Found new majority candidate2
      candidate2 = nums[i];
      count2++;
    } else {
      //* Doesn't match either, decrement occurrences
      count1--;
      count2--;
    }
  }

  //* 2. Validate the candidates (reset counters for both)
  count1 = 0;
  count2 = 0;

  //* Count frequencies of both (else if prevents candidate1 === candidate2 situations)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === candidate1) {
      count1++;
    } else if (nums[i] === candidate2) {
      count2++;
    }
  }

  //* 3. Add to results (we have the verified candidates)
  if (count1 > lowerLimit) result.push(candidate1);
  if (count2 > lowerLimit) result.push(candidate2);

  return result;
}

console.log(majorityElement([3, 2, 3])); //* [3]
console.log(majorityElement([1])); //* [1]
console.log(majorityElement([1, 2])); //* [1, 2]
console.log(majorityElement([3, 4, 1, 1, 4, 1, 3, 4, 4])); //* [4]

//* Time: O(n) - We iterate over the entire array a single time - the time taken scales linearly (with n)

//* Space: O(1) - The space usage remains constant regardless of the input size
//* The return array either has 1 or 2 elements in it (we are guaranteed at least one majority element)
