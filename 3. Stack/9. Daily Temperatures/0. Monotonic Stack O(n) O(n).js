//* We are given an array `temperatures`, which represents the daily temperature
//* Return an array `answer` such that answer[i] is the no. of days after "i" for a warmer temp
//*     - If there is no future day for which this is possible, answer[i] === 0
//* In other words, we need the next greater value for each index (day)
//* To find the next greater value, we can simply use a monotonic stack
//* The stack stores monotonically non-increasaing values
//* Since all of the values are NOT greater than the current, we still need a larger value
//* Therefore, the NEXT greater element is the NGE for ALL of the elements in the stack
//* So we can severely cut down on the time complexity
function dailyTemperatures(temperatures) {
  //* Monotonically decreasing stack - stores indices of days we need NGE of
  const stack = [];
  const answer = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (
      //* Found next greater element of all elements in the stack
      stack.length > 0 &&
      temperatures[stack[stack.length - 1]] < temperatures[i]
    ) {
      const index = stack.pop();
      answer[index] = i - index;
    }

    stack.push(i);
  }

  return answer;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); //* [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); //* [1, 1, 1, 0]
console.log(dailyTemperatures([30, 60, 90])); //* [1, 1, 0]

//* Time: O(n) - Each element is processed at most twice, so the time complexity is linear

//* Space: O(n) - The stack grows proportionally in size to the input size (in the worst case)
