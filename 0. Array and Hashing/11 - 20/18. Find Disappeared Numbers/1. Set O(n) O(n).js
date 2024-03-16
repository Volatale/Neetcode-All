//* Use a set (they have fast lookup - Θ(1) in JS)
//* Iterate from 1 to nums.length (inclusive)
//* If we DON'T find "i" within set, that means it is not in the array
//* Therefore we need to add it to the results array
function findDisappearedNumbers(nums) {
  const results = [];
  const set = new Set(nums);

  for (let i = 1; i <= nums.length; i++) {
    if (!set.has(i)) {
      results.push(i);
    }

    set.delete(i); //* Optimization to reduce memory usage over time
  }

  return results;
}

console.log(findDisappearedNumbers([1, 4, 4, 2])); // [3]
console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5, 6]
console.log(findDisappearedNumbers([1, 1])); // [2]

//* Time: O(n) - We initialize the set using the nums array, which takes O(n)
//* Then, we iterate from 1 up to (and including) nums.length (n)
//* So in reality, it is O(2n), but Big O Notation simplifies to O(n)

//* Space: O(n) - The set initializes with the same number of elements as the input in the worst case
//* If every element in nums is unique, that means the set will also have the same amount of elements
//* In the case where every element in nums is a duplicate, the set would only have a size of 1
