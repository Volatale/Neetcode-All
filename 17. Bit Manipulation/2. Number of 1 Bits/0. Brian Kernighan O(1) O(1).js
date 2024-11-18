//* Brian Kernighan's Algorithm
//* n - 1 (techincally) moves a set bit to the right
function hammingWeight(n) {
  let count = 0;

  //* Subtracting by 1 removes a set bit each iteration
  while (n > 0) {
    n &= n - 1;
    count++;
  }

  return count;
}

console.log(hammingWeight(11)); //* 3
console.log(hammingWeight(3)); //* 2
console.log(hammingWeight(8)); //* 1
console.log(hammingWeight(15)); //* 4
console.log(hammingWeight(2 ** 31 - 1)); //* 31

//* Time: O(1) - Technically it is O(m) where "m" is the number of set bits
//* Which is better than doing 32 iterations to check each bit (and right shift each time)

//* Space: O(1) - We are using the same amount of space regardless of the input size
