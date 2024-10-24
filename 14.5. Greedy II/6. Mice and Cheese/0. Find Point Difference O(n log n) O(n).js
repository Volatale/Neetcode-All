//* We have to assume mouse2 eats everything (except k cheese)
//* Mouse1 must eat EXACTLY "k" cheese
//*     - Logically speaking, this means mouse2 will eat the rest
//* So all we have to do is determine which cheese have the least point difference
//*     - reward1[i] - reward2[i] gives us the point difference of mouse1 eating vs mouse2
//*         - If we MUST eat cheese and the overall score will drop, we want to MINIMIZE how much it drops
//*         - On the other hand, if the score would increase, we want to MAXIMIZE how much it increases
//* Then, we can sort the differences in order of value (in descending order)
//* Finally, iterate through the array from left to right and add the first "k" values to our score
//*     - If diff[i] is negative, we can rest assured that this would result in the "least" decrease overall
//*     - And if diff[i] is positive, our score can only increase
//* Thus, mouse1 greedily eats the k cheese that have the highest point difference
//! It is worth noting that quick select could be used to find the k largest elements
function miceAndCheese(reward1, reward2, k) {
  //* If "k" === 0, mouse1 can't eat ANY cheese, thus just let mouse2 eat all of it
  if (k === 0) return reward2.reduce((acc, curr) => acc + curr, 0);

  let maxScore = 0;
  const n = reward1.length;
  const diff = new Array(n).fill(0);

  //* Assume mouse2 eats everything
  for (let i = 0; i < n; i++) {
    diff[i] = reward1[i] - reward2[i];
    maxScore += reward2[i];
  }

  //* Sort the diff array and ensure we MAXIMIZE mouse1's score
  diff.sort((a, b) => b - a);

  //* Have mouse1 get their maximum possible score (maximizes the minimum score)
  for (let i = 0; i < k; i++) {
    maxScore += diff[i];
  }

  return maxScore;
}

console.log(miceAndCheese([1, 1, 3, 4], [4, 4, 1, 1], 2)); //* 15
console.log(miceAndCheese([3, 4, 5], [6, 7, 8], 1)); //* 20
console.log(miceAndCheese([1, 1], [1, 1], 2)); //* 2
console.log(miceAndCheese([50], [20], 0)); //* 20

//* Time: O(n log n) - It takes O(n) to build the diff array, then it takes O(n log n) to sort
//* Finally, it takes O(k) to have mouse1 eat the "best" cheese, but k <= n

//* Space: O(n) - The diffs array scales proportionally in size with the input size (n)
//* Sorting also uses O(n) space due to merge sort
