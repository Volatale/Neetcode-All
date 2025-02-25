//* Use a stack to simulate the path through the file system
function minOperations(logs) {
  const directories = [];

  //* Retrace each of the logs
  for (let i = 0; i < logs.length; i++) {
    if (logs[i] === "../") {
      directories.pop(); //* Go up a directory (to parent)
    } else if (logs[i] !== "./") {
      directories.push(logs[i]); //* Go to child directory
    }
  }

  //* Then, we simply go back directories.length times
  return directories.length;
}

console.log(minOperations(["d1/", "d2/", "../", "d21/", "./"])); //* 2
console.log(minOperations(["d1/", "d2/", "./", "d3/", "../", "d31/"])); //* 3
console.log(minOperations(["d1/", "../", "../", "../"])); //* 0
console.log(minOperations(["d1/", "d2/", "d3/", "d4/"])); //* 4
console.log(minOperations(["./", "./", "sonic/", "knuckles/", "../"])); //* 1
console.log(minOperations(["./", "../", "./"])); //* 0

//* Time: O(n) - We have to iterate through the entire array regardless

//* Space: O(n) - In the worst case, we only ever increase the depth and never decrease it
//* So the stack will have a length of "n"
