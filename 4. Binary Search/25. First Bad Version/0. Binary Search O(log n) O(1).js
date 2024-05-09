//* We know the first version is 1
//* And we also know the last version released was "n"
//* The range of versions is [1, 2, .. n]. A SORTED sequence of numbers
//* The task involves FINDING the FIRST element within this SEARCH SPACE
//* It is also important to MINIMIZE the number of calls (checks)
//* There exists a point in the sequence where the bad version exists
//* Any version BEFORE that is "GOOD", and anything AFTER (including that version) is bad
//* So the search space contains monotonocity
//* Using all of the above information, we can use Binary Search
function firstBadVersion(n) {
  //* First version is 1, last version is n
  //* Return value exists within this search space
  let left = 1;
  let right = n;

  //* Left and right eventually find the same element
  while (left < right) {
    let mid = left + ((right - left) >> 1); //* mid = the version we want to test

    if (isBadVersion(mid)) {
      right = mid; //* Don't eliminate "mid", it could be the FIRST bad version
    } else {
      left = mid + 1; //* Mid was useless, so eliminate left portion
    }
  }

  //* The first bad version
  return left;
}

//* Time: O(log n) - We halve the search space every iteration of the loop

//* Space: O(1) - The space usage remains constant regardless of "n"
