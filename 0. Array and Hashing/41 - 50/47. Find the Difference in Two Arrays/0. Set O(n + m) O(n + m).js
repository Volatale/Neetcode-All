function findDifference(nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);

  //* Check if any value in set1 exists in set2
  //* Don't loop through set2 because we know ONLY the iterated values can exist in set2 and be non-unique
  for (let num of set1) {
    if (set2.has(num)) {
      set1.delete(num);
      set2.delete(num);
    }
  }

  return [[...set1], [...set2]];
}

console.log(findDifference([1, 2, 3], [2, 4, 6])); //* [[1, 3], [4, 6]]
console.log(findDifference([1, 2], [2, 4])); //* [[1], [4]]
console.log(findDifference([1, 1], [1, 2, 4, 6])); //* [[], [2, 4, 6]]
console.log(findDifference([5], [5])); //* [[], []]
console.log(findDifference([5], [10])); //* [[5], [10]]
console.log(findDifference([1, 2, 3, 3], [1, 1, 2, 2])); //* [[3], []]

//* Time: O(n + m) - The time taken to add every element to the respective set scales with "n" & "m"
//* It then takes O(n) time to iterate through each unique element in set1
//* If there are no duplicates, we have to iterate through every element in set1

//* Space: O(n + m) - In the worst case, none of the values have duplicates
//* We have two inputs and therefore two variable (n, m)
//* The return value contains all of the remaining elements
