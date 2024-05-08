//* Search space starts at 1, ends at x
//* The value we are looking for exists within these bounds
//* If mid * mid > x, then we need to decrease the search space on the right
//* Otherwise, narrow it on the left
//* In cases like sqrt(8), we need to subtract 1, because left would be 3
//* 3 - 1 = 2
function sqrtX(x) {
  let left = 0;
  let right = x;
  let res = 0;

  while (left <= right) {
    let mid = left + ((right - left) >> 1);

    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
      res = mid;
    }
  }

  return res;
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
