//* We are told we need to find the "first bad version"
//* A "bad" version in this case is a number that returns "true" when a function is called
//* There exists a series of "good" versions, followed by a series of "bad" versions
//*     - After the first "bad" version, every SUBSEQUENT version is ALSO bad
//! This implies the existence of a monotonic property
//* Our goal is to find the point at which every subsequent version is bad
//* And we also need to reduce the search space as much as possible every iteration
//! Thus, we should use a binary search approach
//* The range of possible versions is given as [1, n] (inclusive)
//*     - The two pointers should converge to a single point, which tells us the "first bad version"
function solution(isBadVersion) {
  //* The search space is the range of possibe versions [1, n]
  let left = 1;
  let right = n;

  while (left < right) {
    //* `mid` represents the version we are currently checking
    const mid = left + ((right - left) >> 1);

    if (isBadVersion(mid)) {
      right = mid; //* Potential candidate; don't eliminate it from the search space
    } else {
      left = mid + 1; //* Found a good version, eliminate it from the search space
    }
  }

  //* Left indicates the first bad version
  return left;
}

//* Time: O(log n) - The search space is halved each iteration

//* Space: O(1) - The memory usage remains constant regardless of input size
