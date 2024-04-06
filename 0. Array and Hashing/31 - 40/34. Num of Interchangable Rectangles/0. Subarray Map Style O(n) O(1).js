//* If rectangles.length <= 1, return 0. We have nothing to compare to, so no potential pairs
//* Use a map to track the count of ratios we have encountered
//* At each index, get the ratio, and see if we have already found that ratio within the rectangle array
//* If we have, add all of the occurrences of that ratio encountered thus far
//* At the end of each iteration, add to the count of "this" ratio
function interchangableRectangles(rectangles) {
  if (rectangles.length <= 1) return 0;

  let pairs = 0;

  const ratioCount = new Map();

  for (let i = 0; i < rectangles.length; i++) {
    const [width, height] = rectangles[i];

    const ratio = width / height;

    if (ratioCount.has(ratio)) {
      pairs += ratioCount.get(ratio) || 0;
    }

    ratioCount.set(ratio, (ratioCount.get(ratio) || 0) + 1);
  }

  return pairs;
}

console.log(
  interchangableRectangles([
    [4, 8],
    [3, 6],
    [10, 20],
    [15, 30],
  ])
); //* 6

console.log(
  interchangableRectangles([
    [4, 5],
    [7, 8],
  ])
); //* 0

console.log(
  interchangableRectangles([
    [10, 20],
    [50, 100],
  ])
); //* 1

console.log(
  interchangableRectangles([
    [5, 2],
    [10, 4],
    [10, 20],
    [50, 100],
  ])
); //* 2

//* Time: O(n) - The map allows us to avoid repeated work; instead we just iterate through the entire array once
//* It takes Θ(1) for hashmap methods to execute, so we are doing a "constant" amount of work within each iteration

//* Space: O(n) - In the worst case, each subarray has a unique ratio
//* At the end, the number of keys in the map will be proportional to the size of the input
