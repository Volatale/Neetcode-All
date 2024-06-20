//* Search space starts at 1, ends at x
//* The value we are looking for exists within these bounds
//* If mid * mid > x, then we need to decrease the search space on the right
//* Otherwise, narrow it on the left
//* Round the result down if we didn't find the exact value
function sqrtX(x) {
  //* 0 * 0 = 0. 1 * 1 = 1
  if (x <= 1) return x;

  //* The search space is from 1 to x
  let left = 1;
  let right = x;

  while (left <= right) {
    //* "mid" is the "root" of square we trying
    let mid = left + ((right - left) >> 1);

    //* Find the square of "mid"
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  //* Round the number down
  return Math.floor(left);
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
