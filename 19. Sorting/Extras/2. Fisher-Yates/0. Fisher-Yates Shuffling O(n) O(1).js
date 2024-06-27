//* Start at the final index
//* Find an index "j"; j <= i but >= 0
//* Math.random() * (i + 1) generates a random int from [0.=i] (inclusive)
//* Swap arr[i] and arr[j]
function fisherYates(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

console.log(fisherYates([1, 2, 3, 4, 5]));

//* Time: O(n) - We iterate over the array once
//* Flooring and Generating random numbers takes O(1)
//* Swapping also takes O(1)

//* Space: O(1) - We don't use space that scales with the input size
