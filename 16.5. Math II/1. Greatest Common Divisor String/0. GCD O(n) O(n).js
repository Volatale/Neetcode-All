//* If it is possible to return something that isn't ""
//*     - It is because str1 + str2 === str2 + str1
//* To find the largest string x such that x divides into both str1 and str2
//*     - All of the characters in str2 need to be in str1, and vice versa
//*         - The vice versa part is why we check for a symetrical relationship
//*     - If either string contains a character the other doesn't have
//*         - Then it definitely isn't possible to return anything that isn't ""
//* "ABC", "ABCABC"
//*     - All of the characters in s1 also exist in s2
//*     - s1 + s2 === s2 + s1
//*         - "ABCABCABC"
//*     - So now, we just need to find the longest substring
//* To find the largest substring, we can just find the GCD of the two string lengths
//*     - We know for sure that it is possible to find the greatest common divisor string
//*     - All we are doing at this point is determining where it ENDS
//* We know we need to start from 0
//*     - s1.substring(0, gcd(n, m)) gives us what we need
//*     - gcd(6, 2) = 3
//*         - So we get a substring from (0, 3 exclusive)
//*         - Which gives us a substring of the first three indices
function gcdOfStrings(str1, str2) {
  const n = str1.length;
  const m = str2.length;

  //* If a mirror concatenation is not equal, there cannot be a GCD string
  return str1 + str2 === str2 + str1 ? str1.substring(0, gcd(n, m)) : "";
}

//* Euclidean Algorithm to compute GCD
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }

  return a;
}

console.log(gcdOfStrings("ABCABC", "ABC")); //* "ABC"
console.log(gcdOfStrings("AAAAA", "A")); //* "A"
console.log(gcdOfStrings("ABABAB", "ABAB")); //* "AB"
console.log(gcdOfStrings("LEET", "CODE")); //* ""
console.log(gcdOfStrings("XY", "XY")); //* "XY"
console.log(gcdOfStrings("A", "WXY")); //* ""

//* Time: O(n) - The euclidean algorithm takes O(log(min(a,b))), but substring() can take O(n)
//* In the worst case, both strings are the same, thus we get the entire substring of s1

//* Space: O(n) - We temporarily create a substring that can be of length "n" max (str1.length)
