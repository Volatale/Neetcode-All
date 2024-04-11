//* If the substring length is < 10, the condition is not met
//* We use a results set because we want the results to be unique
//* Another set is used to enable fast lookup for already-processed substrings
//* A fixed sliding window is used to constraint the substring to 10 characters
function repeatedDNASequences(s) {
  if (s.length < 10) return [];

  const results = new Set();
  const stringSet = new Set();

  let start = 0;
  let end = 9;

  while (end < s.length) {
    let substring = s.substring(start, end + 1);

    if (stringSet.has(substring)) {
      results.add(substring);
    } else {
      stringSet.add(substring);
    }

    start++;
    end++;
  }

  return [...results];
}

console.log(repeatedDNASequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT")); //* ["AAAAACCCCC", "CCCCCAAAAA" ]
console.log(repeatedDNASequences("AAAAAAAAAAAAA")); //* ["AAAAAAAAAA"]
console.log(repeatedDNASequences("ACGTACGTACACGTACGTAC")); //* ["ACGTACGTAC"]

//* Time: O(n) - We iterate through the whole string, which scales proportionally with "n" (s.length)
//* Technically it takes O(10) to get the substring, but it always takes the same amount of time, so constant
