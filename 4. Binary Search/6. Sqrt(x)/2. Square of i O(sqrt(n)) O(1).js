//* Try squaring every element from 1 to x (inclusive)
//* If i * i > x, then this the result would be too large
function sqrtX(x) {
  let result = 0;

  //* Try every integer until i * i > x
  for (let i = 1; i * i <= x; i++) {
    result = i;
  }

  return result;
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

//* Time: O(sqrt(n)) - The time taken scales with the sqrt(n)
//* i * i gives you the square of "i"
//* If you go BEYOND x, then you know any number greater is useless

//* Space: O(1) - We use a constant amount of space regardless of the input
