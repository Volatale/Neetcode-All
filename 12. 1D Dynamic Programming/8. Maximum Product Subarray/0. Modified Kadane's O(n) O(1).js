//* If every number is positive, every subsequent number increases our product
//* If every number is negative, there are two cases
//*     - An even number of negatives results in a positive
//*     - An odd number of negatives results in a negative
//* If we can have positives AND negatives, the number could either increase OR decrease
//* We should track the current minimum AND current maximum simultaneously
//*     - Negative numbers flip extremes
//*     - 40 * - 20 = -800
//*     - -40 * -20 = 800
//* Maintain the min AND max product UP to the current index "i"
//*     - The MINIMUM may become the MAXIMUM when multiplying by negatives
function maxProduct(nums) {
  if (nums.length === 0) return 0;

  let currMin = nums[0];
  let currMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    //* The smaller number may become the larger number and vice versa
    if (nums[i] < 0) {
      [currMin, currMax] = [currMax, currMin];
    }

    //* Take the min AND max
    currMax = Math.max(nums[i], currMax * nums[i]);
    currMin = Math.min(nums[i], currMin * nums[i]);

    globalMax = Math.max(globalMax, currMax);
  }

  return globalMax;
}

console.log(maxProduct([-4, -3, -2]));
console.log(maxProduct([2, 3, -2, 4])); //* 6
console.log(maxProduct([-2, 0, -1])); //* 0
console.log(maxProduct([5])); //* 5
console.log(maxProduct([3, 3, -3, 10])); //* 10
console.log(maxProduct([9, 0, -4])); //* 9
console.log(maxProduct([9, 8, 7])); //* 504
console.log(maxProduct([-2, -5, -3])); //* 15

//* Time: O(n) - We iterate through the entire array once
//* So the time taken scales with the input size

//* Space: O(1) - We only use constant space
