//* Generate every subset's binary value
//* The number of binary strings is given by 2^n
//*     - For example, if the length is 2, 2^2 = 4
//*     - There are 4 total binary strings - 2 (the length, we already know 2 of then)
//* That leaves 2 more possible answers
//* For every "i", check the jth bit
//*     - If it is set, append a "1", else append a "0"
function findUniqueBinaryString(nums) {
  //* For fast lookup
  const binarySet = new Set(nums);

  //* There are 2^n subsets in nums.length
  for (let i = 0; i < 1 << nums.length; i++) {
    let subset = "";

    //* For every integer "i" from 0 to 2^n - 1
    //* Check if the "jth" bit is set
    for (let j = 0; j < nums.length; j++) {
      //* If the jth bit is set, add a "1", else "0"
      subset += i & (1 << j) ? "1" : "0";
    }

    //* If the binarySet does NOT have this binary string
    if (!binarySet.has(subset)) return subset;
  }

  return false;
}

console.log(findUniqueBinaryString(["00"]));
console.log(findUniqueBinaryString(["01", "10"]));
console.log(findUniqueBinaryString(["00", "01"]));
console.log(findUniqueBinaryString(["111", "011", "001"]));

//* Time: O(n * 2^n) - In the worst case, we have to generate every subset (except the last)
//* The outer loop takes O(2^n) alone, the inner loop takes O(n)

//* Space: O(n) - We create a set that holds the input elements (scales with "n")
