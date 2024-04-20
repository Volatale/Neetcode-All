//* Sort the array so we can use two pointers
//* Start left at 0 and right at the last index
//* Each boat can only store 2 people max, so two pointers makes sense
//* If the sum of both the left and right weights <= limit
//* That means we can save BOTH people at once
//* Increment left because were able to save the left person too
//* If the sum > limit, then we know we can't include the left element
//* The right element is guaranteed to be larger, so in the worst case we can ONLY save the right element
function boatsToSavePeople(weights, limit) {
  weights.sort((a, b) => a - b);

  let boats = 0;
  let left = 0;
  let right = weights.length - 1;

  //* Every time the pointers move, we are "saving" someone
  while (left <= right) {
    const sum = weights[left] + weights[right];

    //* There was space for the person at index "left"
    if (sum <= limit) {
      left++; //* Can't save the same person twice
    }

    //* Save the "right" person regardless
    boats++;
    right--;
  }

  return boats;
}

console.log(boatsToSavePeople([4, 3, 2, 1], 5)); //* 2
console.log(boatsToSavePeople([1, 2], 3)); //* 1
console.log(boatsToSavePeople([3, 2, 2, 1], 3)); //* 3
console.log(boatsToSavePeople([3, 5, 3, 4], 5)); //* 4

//* Time: O(n log n) - It takes n log n time to sort the array
//* Then it takes O(n) to iterate through the array with the while loop

//* Space: O(1) or O(n) - If we assume the inbuilt sorting method to be O(1), then O(1)
//* Otherwise, O(n) if it was merge sort
//* The algorithm itself does not use any extra space that scales with the input size
