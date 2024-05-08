//* Search space starts at 1, ends at x
//* The value we are looking for exists within these bounds
//* If mid * mid > x, then we need to decrease the search space on the right
//* Otherwise, narrow it on the left
//* In cases like sqrt(8), we need to subtract 1, because left would be 3
//* 3 - 1 = 2
function sqrtX(x) {
  if (x === 1) return 1;

  //* The search space is from 1 to x
  let left = 1;
  let right = x;

  while (left < right) {
    //* Avoid overflow / Truncate Decimals / Divide by 2
    let mid = left + ((right - left) >> 1);

    //* If mid * mid === x, you found the square root
    if (mid * mid > x) {
      right = mid; //* Eliminate right, but not the mid element
    } else {
      left = mid + 1; //* Eliminate Left
    }
  }

  //* In cases where we want the sqrt(7), we'd be left with 3, so subtract 1
  return left - 1;
}

console.log(sqrtX(0)); //* 0
console.log(sqrtX(1)); //* 1
console.log(sqrtX(2)); //* 1
console.log(sqrtX(4)); //* 2
console.log(sqrtX(7)); //* 2
console.log(sqrtX(8)); //* 2
console.log(sqrtX(9)); //* 3
console.log(sqrtX(121)); //* 11
console.log(sqrtX(100)); //* 10
console.log(sqrtX(16)); //* 4

//* Time: O(log n) - We halve the search space each iteration

//* Space: O(1) - The space we use remains constant regardless of the input
