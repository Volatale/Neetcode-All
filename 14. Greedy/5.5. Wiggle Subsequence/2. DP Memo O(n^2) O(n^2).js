//* We need to alternate polarities between elements
//* So starting from the first element, the NEXT difference must have an opposite polarity
//* Adjacent elements (relative to our subsequence) that are equal will result in a neutral polarity
//*     - So don't include them
//* We are also forced to include the first element
//*     - So by default, we can include element 0

//* Apply memoization to avoid redundant work
//*     - We have 3D state (i, prevIndex, prevPolarity)
function wiggleMaxLength(nums) {
  function findSubsequences(i, prevIndex, prevPolarity, memo) {
    //* Base Case: There are no more elements to consider
    if (i === nums.length) return 0;

    //* Utilze memoized value
    const key = `${i}-${prevIndex}-${prevPolarity}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let maxLength = 0;

    const diff = nums[i] - nums[prevIndex];
    let newPolarity = 0;

    if (diff > 0) {
      newPolarity = 1;
    } else if (diff < 0) {
      newPolarity = -1;
    } else {
      newPolarity = 0;
    }

    //* Case 1: Include the element
    if (
      prevIndex === -1 || //* No previous element
      (newPolarity !== prevPolarity && nums[i] !== nums[prevIndex])
    ) {
      maxLength = Math.max(
        maxLength,
        findSubsequences(i + 1, i, newPolarity, memo) + 1
      );
    }

    //* Case 2: Exclude the element
    maxLength = Math.max(
      maxLength,
      findSubsequences(i + 1, prevIndex, prevPolarity, memo)
    );

    return (memo[key] = maxLength);
  }

  let first = -1;
  if (nums[0] > 0) {
    first = 1;
  } else if (nums[0] < 0) {
    first = 1;
  } else {
    first = 0;
  }

  return findSubsequences(0, -1, first, {});
}

console.log(wiggleMaxLength([1, 7])); //* 2
console.log(wiggleMaxLength([1, 7, 4, 9, 2, 5])); //* 6
console.log(wiggleMaxLength([1, 17, 5, 10, 13, 15, 10, 5, 16, 8])); //* 7
console.log(wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])); //* 2

//* Time: O(n^2) - There are "n" possible indices for i and "n" possible prev indices
//* There are only 3 possible values for prevPolarity
//* n * n * 3 = unique states, but we ignore constant terms

//* Space: O(n^2) - There are n^2 unique states to cache
