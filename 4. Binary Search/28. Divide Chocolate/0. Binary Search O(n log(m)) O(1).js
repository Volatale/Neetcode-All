//* The maximum amount of cuts we can make is "k"
//* So if the number of cuts < maxCuts, we can successfully distribute the chocolate
//* Take "mid" to represent the maxSweetness that each block should have
//* We can be GREEDY, however, so maxSweetness of 5 still works with [1, 2, 5]
//* The "5" piece is just added to the previous block
//* Don't eliminate the "mid" value if we are successful, this could be the return value
//* We aren't searching for a value WITHIN the array itself, so we don't do left <= right
function divideChocolate(sweetness, k) {
  function sweetnessValid(maxSweetness) {
    let maxCuts = k + 1;
    let cuts = 0; //* Track the number of cuts we do
    let totalSweetness = 0; //* Sum the sweetness

    //* Try cutting the chocolate bar
    for (let sweet of sweetness) {
      totalSweetness += sweet;

      //* Each block has to have <= maxSweetness "sweetness" (be GREEDY)
      if (totalSweetness > maxSweetness) {
        cuts++;
        totalSweetness = 0; //* THIS sweet has been placed into the current cut
      }
    }

    //* True means we can try to decrase the max sweetness
    return cuts < maxCuts;
  }

  //* The minimum sweetness is 1
  //* If we have an input like [1, 5, 10, 50, 20], the block HAS to contain every element (sum of all)
  let left = 1;
  let right = sweetness.reduce((acc, curr) => acc + curr, 0);

  while (left < right) {
    //* Mid represents the "maximum" sweetness that we want to test
    let mid = left + ((right - left) >> 1);

    if (sweetnessValid(mid)) {
      right = mid; //* Mid is a potential value, don't eliminate it
    } else {
      left = mid + 1; //* Need more sweetness, eliminate left
    }
  }

  return left;
}

console.log(divideChocolate([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)); //* 6
console.log(divideChocolate([5, 6, 7, 8, 9, 1, 2, 3, 4], 8)); //* 1
console.log(divideChocolate([1, 2, 2, 1, 2, 2, 1, 2, 2], 2)); //* 5
console.log(divideChocolate([1, 5, 10, 50, 20], 1)); //* 20
console.log(divideChocolate([1, 2, 3, 4], 1)); //* 4
console.log(divideChocolate([100], 1)); //* 1
console.log(divideChocolate([100], 0)); //* 100

//* Time: O(n log(m)) - "m" represents the SUM of sweetness
//* The search space scales in size with the sum of the sweetness values
//* Within the binary search O(log n), we call a function that takes O(n)

//* Space: O(1) - The space usage remains constant regardless of our input size
