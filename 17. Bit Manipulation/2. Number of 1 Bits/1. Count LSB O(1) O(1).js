//* Keep checking the least significant bit (using n & 1)
//*     - Sum it regardless of whether it is a 0 or a 1
//*     - n + 1 = n + 1
//*     - n + 0 = n, so it has no negative effect
//! This allows us to avoid an if statement, which would technically be slower
//* Right shifting in each iteration has the same effect as dividing n by 2
//*     - Eventually we'll end up at 0
function hammingWeight(n) {
  let count = 0;

  while (n > 0) {
    count += n & 1; //* Get the LSB (rightmost bit) and add it to the count
    n >>= 1; //* Divide number by 2
  }

  return count;
}

console.log(hammingWeight(11)); //* 3
console.log(hammingWeight(3)); //* 2
console.log(hammingWeight(8)); //* 1
console.log(hammingWeight(15)); //* 4
console.log(hammingWeight(2 ** 31 - 1)); //* 31

//* Time: O(1) - We assume that there are 32-bits in each number, thus there can only be up to 32 iterations

//* Space: O(1) - We are using the same amount of space regardless of the input size
