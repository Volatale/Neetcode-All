//* Test every version starting from 1
//* We know that the last version is "n" itself, so consider that too
function firstBadVersion(n) {
  for (let ver = 1; ver <= n; ver++) {
    if (!isBadVersion(ver)) return true;
  }
}

//* Time: O(n) - The time taken scales linearly with the input

//* Space: O(1) - The space usage remains constant regardless of input
