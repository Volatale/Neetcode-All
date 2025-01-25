//* We can pre-emptively create an array that contains each digit
//* Simply check if the triple version of each digit exists in the input string
//* Since we want the largest number, we want to start with "9" and end with "0"
//* This ensures we always return the LARGEST number
function largestGoodInteger(num) {
  //* There aren't 3 consecutive digits to test
  if (num.length < 3) return "";

  const strings = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];

  //* Iterate in reverse and return the first (thus, the largest) triplet
  for (let digit of strings) {
    const triplet = digit.repeat(3); //* "1" -> "111", "5" -> "555" etc

    if (num.includes(triplet)) {
      return triplet;
    }
  }

  return "";
}

console.log(largestGoodInteger("6777133339")); //* "777"
console.log(largestGoodInteger("2300019")); //* "000"
console.log(largestGoodInteger("123456789")); //* ""
console.log(largestGoodInteger("42352338")); //* ""
console.log(largestGoodInteger("111222333444555")); //* "555"
console.log(largestGoodInteger("999888999888999")); //* "999"
console.log(largestGoodInteger("101010010110")); //* ""

//* Time: O(n) - We are iterating through the strings array, but it always contains 10 elements
//* Within each iteration, we call .repeat(3), which always takes the same amount of time
//* And we also call .includes(). The time complexity of .includes() scales with the input size
//* So the "true" time complexity is: O(n * 10 * 3) = O(n)

//* Space: O(1) - We are either returning an empty string, or a string of length 3
//* So we can simply say the space complexity does not scale with the input size
//* The strings array always contains 10 elements, so the space used by that is constant
