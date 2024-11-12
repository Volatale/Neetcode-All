//* Create a list of roman numerals and their value (as pairs)
//* Sort the list in DESCENDING order (roman numerals are written largest to smallest)
//* Iterate through this list
//*     - Math.floor(num / val) tells us how many times "val" divides into num
//*     - If count > 0, we can append the numeral "count" times
//*     - Then, we subtract the val * count (so we don't end up duplicating roman numerals)
//* Take the example of 2150
//*     - 2150 / 1000 = 2 (floored)
//*         - So we can fit 2 "M"
//*         - 2150 - (1000 * 2) = 150
//!         - That gives us "MM"
//*     - 150 / 900 = 0
//*     - 150 / 500 = 0
//*     - 150 / 400 = 0
//*     - 150 / 100 = 1
//*         - So we can fit 1 "C"
//*         - 150 - (100 * 1) = 50
//!         - Now we have "MMC"
//*     - 50 / 90 = 0
//*     - 50 / 50 = 1
//*         - So we can append 1 "L"
//*         - 50 - (50 * 1) = 0
//!         - Lastly, we have "MMCL"
function intToRoman(num) {
  const roman = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];

  let result = "";

  //* Iterate in reverse (largest to smallest)
  for (const [sym, val] of roman) {
    //* Count tells us how many times to repeat this symbol
    const count = Math.floor(num / val);

    //* We need to insert sym "count" times
    if (count > 0) {
      result += sym.repeat(count);
      num -= val * count;
    }
  }

  return result;
}

console.log(intToRoman(3749)); //* "MMMDCCXLIX"
console.log(intToRoman(2100)); //* "MMC"
console.log(intToRoman(58)); //* "LVIII"
console.log(intToRoman(1994)); //* "MCMXCIV"
console.log(intToRoman(13)); //* "XIII"
console.log(intToRoman(49)); //* "XLIX"
console.log(intToRoman(168)); //* "CLXVII"

//* Time: O(n) - The time taken mainly scales with how long it takes to append the characters
//* The input is in the range [1, 3999], so it'll take roughly the same amount of time regardless of input
//* So we could technically say it takes O(1) time, but O(n) is more conservative

//* Space: O(n) - The result string scales in length proportionally with the input size
//* Smaller inputs result in smaller results
