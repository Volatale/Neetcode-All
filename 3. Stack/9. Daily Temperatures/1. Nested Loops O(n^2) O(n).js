//* Find the next greater element to the right
//* "i" represents the current day
//* "j" represents how many days we have to wait until the next greater temperature
//* So j - i gives us the number of days until temperatures[i] has to wait for a better temp
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);

  for (let i = 0; i <= temperatures.length - 1; i++) {
    for (let j = i + 1; j < temperatures.length; j++) {
      if (temperatures[j] > temperatures[i]) {
        result[i] = j - i;
        break;
      }
    }
  }

  return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); //* [1, 1, 4, 2, 1, 1, 0, 0]
console.log(dailyTemperatures([30, 40, 50, 60])); //* [1, 1, 1, 0]
console.log(dailyTemperatures([30, 60, 90])); //* [1, 1, 0]

//* Time: O(n^2) - We have a nested loop, both of which depend on the input size
//* For each outer loop, there are "n" inner loops
//* So the time complexity ends up being O(n * (n + 1) / 2), but that simplifies to O(n^2)

//* Space; O(n) - The result array scales proportionally with the size of the input
//* If the input is [10, 20, 30], that is length 3
//* The result will be: [1, 1, 0], also length 3
