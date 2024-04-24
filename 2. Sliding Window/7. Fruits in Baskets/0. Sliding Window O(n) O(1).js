//* Our basket can only hold two different types of fruit
//* Each unique number represents a different type of fruit
//* So we should track the frequency of each fruit
//* If map.size > 2, then we hold 3 fruits, which is invalid (decrease window size)
//* Decrement the fruit at the start of the window
//* If its number of occurrences === 0, then we have none left, so remove it from the "basket"
function fruitIntoBaskets(fruits) {
  let start = 0;
  let end = 0;
  let maxFruits = 0;

  const basket = new Map(); //* A basket can only hold 2 fruits (2 elements)

  while (end < fruits.length) {
    //* Add an occurrence
    basket.set(fruits[end], (basket.get(fruits[end]) || 0) + 1);

    //* The basket contains > 2 elements
    while (basket.size > 2) {
      basket.set(fruits[start], basket.get(fruits[start]) - 1);

      //* Delete if you have 0 occurrences left
      if (basket.get(fruits[start]) === 0) {
        basket.delete(fruits[start]);
      }

      start++;
    }

    maxFruits = Math.max(maxFruits, end - start + 1);
    end++;
  }

  return maxFruits;
}

console.log(fruitIntoBaskets([1, 2, 1])); //* 3
console.log(fruitIntoBaskets([0, 1, 2, 2])); //* 3
console.log(fruitIntoBaskets([0, 0, 1, 1, 1, 2, 2, 2])); //* 6
console.log(fruitIntoBaskets([1, 2, 3, 2, 2])); //* 4
console.log(fruitIntoBaskets([1])); //* 1
console.log(fruitIntoBaskets([1, 1, 1, 1, 1])); //* 5

//* Time: O(n) - We have to process each element in the array
//* The inner while loop will activate, at most, n - 1 times

//* Space: O(1) - We can only hold TWO elements within the map at once
//* So the space is technically O(2), but constants simplify to O(1) in Big O Notation
