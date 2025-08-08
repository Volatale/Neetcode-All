//* We are given a matrix `mat` where mat[i][j] = i * j (1-indexed)
//*     - mat[1][1] = 1
//*     - mat[1][2] = 2
//*     - mat[2][2] = 4, etc.
//* The goal is to return the kth SMALLEST element in the multiplication table
//* Some observations:
//!     - The values in each row are monotonically increasing, as are the values in each column
//*     - We also know we are searching for an element within the matrix itself
//! Thus we can say the search space is the matrix itself
//* Searching for the `kth` smallest element implies optimization
//! With all of the above, we can likely apply binary search to optimize our searching
//* We need to convert the 2D matrix index to a 1D representation
//*     - row = Math.floor(index / COLS)
//*     - col = index % COLS
//* However, note that we are binary searching over the range of possible VALUES (elements), and not indices
//*     - Why? We want the kth smallest number
//* Thus, the range of possible values exists in the range [1, m * n]
//*     - left = 1 (1 * 1)
//*     - right = m * n
//* For each iteration, we can ask "how many numbers in the table are <= x" (x = mid)
//*     - Thus, mid allows us to find how many elements are <= mid
//* If the count is < k, we need larger numbers
//*     - left = mid + 1
//* If the count >= k, we have found a potential candidate
//*     - right = mid
//! But how do we count how many elements are <= mid?
//* In each row `i`, the first values are:
//*     - i * 1, i * 2, i * 3, ..., i * n
//*         - [1, ... ... ...]
//*         - [2, ... ... ...]
//*         - [3, ... ... ...]
//*         - [4, ... ... ...]
//* For each row `i`, the values in each column (j) increase by `i` each time
//*     - [1, 2, 3] (i = 1)
//*     - [2, 4, 6] (i = 2)
//*     - [3, 6, 9] (i = 3)
//* Thus, the number of elements <= mid in each row means "how many elements `j` such that `i * j <= mid`"
//*     - (i * j <= mid). Isolate (solve for) `j`
//*     - j <= mid / i
//*         - Then take the floor of that
//*     - The number of elements that can be <= mid per row is therefore `Math.min(mid / i, n)`
//*         - If mid = 6 and i = 2, then (6 / 2 = 3 elements <= mid)
//*         - In the "best" case, every element in the row (n elements) is <= mid
//! Why are we doing this?
//*     - We could sort every row in the matrix and return the `kth` index (-1)
//*         - m rows, n columns, and it takes O(n log n) to sort, so O(mn * log(m * n)) time complexity
//*     - If we do use binary search, iterate over the entire matrix and count the number of elements <= mid in each iteration
//*         - But then we still have to iterate over the rows/columns to count
//* We are using a mathematical formula to count the number of elements <= mid that exist per row
//*     - Then, we sum the above results for each row
//*     - Since its a formula, it can be computed in O(1) time
function findKthNumber(m, n, k) {
  function kGreaterThan(mid) {
    //* Prefix sum of the count of elements <= mid in each row
    let count = 0;

    //* Iterate over each row and compute the number of elements <= mid
    for (let i = 1; i <= m && count < k; i++) {
      count += Math.min(Math.floor(mid / i), n);
    }

    return count >= k;
  }

  //* The range of possible values is in the range [1, m * n]
  let left = 1;
  let right = m * n;

  while (left < right) {
    //* `mid` represents the no. of elements we'll allow to be <= mid
    const mid = left + ((right - left) >> 1);

    if (kGreaterThan(mid)) {
      right = mid; //* Found potential candidate (don't eliminate from search space)
    } else {
      left = mid + 1; //* Need a larger value
    }
  }

  //* Kth smallest element
  return left;
}

console.log(findKthNumber(3, 3, 5)); //* 3
console.log(findKthNumber(2, 3, 6)); //* 6

//* Time: O(m * log(m * n)) - There are `m` rows, and within each while loop iteration we perform O(m) work
//* The range of possible values is given by [1, m * n]

//* Space: O(1) - The memory usage remains constant regardless of input size
