//* Non-decreasing means sorted DESCENDING, but can have duplicates
//* non-increasing means sorted INCREASING, but can have duplicates
//* Formulas:
//*     - security[i - time] >= security[i - time + 1] >= security[i - time + 2] >= security[i]
//*     - security[i] <= ... <= security[i + time - 1] <= security[i + time]
//* We need there to be AT LEAST "time" days (indices) before AND after the current day (index)
//* Another way to word this is that we need information on the number of "valid" days BEFORE and AFTER index
//* Thus, we can get the prefix and suffix arrays given our "security" array
//* Finally, we can iterate over every index that "could" be in the valid range ([time...n-time])
//*     - if prefix[i] >= time && suffix[i] >= time, then we know "i" is a "good" day
function goodDaysToRobBank(security, time) {
  const results = [];

  //* [i] = Consecutive No. of Elements (BEFORE i) in a row that are monotonically non-decreasing
  //* [i] = Consecutive No. of Elements (AFTER i) in a row that are monotonically non-increasing
  const prefix = new Array(security.length).fill(0);
  const suffix = new Array(security.length).fill(0);

  //* Get the consecutive number of non-increasing elements before each index
  for (let i = 1; i < security.length; i++) {
    if (security[i] <= security[i - 1]) {
      prefix[i] = prefix[i - 1] + 1; //* Count of elements from [0..i-1] >= a[i]
    }
  }

  //* Get the consecutive number of non-decreasing elements before each index
  for (let i = security.length - 2; i >= 0; i--) {
    if (security[i] <= security[i + 1]) {
      suffix[i] = suffix[i + 1] + 1; //* Count of elements from [i+1...n-1] >= a[i]
    }
  }

  //* Find the good days (>= time non-increasing BEFORE i and >= time non-decreasing AFTER i)
  for (let i = time; i < security.length - time; i++) {
    if (prefix[i] >= time && suffix[i] >= time) {
      results.push(i);
    }
  }

  return results;
}

console.log(goodDaysToRobBank([5, 3, 3, 3, 5, 6, 2], 2)); //* [2, 3]
console.log(goodDaysToRobBank([1, 1, 1, 1, 1], 0)); //* [0, 1, 2, 3, 4]
console.log(goodDaysToRobBank([1, 2, 3, 4, 5, 6], 2)); //* []
console.log(goodDaysToRobBank([4, 3, 2, 1, 2, 3, 4], 3)); //* [3]

//* Time: O(n) - We iterate over the entire array a total of three times

//* Space: O(n) - The memory used scales with the length of security.length (n)
