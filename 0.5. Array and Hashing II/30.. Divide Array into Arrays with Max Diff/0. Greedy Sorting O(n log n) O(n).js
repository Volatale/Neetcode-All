//* n % 3 === 0
//*     - No situation where there aren't enough or there are too many elements
//* We want to MINIMIZE the difference between each element
//*     - This works well with a sorted array
//* Ultimately, we are trying to build groups of 3
//*     - Since the elements are SORTED, we only have to check the first and last in the group
//*     - Due to the monotonic nature of the array, the middle element is always within the range of both
//*         - Thus, there is no need to check the middle if the outer elements are fine
//* Why does a greedy (sorting) approach work?
//*     - We want to use the duplicates immediately
//*         - This guarantees the smallest difference between adjacent elements
//!     - Choosing to "skip" an element to choose a later one will not work
//*         - The array is sorted, so later elements are greater than or equal to the current element
//*         - Choosing a LATER element ALSO means that future triplets are forced to choose an EARLIER element
//*             - We need to use every element regardless, so the skipped element will still be chosen
//*             - Therefore, all we'd be doing is increasing the difference within both arrays
function divideArray(nums, k) {
  //* Base Case - not possible to divide array
  if (nums.length % 3 !== 0) return [];

  const result = [];

  //* Sort the array to ensure the minimum difference between adjacent elements
  nums.sort((a, b) => a - b);

  //* Take elements in groups of 3 then compare the last and first elements
  //* nums[i] <= nums[i + 1] <= nums[i + 2], so we only need to compare the edges
  for (let i = 0; i < nums.length; i += 3) {
    const group = [nums[i], nums[i + 1], nums[i + 2]];
    if (group[2] - group[0] > k) return [];

    result.push(group);
  }

  return result;
}

console.log(divideArray([1, 2, 3, 4, 5, 6], 2)); //* [[1, 2, 3],[4, 5, 6]]
console.log(divideArray([1, 3, 4, 8, 7, 9, 3, 5, 1], 2)); //* [[1, 1, 3], [3, 4, 5], [7, 8, 9]]
console.log(divideArray([2, 4, 2, 2, 5, 2], 2)); //* []

//* Time: O(n log n) - Sorting the array takes O(n log n) assuming merge sort is used
//* Then, it takes O(n / 3) to iterate through nums (which ends up being O(n))

//* Space: O(n) - The result array's size scales with O(n / 3), so O(n) overall
//* The inbuilt sorting algorithm tends to use merge sort, so that uses O(n) memory implciitly
