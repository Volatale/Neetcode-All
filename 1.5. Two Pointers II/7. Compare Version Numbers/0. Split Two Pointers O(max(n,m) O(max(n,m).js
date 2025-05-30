//* We are given two version strings and we need to compare them
//* Version strings consist of "revisions" (numbers) that are separated via "."
//* The value of a revision is its numeric value ignoring any leading zeroes
//*     - The comparison occurs in left-to-right order
//! If one of the version strings has fewer revisions, the "missing" values are treated as 0
//* Since the strings are separated via ".", we can isolate the numerical values using the split() method
//* However, JavaScript string comparisons are done lexicographically, so this can negatively affect our comparisons
//* Instead, we can convert each of the revision strings into a number (integer), and then perform the comparison
function compareVersion(version1, version2) {
  //* Get each individual revision string in a row (without the ".")
  const string1 = version1.split(".");
  const string2 = version2.split(".");

  //* Used to track which revision string we are looking at
  let left = 0;
  let right = 0;

  while (left < string1.length || right < string2.length) {
    //* Convert the revision string to a number
    const lNumber = left < string1.length ? parseInt(string1[left++]) : 0;
    const rNumber = right < string2.length ? parseInt(string2[right++]) : 0;

    if (lNumber < rNumber) return -1;
    else if (lNumber > rNumber) return 1;
  }

  //* Both revision strings are equivalent
  return 0;
}

console.log(compareVersion("1.2", "1.10")); //* -1
console.log(compareVersion("1.01", "1.001")); //* 0
console.log(compareVersion("1.0", "1.0.0.0")); //* 0
console.log(compareVersion("1.2.3.4", "1.2.3.5")); //* -1
console.log(compareVersion("1.25", "1.2")); //* 1
console.log(compareVersion("1.0.1", "1.0")); //* 1

//* Time: O(max(n,m)) - The input strings are not guaranteed to be of equal length
//* So the time taken scales with the maximum of the length of both input strings1

//* Space: O(max(n,m)) - Split returns a new array, so the total memory usage scales with the larger of the two inputs
