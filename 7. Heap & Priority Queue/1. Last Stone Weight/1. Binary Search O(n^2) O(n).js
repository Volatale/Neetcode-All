//* Sort the array so we can access the two largest stones
//* When the stones smash, store the result
//* If the result !== 0, ONE of the stones survived
//* Find the index to insert the remaining element using binary search (bisectLeft)
//* Splice the myStones array and insert the result (but as the absolute value)
function lastStoneWeight(stones) {
  const myStones = [...stones];

  //* Sort in descending order
  myStones.sort((a, b) => a - b);

  while (myStones.length > 1) {
    //* Take the two heaviest stones
    const x = myStones.pop();
    const y = myStones.pop();

    const smash = x - y;

    // //* If "x" survived
    if (smash !== 0) {
      let index = bisectLeft(myStones, smash); //* Binary Search for the insert index
      myStones.splice(index, 0, Math.abs(smash)); //* Insert the element at index "index"
    }
  }

  return myStones.length === 0 ? 0 : myStones[0];
}

//* Find the insertion position
function bisectLeft(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = left + ((right - left) >> 1);

    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1])); //* 1
console.log(lastStoneWeight([1, 1])); //* 0
console.log(lastStoneWeight([5])); //* 5
console.log(lastStoneWeight([100, 100, 100])); //* 100

//* Time: O(n^2) - Sorting takes O(n log n) time in the worst case
//* There are approximately n / 2 iterations and it takes O(log n) to binary search
//* Then, it takes O(n) to insert the element (we have to shift the elements after "i")
//* This insertion happens n / 2 times, so the time taken is O(n^2)

//* Space: O(n) - The new array stores all "n" elements in the worst case
