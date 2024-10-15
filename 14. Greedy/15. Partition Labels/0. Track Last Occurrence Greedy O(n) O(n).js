//* We need to know the index of the last occurrence of every character
//! This is because we have no idea what characters lie ahead otherwise
//* So iterate through the entire string and track the last occurring index of each character
//* Then, we need to find the partitions themselves
//*     - Use a variable to track where the partition will (currently) end
//*         - Set end = maximum of end and the lastOccurrence of s[i]
//*         - This will progressively get larger over time
//*     - A variable needs to be used to track the size of the current partition
//*         - We update it every iteration
//*     - If i === end, none of characters within the partition will occur again
//*         - So we can push this partition length to the results
//*         - Then, reset size back to 0; we cannot continue the previous partition
function partitionLabels(s) {
  const lastOccurrence = {}; //* Char -> Last index char occured at
  const partitionLengths = [];

  let size = 0; //* Tracks the size of the current partition
  let end = 0; //* Marks the (current) END of the current partition

  //* Find the LAST occurrence of every character
  for (let i = 0; i < s.length; i++) {
    lastOccurrence[s[i]] = i;
  }

  //* Get the length of every partition
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastOccurrence[s[i]]); //* Find the index of the last occurrence of this character
    size++;

    //* Reached the end of this partition
    if (i === end) {
      partitionLengths.push(size);
      size = 0; //* Reset partition size counter
    }
  }

  return partitionLengths;
}

console.log(partitionLabels("ababcbacadefegdehijhklij")); //* [9, 7, 8]
console.log(partitionLabels("eccbbbbdec")); //* [10]
console.log(partitionLabels("abc")); //* [1, 1, 1]
console.log(partitionLabels("aaabbbccc")); //* [3, 3, 3]

//* Time: O(n) - We have to iterate through the entire input twice
//* So the time taken scales with the input size

//* Space: O(n) - In the worst case, every character is unique
//* So the array for something like "abc" would be [1, 1, 1]
//* Thus the size partitionLengths array scales with the input size in the worst case
