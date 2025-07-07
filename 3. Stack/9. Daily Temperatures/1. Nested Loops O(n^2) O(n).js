//* We are given an array `temperatures`, which represents the daily temperature
//* Return an array `answer` such that answer[i] is the no. of days after "i" for a warmer temp
//*     - If there is no future day for which this is possible, answer[i] === 0
//* In other words, we need the next greater value for each index (day)
//* In a brute force manner, we can simply use a nested for loop
function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);

  for (let i = 0; i <= temperatures.length - 1; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        answer[i] = j - i;
        break;
      }
    }
  }

  return answer;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); //* [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); //* [1, 1, 1, 0]
console.log(dailyTemperatures([30, 60, 90])); //* [1, 1, 0]

//* Time: O(n^2) - We have a nested for loop, both of which scale with "n"

//* Space: O(n) - The answer array scales with the input size (n)
