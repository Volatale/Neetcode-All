//* Cantor's Diagonalization
//* Append the inverted ith bit from every binary string
//* "0" is negated to be "1"
//* "1" is negated to be "0" etc
function findUniqueBinaryString(nums) {
  let result = "";

  //* Grab the inverted "ith" bit from every element
  for (let i = 0; i < nums.length; i++) {
    result += nums[i][i] === "0" ? "1" : "0";
  }

  return result;
}

console.log(findUniqueBinaryString(["00"]));
console.log(findUniqueBinaryString(["01", "10"]));
console.log(findUniqueBinaryString(["00", "01"]));
console.log(findUniqueBinaryString(["111", "011", "001"]));
console.log(findUniqueBinaryString(["010", "111", "101"]));

//* Time: O(n) - Iterate over every element in the array

//* Space: O(n) - We create an string of "n" length
