//* Use two nested for loops
//* "i" represents the value we are trying to find
//* The inner loop starts from 0 because the value "i" could be anywhere within the array
//* If notFound is true at the end of the inner loop, "i" was not found within the array; add it to results
function findDisappearedNumbers(nums) {
  const results = [];

  for (let i = 1; i <= nums.length; i++) {
    let notFound = true;

    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === i) {
        notFound = false;
        break;
      }
    }

    if (notFound) results.push(i);
  }

  return results;
}

console.log(findDisappearedNumbers([1, 4, 4, 2])); // [3]
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5, 6]
console.log(findDisappearedNumbers([1, 1])); // [2]

//* Time: O(n^2) - We have two nested for loops, i and j
//* Both depend on the length of the input array, so the time taken scales exponentially with the size of the input

//* Space: O(1) - The space used by the function remains constant regardless of the input size
//* We only use constant space variables
