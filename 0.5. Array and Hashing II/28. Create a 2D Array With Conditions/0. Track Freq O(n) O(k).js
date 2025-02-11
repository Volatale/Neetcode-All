//* Each subsequent row should have number of elements <= previous row
//! We want to maximize the number of elements used in each row
//* Place as many elements from nums in each row as possible
//*     - Successive rows should have less elements in them
//*     - This minimizes the total number of rows overall
//*     - We are ALWAYS trying to use as many elements per row as possible
//* Number of rows needed = max frequency of element t in nums[i]
//* Track the frequency of each element as we find it
//* The frequency of nums[i] actually tells us what row to put the element into
//*     - Indices are 0 indexed
//*     - If we found "1" for the first time, its row should be 0
//*     - So technically, the corresponding row matches the (current) frequency - 1
function findMatrix(nums) {
  const result = [];
  const freq = {}; //* Get the frequency of every element

  for (let i = 0; i < nums.length; i++) {
    //* The row this element should be placed in
    const row = freq[nums[i]] || 0;

    //* Create a new row - or we'll go out of bounds
    if (result.length === row) {
      result.push([]);
    }

    result[row].push(nums[i]); //* Add this element to the correct row
    freq[nums[i]] = (freq[nums[i]] || 0) + 1; //* Next occurrence goes on the following row
  }

  return result;
}

console.log(findMatrix([1, 3, 4, 1, 2, 3, 1])); //* [[1, 3, 4, 2], [1, 3], [1]]
console.log(findMatrix([1, 2, 3, 4])); //* [4, 3, 2, 1]

//* Time: O(n) - We iterate over the entire array once, which takes O(n)

//* Space: O(k) - Where "k" is the number of unique elements in nums
