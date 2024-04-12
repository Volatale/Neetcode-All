//* Use two sets to keep track of the unique values in each respective array
//* Iterate through the first array, and compare each value with every value in the other array
//* If the element is distinct, add it to the respective set
//* Do the same for the opposing array
//* We need to return an array of array, so spread the values of each array into a new nested array
function findDifference(nums1, nums2) {
  //* Use sets for their distinct properties
  const set1 = new Set();
  const set2 = new Set();

  //* For each value in nums1
  for (let i = 0; i < nums1.length; i++) {
    let distinct = true;

    //* Try to find a value that exists in nums2
    for (let j = 0; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        distinct = false;
        break;
      }
    }

    //* If it doesn't exist in the other, add it to the set
    if (distinct) {
      set1.add(nums1[i]);
    }
  }

  //* Do the same check for every value in nums2
  for (let i = 0; i < nums2.length; i++) {
    let distinct = true;

    //* This time compare with nums1
    for (let j = 0; j < nums1.length; j++) {
      if (nums2[i] === nums1[j]) {
        distinct = false;
        break;
      }
    }

    if (distinct) {
      set2.add(nums2[i]);
    }
  }

  //* We need to return an array of arrays
  return [[...set1], [...set2]];
}

console.log(findDifference([1, 2, 3], [2, 4, 6])); //* [[1, 3], [4, 6]]
console.log(findDifference([1, 2], [2, 4])); //* [[1], [4]]
console.log(findDifference([1, 1], [1, 2, 4, 6])); //* [[], [2, 4, 6]]
console.log(findDifference([5], [5])); //* [[], []]
console.log(findDifference([5], [10])); //* [[5], [10]]
console.log(findDifference([1, 2, 3, 3], [1, 1, 2, 2])); //* [[3], []]

//* O(n * m) + O(m * n) which simplifies to O(n * m)
//* There are "n" outer loops, and "m" inner loops that trigger for each outer loop
//* We do this the other way around too

//* Space: O(n + m) - In the worst case, we add each element from both arrays to their respective set
//* We have two different inputs that can have varying lengths, so we can't just say O(n)
//* The returned array holds all of these values too (within two nested arrays), so it also scales with n and m
