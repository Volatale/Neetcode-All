//* Count the number of elements <= k
//* Use the left and right bound as
//* The matrix is supposed to be 1-indexed
//* So instead of 0 to m * n - 1
//* We do 1 to m * n; this represents our search space
//* Mid represents the number of elements that need to be <= k
//* At best, each row cannot have > n elements
function kthSmallestNumberInTable(m, n, k) {
  function tooManyLessThan(x) {
    let count = 0;

    //* For each row, x / i: That gives us the number of elements that "x" is less than
    for (let i = 1; i <= m; i++) {
      //* Take the minimum because we can't count more elements than we have columns
      count += Math.min(Math.floor(x / i), n);
    }

    return count >= k;
  }

  //* 1 is the MINIMUM number in the table
  //* m * n is the MAXIMUM number in the table
  let left = 1;
  let right = m * n;

  while (left < right) {
    //* Mid = no. of elements we want to be less than mid
    let mid = left + ((right - left) >> 1);

    //* Check if there are <= k numbers < mid
    if (tooManyLessThan(mid)) {
      right = mid; //* Too many numbers >= mid
    } else {
      left = mid + 1; //* Not enough numbers are less than "mid"
    }
  }

  return left;
}

console.log(kthSmallestNumberInTable(3, 3, 5)); //* 3
console.log(kthSmallestNumberInTable(2, 3, 6)); //* 6

//* Time: O(m log(m * n))
//* We do a binary search that scales with the number of rows and columns
//* Then within each binary search, we do an O(m) for loop

//* Time: O(1) - The space usage remains the same regardless of input size
