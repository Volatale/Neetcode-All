//* Since we can break items up in Fractional Knapsack
//* We need to determine which is the BEST to place first
//* Ranking items based on their value alone makes no sense
//!     - Ideally we want to look at the RATIO of value to weight
//!     - Sort the items based on this ratio
//*     - This informaiton then gives us the LOCALLY OPTIMAL CHOICE
//* Naturally, the problem is GREEDY
//*     - We want to take MORE of the higher valued items
//*     - And we want to take LESS of the lower valued items
//* If we have to break items up, take EVERYTHING WE CAN
//*     - The items are SORTED, thus we know this is the "best" we can get
//*     - Any item AFTER this will have a lower ratio, and therefore they are choices
function fractionalKnapsack(arr, capacity) {
  //* Sort the pairs based on their ratio of profit to weight (DESCENDING order)
  arr.sort((a, b) => b[0] / b[1] - a[0] / a[1]);

  let bestValue = 0;

  //* Keep adding items until we have 0 capacity
  for (let i = 0; i < arr.length; i++) {
    const [value, weight] = arr[i];

    //* Case 1: We can fit the entire item
    if (capacity >= weight) {
      bestValue += value;
      capacity -= weight;
    } else {
      //* Case 2: Use a fractional amount of the item
      bestValue += (capacity / weight) * value;
      break; //* Capacity is now 0 (we took everything we could)
    }
  }

  return bestValue;
}

console.log(
  fractionalKnapsack(
    [
      [60, 10],
      [100, 20],
      [120, 30],
    ],
    50
  )
); //* 240
console.log(fractionalKnapsack([[500, 30]], 10)); //* 166.667
console.log(fractionalKnapsack([[10, 50]], 50)); //* 10
console.log(fractionalKnapsack([[100, 30]], 15)); //* 50

//* Time: O(n log n) - It takes O(n log n) to sort on average (assuming merge sort was used etc)
//* Then it takes O(n) to iterate "n" times where "n" is arr.length (in the worst case)

//* Space: O(n) - Assuming we use merge sort, the space usage is O(n)
