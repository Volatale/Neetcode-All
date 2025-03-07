//! Use a Sliding Window approach - we can try EVERY possible starting point
//* (end - start + 1) gives us the number of fruits picked
//* Fruits are stored within hashtable
//*     - When fruit ENTERS window, increment the fruit's frequency
//*     - When fruit LEAVES window, decrease the fruit's freqeuncy
//* We want the MAXIMUM number of fruits
//*         - So if we find a valid window, DON'T SHRINK
//! Why does Sliding Window work?
//*     - Sliding Window invariant being followed means:
//*         - If window [i..j] is valid, we need to check if [i..j+1] is also valid
//*     - The goal is to keep the hashtable size to <= 2
//*         - So if adding the current fruit type would break that invariant
//*         - Then we know we need to shrink the window
//*     - Likewise, if adding the current fruit lets hashtable size remain at <= 2
//*         - Then we know we have a valid window, so there is no need to shrink/
function totalFruit(fruits) {
  const freq = {}; //* Tracks frequency of fruits that exist in the window
  let types = 0; //* Tracks how many UNIQUE fruits exist in the window
  let maxFruits = 0;

  //* Tracks start and end of valid subarray (elements in window = picked fruits)
  let start = 0;
  let end = 0;

  while (end < fruits.length) {
    //* Check if this is a NEW type of fruit (we can only have 2 at most)
    if (!freq.hasOwnProperty(fruits[end])) types++;

    //* Pick the current fruit
    freq[fruits[end]] = (freq[fruits[end]] || 0) + 1;

    //* Shrink the window (we can only have 2 types of fruit at most)
    while (types > 2) {
      //* Remove the leftmost fruit from the basket (window)
      freq[fruits[start]]--;

      //* We have no more of this type of fruit
      if (freq[fruits[start]] === 0) {
        types--;
        delete freq[fruits[start]];
      }

      start++;
    }

    //* See if we have a new potential best
    maxFruits = Math.max(maxFruits, end - start + 1);
    end++;
  }

  return maxFruits;
}

console.log(totalFruit([1, 2, 1])); //* 3
console.log(totalFruit([0, 1, 2, 2])); //* 3
console.log(totalFruit([1, 2, 3, 2, 2])); //* 4
console.log(totalFruit([1, 1, 1, 1, 1])); //* 5
console.log(totalFruit([1, 5, 0, 2])); //* 2

//* Time: O(n) - At most, we process each element in fruits twice
//* So the time taken scales linearly with input length (fruits.length === n)

//* Space: O(1) - The hashtable size is technically limited to 3 keys, which is a constant
//* When an element has a frequency of 0, we remove it from the hashtable
