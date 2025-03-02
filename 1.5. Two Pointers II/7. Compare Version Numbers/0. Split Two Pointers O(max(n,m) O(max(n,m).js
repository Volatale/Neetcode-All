//* We need to compare values based on their position
//* And this needs to be done simultaneously with BOTH strings at once
//* So a Two Pointer approach will work here
//* Split the strings via "." to get rid of them, then iterate left to right
//* Since the split array lengths can differ
//*     - We only need to keep iterating until we find a differing revision
//* In the case that one string is longer than the other, we use 0 as a default value
function compareVersion(version1, version2) {
  const v1 = version1.split(".");
  const v2 = version2.split(".");

  //* Track the progress through both strings
  let left = 0;
  let right = 0;

  //* Compare every revision as we go
  while (left < v1.length || right < v2.length) {
    //* Conver the current value to an int, or, 0 if non-existent
    const num1 = left < v1.length ? parseInt(v1[left++]) : 0;
    const num2 = right < v2.length ? parseInt(v2[right++]) : 0;

    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }

  //* Both version strings are equal
  return 0;
}

console.log(compareVersion("1.2", "1.10")); //* -1
console.log(compareVersion("1.01", "1.001")); //* 0
console.log(compareVersion("1.0", "1.0.0.0")); //* 0
console.log(compareVersion("1.2.3.4", "1.2.3.5")); //* -1
console.log(compareVersion("1.25", "1.2")); //* 1
console.log(compareVersion("1.0.1", "1.0")); //* 1

//* Time: O(max(n,m)) - In the worst case, one of the two strings is longer
//* So the time taken scales with the longer of the two inputs

//* Space: O(max(n, m)) - The memory usage scales with the length of the longer of the two inputs
//* If we have something like "1.0.0000", this is the same as "1.0.0"
