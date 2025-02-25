//* Instead of using a stack to perform a simulation
//* We can just track the current depth
//* Previously, the stack was used to track how deep we were in the file system
//*     - The same can be done using a simple variable to track depth
//* Either we go up, or we go down
//*     - The operation where we stay at the same level is not even considered
//*     - The depth would not change regardless, so there is no point in checking for it
function minOperations(logs) {
  let depth = 0;

  //* Retrace each of the logs
  for (let i = 0; i < logs.length; i++) {
    if (logs[i] === "../") {
      depth = Math.max(0, depth - 1); //* Go to child directory (minimum depth of 0)
    } else if (logs[i] !== "./") {
      depth++; //* Go up a directory (to parent)
    }
  }

  //* Then, we can simply go back to the parent "depth" times
  return depth;
}

console.log(minOperations(["d1/", "d2/", "../", "d21/", "./"])); //* 2
console.log(minOperations(["d1/", "d2/", "./", "d3/", "../", "d31/"])); //* 3
console.log(minOperations(["d1/", "../", "../", "../"])); //* 0
console.log(minOperations(["d1/", "d2/", "d3/", "d4/"])); //* 4
console.log(minOperations(["./", "./", "sonic/", "knuckles/", "../"])); //* 1
console.log(minOperations(["./", "../", "./"])); //* 0

//* Time: O(n) - We have to iterate through the entire array regardless

//* Space: O(1) - The memory usage remains constant regardless of input size
