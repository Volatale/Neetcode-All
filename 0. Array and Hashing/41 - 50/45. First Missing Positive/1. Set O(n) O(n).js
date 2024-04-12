//* Add every value to a set for Θ(1) lookup
//* If "i" does not exist in the set, you found the value you are looking for
//* We start at i = 1 because we don't care about negative values
function firstMissingPositive(nums) {
  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i]);
  }

  for (let i = 1; i <= nums.length + 1; i++) {
    if (!set.has(i)) {
      return i;
    }
  }
}

console.log(firstMissingPositive([6, 4, 5, 1, 2])); //* 3
console.log(firstMissingPositive([4, 3, 2])); //* 1
console.log(firstMissingPositive([1, 2, 3, 4])); //* 5
console.log(firstMissingPositive([3, 2, 1])); //* 4
console.log(firstMissingPositive([-1])); //* 1
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([3, 4, 5, 1, 2])); //* 6
console.log(firstMissingPositive([5, 4, 7, 9, 3])); //* 1
console.log(firstMissingPositive([-1, -1, -1])); //* 1

//* Time: O(n) - The first loop scales with the input size
//* The second loop also scales at a rate of "n"

//* Space: O(n) - We add every element in the input to the set
//* So the set.size === nums.length
