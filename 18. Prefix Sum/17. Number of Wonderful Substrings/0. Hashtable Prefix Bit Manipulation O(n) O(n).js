//* Use bit manipulation and prefix XOR to handle the toggling
//* The hashtable stores prefixXOR_j-1
//* "XORMask" itself represents prefixXOR_i
//* We have 10 character (a through j)
//*     - Thus we need to individually toggle all of those bits and accumulate the substrings
function wonderfulSubstrings(str) {
  let substrings = 0;

  //* prefixXOR (bitmask) : Frequency
  const masks = { 0: 1 };

  let XORMask = 0;

  for (let i = 0; i < str.length; i++) {
    //* Toggle the "ith" bit
    XORMask ^= 1 << (str[i].charCodeAt(0) - 97);

    //* Get all the occurrences of this mask
    substrings += masks[XORMask] || 0;

    //* Check all masks with 1 bit toggled
    for (let j = 0; j < 10; j++) {
      const toggledMask = XORMask ^ (1 << j);
      substrings += masks[toggledMask] || 0;
    }

    //* Found another occurrence of this mask
    masks[XORMask] = (masks[XORMask] || 0) + 1;
  }

  return substrings;
}

console.log(wonderfulSubstrings("aba")); //* 4
console.log(wonderfulSubstrings("aabb")); //* 9

//* Time: O(n) - We iterate through the entire string once, which takes O(n)
//* We have a nested loop, but the time taken will still be O(n) since an O(10) loop is constant time

//* Space: O(n) - The number of keys/values will depend on the number of characters in the input
