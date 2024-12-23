//* For each number, apply Brian Kernighan's algorithm
//* Every iteration, we remove the MSB (the rightmost bit)
//* This results in the removal of one set bit
function countBits(n) {
  //* We need to return an array of size n + 1
  if (n === 0) return [0];

  const result = new Array(n + 1).fill(0);

  //* Count the number of set bits in each number from [0, n]
  for (let i = 0; i <= n; i++) {
    result[i] = countSetBits(i);
  }

  return result;
}

function countSetBits(n) {
  let setBits = 0;

  //* Every n &= n - 1 removes a set bit
  while (n !== 0) {
    n &= n - 1;
    setBits++;
  }

  return setBits;
}

console.log(countBits(2)); //* [0, 1, 1]
console.log(countBits(5)); //* [0, 1, 1, 2, 1, 2]

//* Time: O(n log n) - There are approximately log2(n) bits in a number "n"
//* There are "n" numbers to calculate numbers for, thus we get n log need

//* Space: O(n) - We create an array whose size scales proportionally with the input size (n + 1)
