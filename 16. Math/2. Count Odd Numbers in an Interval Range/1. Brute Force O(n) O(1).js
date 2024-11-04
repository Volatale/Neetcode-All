//* In a brute force manner, check every number within the range
//* Anytime you find a number that is odd, increment the count
function countOdds(low, high) {
  //* 0 is not an odd number
  if (low === 0 && high === 0) return 0;

  let oddNumbers = 0;

  //* Increment for every odd number
  for (let i = low; i <= high; i++) {
    if (i & 1) {
      oddNumbers++;
    }
  }

  return oddNumbers;
}

console.log(countOdds(3, 7)); //* 3
console.log(countOdds(8, 10)); //* 1
console.log(countOdds(1, 100)); //* 50
console.log(countOdds(5, 7)); //* 2

//* Time: O(n) - We are iterating through every number in the range
//* Checking if the number is odd takes O(1)

//* Space: O(1) - The space usage remains constant; it does not scale with the input size
