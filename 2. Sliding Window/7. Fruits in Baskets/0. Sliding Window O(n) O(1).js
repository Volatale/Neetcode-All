//* The goal is to collect as much fruit as possible (the maximum number of fruit)
//*     - Thus, this is an optimization problem
//! We are ONLY allowed to use two baskets, and each basket can hold a SINGLE type of fruit
//*     - In other words, we can only hold two different types of fruit at a time
//* There is no choice in the matter of whether or not we take the fruit; we HAVE to
//*     - However, the picked fruit must fit in one of our baskets
//* If we reach a tree with fruit that cannot fit in our basket, we must stop
//* Ultimately, we need to track the number of each individual fruit that we have
//* So this indicates that we can use a frequency map of some sort
//* If the current fruit does not exist in the map, and we already have two fruits, then we can't take the fruit
//* We can use a sliding window approach where the invariant is "there cannot be more than two unique fruits within the window"
//*     - If this invariant is broken, then we shrink the window on the left until the invariant holds true once more
//* The equation (right - left + 1) tells us how many fruits exist in both baskets (combined)
//! Find the longest subarray that has at most 2 distinct elements
function totalFruit(fruits) {
  //* Used to track the unique fruits, their frequency, and the number of unique fruits
  const basket = {};
  let types = 0;
  let maxFruits = 0;

  //* Pointers for the sliding window
  let start = 0;
  let end = 0;

  while (end < fruits.length) {
    //* Found a new type of fruit
    if (!basket.hasOwnProperty(fruits[end])) {
      types++;
    }

    //* Increase the frequency of this fruit
    basket[fruits[end]] = (basket[fruits[end]] || 0) + 1;

    //* There are too many types of fruit within the basket
    while (types > 2) {
      basket[fruits[start]]--;

      //* The basket no longer contains this type of fruit
      if (basket[fruits[start]] === 0) {
        types--;
        delete basket[fruits[start]];
      }

      start++;
    }

    //* (end - start + 1) gives us the total number of fruits in the basket
    maxFruits = Math.max(maxFruits, end - start + 1);
    end++;
  }

  return maxFruits;
}

console.log(totalFruit([1, 2, 1])); //* 3
console.log(totalFruit([0, 1, 2, 2])); //* 3
console.log(totalFruit([0, 0, 1, 1, 1, 2, 2, 2])); //* 6
console.log(totalFruit([1, 2, 3, 2, 2])); //* 4
console.log(totalFruit([1])); //* 1
console.log(totalFruit([1, 1, 1, 1, 1])); //* 5

//* Time: O(n) - It takes O(n) to process every element in the fruits array

//* Space: O(1) - Since we can only hold two types of fruits, the "basket" always has a max size of 2
