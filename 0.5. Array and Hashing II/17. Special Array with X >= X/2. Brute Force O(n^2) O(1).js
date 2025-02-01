//* We can try every number in a brute force manner
//* The goal is to find a value of "x" such that there are exactly "x" values in nums >= x
//* Based on that goal, we could try literally every value of "x"
//*     - Initialize x to 0
//* So lets say we have [0, 4, 3, 0, 4]
//*     - x = 0: there are 5 values >= 0 (0, 0, 3, 4, 4)
//*     - x = 1: there are 3 values >= 1 (3, 4, 4)
//*     - x = 2: there are 3 values >= 2 (3, 4, 4)
//*     - x = 3: There are 3 values >= 3 (3, 4, 4) return 3
function specialArray(nums) {
  //* nums is definitely not special
  if (nums.length === 0) return -1;

  //* Number we are trying to test
  let x = 0;

  while (true) {
    let count = 0;

    //* There aren't enough elements for nums to be special
    if (x > nums.length) {
      break;
    }

    //* Iterate over every element looking for elements >= x
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] >= x) {
        count++;
      }

      //* There are too many numbers > x
      if (count > x) {
        break;
      }
    }

    //* There are exactly "x" values >= x in nums
    if (count === x) {
      return x;
    }

    x++;
  }

  //* Assume that nums is not special
  return -1;
}

console.log(specialArray([3, 5])); //* 2
console.log(specialArray([0, 0])); //* -1
console.log(specialArray([0, 4, 3, 0, 4])); //* 3
console.log(specialArray([4, 4, 4, 9, 1])); //* 4
console.log(specialArray([0])); //* -1

//* Time: O(n^2) - In the worst case, the number we are looking for is the final number in the constraint (0 <= nums[i] <= 1000)
//* We iterate through the entire array within each outer iteration (nested for loops)

//* Space: O(1) - The memory used does not scale with the input size
