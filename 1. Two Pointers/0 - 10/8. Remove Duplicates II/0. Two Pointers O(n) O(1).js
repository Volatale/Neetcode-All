//* Use Two Pointers
//* Left is the index we need to put the next unique duplicate
//* We need to count how many occurrences of the same element we have in a row
//* That is where right comes in
//* If the count of duplicates is <= 2, then set nums[left] = nums[right]
function removeDuplicatesII(nums) {
  let left = 1; //* Index to place next unique element
  let count = 1; //* Count of occurrences of current element

  for (let right = 1; right < nums.length; right++) {
    //* Check if we have a duplicate, if not, reset count
    if (nums[right] === nums[right - 1]) {
      count++;
    } else {
      count = 1;
    }

    //* Even if all are unique [1, 2, 3], we're saying nums[2] = nums[2]
    //* If left and right are the same
    if (count <= 2) {
      nums[left] = nums[right]; //* Place element at correct index
      left++;
    }
  }

  return left;
}

console.log(removeDuplicatesII([1, 1, 1, 2, 2, 3])); //* 5
console.log(removeDuplicatesII([0, 0, 1, 1, 1, 1, 2, 3, 3])); //* 7
console.log(removeDuplicatesII([1, 2, 3])); //* 3
console.log(removeDuplicatesII([0, 0, 0, 0, 0])); //* 2
console.log(removeDuplicatesII([1])); //* 1

//* Time: O(n) - It takes O(n) time to iterate through the entire array

//* Space: O(1) - The only space we use are constant space variables
