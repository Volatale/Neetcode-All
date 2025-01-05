//* Instead of trying to AND every number in the range
//* We can process the numbers digit by digit
//*     - In our case, we only care about the LSB
//* One key observation we can make is that if the difference betwen left and right > 1
//!     - Then we know that their AND will be guaranteed to be 0
//* Why?
//*     - Because the LSB ALTERNATES between 0 and 1
//*         0101 (left)
//*         0110
//*         0111 (right)
//*     - Therefore the AND between the LSBs of left and right will be 0
//*         - Remember, if the difference between left and right > 1, then we have a pattern like "101" or "010"
//*         - The point is that the AND between the LSBs will always be 0 in that case
//* Keep right shifting left and right until both are equal
//*     - If they are equal, then we found the & between all of the numbers
//*     - All we have to do is left shift by the number of iterations we had
//* Left = 5, Right = 7
//*     - 5 -> 2 -> 1
//*     - 7 -> 3 -> 1
//* Then, left shift by 2 places (because there were 2 iterations)
//*     - 1 << 2 = 4
//* So return 4
function rangeBitwiseAnd(left, right) {
  let i = 0;

  //* If the difference between left and right > 1, then their AND will always be 0
  //* Keep rightshifting both left and right until they are equal (because then their AND will be 1)
  while (left !== right) {
    //* Remove the LSB
    left >>= 1;
    right >>= 1;
    i++;
  }

  //* We rightshifted "i" times, so now we need to leftshift "i" times to fix the positioning
  return left << i;
}

console.log(rangeBitwiseAnd(5, 7)); //* 4
console.log(rangeBitwiseAnd(0, 0)); //* 0
console.log(rangeBitwiseAnd(1, 2147483647)); //* 0
console.log(rangeBitwiseAnd(0, 10)); //* 0
console.log(rangeBitwiseAnd(5, 50)); //* 0

//* Time: O(log n) - Left and Right are both divided by 2 each iteration
//* Thus, we can assume there will be 32 divisions at most

//* Space: O(1) - The space used does not scale with the input(s)
