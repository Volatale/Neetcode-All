//* We only have ONE of each item
//* But we are allowed to break items up into fractional quantities if needed
//* At each step, we have three cases (but two decisions to make)
//*     - Include the current element (if we the capacity can support it)
//*     - Include the current element in a FRACTIONAL quantity
//*     - Exclude the current element
//* Apply Memoization to avoid redundant work

/*
 ! Recurrence Relation:
 !  F(i,w) = 
 !      max(
 !          F(i + 1, w - arr[i][1]) + arr[i][0] -> Include ENTIRE item
 !          F(i + 1, 0) + w / arr[i][1] * arr[i][0] -> Include FRACTIONAL amount of item
 !          F(i + 1, w) -> Exclude Item
 !      ) 
 */
function fractionalKnapsack(arr, capacity) {
  function getItems(i, capacity, memo) {
    //* Base Case: No more items left, or no more room
    if (i === arr.length || capacity === 0) return 0;

    //* Utilize memoized value
    const key = `${i}-${capacity}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let maxValue = 0;

    //* Case 1: Include ENTIRE current item; ensure we are within capacity bounds
    if (capacity >= arr[i][1]) {
      maxValue = getItems(i + 1, capacity - arr[i][1], memo) + arr[i][0];
    } else {
      //* Case 2: Include a FRACTIONAL amount of current item
      const fractional = capacity / arr[i][1];

      maxValue = Math.max(
        maxValue,
        getItems(i + 1, 0, memo) + fractional * arr[i][0]
      );
    }

    //* Case 3: Exclude current element
    maxValue = Math.max(maxValue, getItems(i + 1, capacity, memo));

    memo[key] = maxValue;
    return maxValue;
  }

  return getItems(0, capacity, {});
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

//* Time: O(n * w) - Where "n" is the number of items and "w" is the capacity of the knapsack
//* Since we memoize the results of each subproblem, there are only n * w unique subproblems
//* There are two non-constant parameters (n and w)
//* n = (0 to n) = (n + 1)
//* w = (0 to w) = (w + 1)
//* (n + 1) * (w + 1)

//* Space: O(n * w) - There are n * w unique subproblems, so there are n * w keys
//* The depth of the recursion tree scales with the number of items
