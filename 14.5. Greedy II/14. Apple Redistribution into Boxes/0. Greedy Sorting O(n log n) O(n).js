//* The sum of apples will be <= the sum of the capacities
//*     - Why? We have to fill the MINIMUM number of boxes necessary
//*     - Logically speaking, this means it should ALWAYS be possible to run out of apples
//* If we run out of space in the current box and we still have apples from this same pack
//*     - Those apples need to be put into ANOTHER box
//* And since it is always possible to package EVERY apple
//* We just get all of the apples at once and put them into the largest boxes
//*     - This lets us MINIMIZE the amount of boxes that get utilized
//*     - Effectively, this MAXIMIZES the number of apples that get put into a single box
//! Putting apples into the SMALLEST boxes would MAXIMIZE the number of boxes that get used
function minimumBoxes(apple, capacity) {
  let boxes = 0;

  //* Get the sum of apples so we can easily distribute them
  let totalApples = apple.reduce((acc, curr) => acc + curr, 0);

  //* Sort the boxes based on their size (in descending) largest first
  capacity.sort((a, b) => b - a);

  //* Put as many apples into each box as possible
  for (let i = 0; i < capacity.length; i++) {
    totalApples -= capacity[i];

    //* i + 1 gives us the number of boxes used
    if (totalApples <= 0) return i + 1;
  }

  return boxes;
}

console.log(minimumBoxes([1, 3, 2], [4, 3, 1, 5, 2])); //* 2
console.log(minimumBoxes([5, 5, 5], [2, 4, 2, 7])); //* 4
console.log(minimumBoxes([3, 3], [6])); //* 1
console.log(minimumBoxes([100, 100, 100], [50, 50, 50, 50, 50, 50])); //* 6
console.log(minimumBoxes([1], [7])); //* 1

//* Time: O(n log n) - It takes O(n log n) to sort the boxes based on their capacities
//* It takes O(n) to get the sum of apples, and O(m) to distribute them (in the worst case)

//* Space: O(n) - Sorting generally uses O(n) space (due to merge sort)
