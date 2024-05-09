//* We know the minimum divisor is 1
//* We also know the maximum divisor has to be the max(input)
//* Try every value from 1 all the way up to maxDivisor
//* If we are ever successful, return the first
function smallestDivisorGivenThreshold(nums, threshold) {
  //* The largest divisor we can choose is the maximum value in the nums array
  let maxDivisor = Math.max(...nums);

  //* The minimum "positive" divisor we can choose is 1
  for (let divisor = 4; divisor <= maxDivisor; divisor++) {
    let sum = 0;

    //* Try dividing and summing the array using this divisor
    for (let num of nums) {
      sum += Math.ceil(num / divisor);
    }

    //* Found the smallest divisor possible
    if (sum <= threshold) return divisor;
  }
}

console.log(smallestDivisorGivenThreshold([1, 2, 5, 9], 6)); //* 5
console.log(smallestDivisorGivenThreshold([44, 22, 33, 11, 1], 5)); //* 44
console.log(smallestDivisorGivenThreshold([10], 10)); //* 1

//* Time: O(n * max(nums)) - There are max(nums) outer iterations
//* And for every outer iteration, there are "n" inner iterations (scales with nums.length)

//* Space: O(1) - The space usage remains constant regardless of input size
