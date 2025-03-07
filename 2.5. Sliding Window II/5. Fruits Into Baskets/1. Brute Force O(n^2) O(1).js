//* We can start from ANY tree (index)
//*     - So we can technically just try EVERY possible starting point
//*     - Just reset the counts of fruits when we restart
//* Keep track of the maximum value
//*     - Need to sum the cumulative counts of BOTH fruit types
//* Use a hashtable to track keys/frequencies-

function totalFruit(fruits) {
  //* Tracks frequency of picked fruits
  const freq = new Map();

  let maxFruits = 0;

  //* Try every possible starting point (subarray)
  for (let i = 0; i < fruits.length; i++) {
    freq.clear();

    for (let j = i; j < fruits.length; j++) {
      //* Pick the current fruit
      freq.set(fruits[j], (freq.get(fruits[j]) || 0) + 1);

      //* We have 3 types of fruits, so the basket is invalid
      if (freq.size > 2) break;

      //* Get the length of the current subarray (fruits picked === subarray length)
      maxFruits = Math.max(maxFruits, j - i + 1);
    }
  }

  return maxFruits;
}

console.log(totalFruit([1, 2, 1])); //* 3
console.log(totalFruit([0, 1, 2, 2])); //* 3
console.log(totalFruit([1, 2, 3, 2, 2])); //* 4
console.log(totalFruit([1, 1, 1, 1, 1])); //* 5
console.log(totalFruit([1, 5, 0, 2])); //* 2

//* Time: O(n^2) - We have two nested loops, both of whom depend on the input length

//* Space: O(1) - The hashtable size is technically limited to 3 keys, which is a constant
