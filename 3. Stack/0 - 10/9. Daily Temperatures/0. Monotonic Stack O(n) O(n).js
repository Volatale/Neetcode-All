//* Use a monotonic stack to find the next greater element
//* When you do, you want to pop the top of the stack
//* Within the stack, we store INDICES, not the values themselves
//* This allows us to replicate the "j - i" from the brute force solution
//* Grab the "index" from the stack, and use that to compare with the current
//* temp[stack[stack.length - 1]] = 73, compared with 74. So we pop the 73 since it was the NEXT greater element
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; //* Find Next Greater Element

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 && //* Check if you ever have an element to pop
      temperatures[i] > temperatures[stack[stack.length - 1]] //* If the element we WANT to add > top of the stack
    ) {
      const top = stack.pop();
      result[top] = i - top; //* Number of days we have to wait
    }

    //* Pushing the value itself won't let us get the difference in days
    //* So instead we push "i", then we can still index into temperatures and compare values
    stack.push(i);
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); //* [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); //* [1, 1, 1, 0]
console.log(dailyTemperatures([30, 60, 90])); //* [1, 1, 0]

//* Time: O(n) - We have an outer loop, and then an inner while loop
//* The inner while loop will only activate at most "n" times

//* Space; O(n) - The result array scales proportionally with the size of the input
//* If the input is [10, 20, 30], that is length 3
//* The result will be: [1, 1, 0], also length 3
