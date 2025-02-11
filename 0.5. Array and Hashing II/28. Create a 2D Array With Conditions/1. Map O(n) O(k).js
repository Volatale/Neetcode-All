//* Each subsequent row should have number of elements <= previous row
//! We want to maximize the number of elements used in each row
//* Place as many elements from nums in each row as possible
//*     - Successive rows should have less elements in them
//*     - This minimizes the total number of rows overall
//*     - We are ALWAYS trying to use as many elements per row as possible
//* Number of rows needed = max frequency of element t in nums[i]
function findMatrix(nums) {
  const result = [];
  const freq = {}; //* Get the frequency of every element
  let uniqueElements = 0; //* When this is 0, exit while loop

  //* Get frequency of every element and count the number of uniques
  for (let i = 0; i < nums.length; i++) {
    if (freq[nums[i]] === undefined) uniqueElements++;
    freq[nums[i]] = (freq[nums[i]] || 0) + 1;
  }

  //* Iterate over elements in freq and ensure one exists in each row
  while (uniqueElements > 0) {
    const row = [];

    //* Add every unique element that still exists in freq to row
    for (let number of Object.keys(freq)) {
      row.push(parseInt(number));

      //* Decrement occurrence of number
      freq[number] -= 1;

      //* Remove all keys with 0 frequency
      if (freq[number] === 0) {
        delete freq[number];
        uniqueElements--;
      }
    }

    result.push(row);
  }

  return result;
}

console.log(findMatrix([1, 3, 4, 1, 2, 3, 1])); //* [[1, 3, 4, 2], [1, 3], [1]]
console.log(findMatrix([1, 2, 3, 4])); //* [4, 3, 2, 1]

//* Time: O(n) - Getting the frequency of every element in nums takes O(n)
//* Then, within the while loop, the maximum number of iterations scales with "n" again

//* Space: O(k) - Where "k" is the number of unique elements in nums
