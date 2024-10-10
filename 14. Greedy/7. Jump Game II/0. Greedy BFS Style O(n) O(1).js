//* Track the minimum number of jumps we have made
//* Track the maximum index we can reach considering elements in range [0, i]
//* We also need to track the last position we jumped to
//*     - When we reach that index, we know we performed the most optimal jump to get there
//* Essentially we are performing a "BFS-style" algorithm
//*     - bestJump marks teh end of the most optimal jump we can make so far
//*     - So when we get to it, we can rest assured no more optimal jump would be found
//*         - Thus, it is safe to increment minJumps
//*         - After doing so, mark the NEXT most optimal jump
//*     - Each "layer" of BFS ends when we reach "bestJump"
//*         - So essentially, each block of mutually reachable elements can be considered a frontier
//* maxIndex tells us the furthest we can reach
function jump(nums) {
  if (nums.length === 1) return 0;

  const n = nums.length;
  let i = 0;
  let maxIndex = 0; //* Maximum index we can get to considering elements in range [0, i]
  let minJumps = 0;
  let bestJump = 0; //* Index of furthest jump we can make considering elements in range [0, i]

  //* We are guaranteed to find a way to n - 1
  while (bestJump < n - 1) {
    //* There may be a new maximum index from this position
    maxIndex = Math.max(maxIndex, i + nums[i]);

    //* We know this is the most optimal jump we can make from [0, i]
    if (i === bestJump) {
      bestJump = maxIndex; //* Mark the NEXT most optimal jump so far
      minJumps++;
    }

    i++;
  }

  return minJumps;
}

console.log(jump([2, 3, 1, 1, 4])); //* 2
console.log(jump([0])); //* 0
console.log(jump([3, 2, 0, 0])); //* 1
console.log(jump([1, 1, 1])); //* 2
console.log(jump([7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3])); //* 2

//* Time: O(n) - We iterate through the entire array once in the worst case
//* If every element is a 1, we have to try every step ([1, 1, 1])

//* Space: O(1) - We are only using constant space variables
