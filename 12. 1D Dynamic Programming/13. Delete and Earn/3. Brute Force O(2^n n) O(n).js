//* This is a variation of House Robber
//*     - Except we are skipping NUMBERS instead of houses
//* If we remove 4, we have to "remove" all 3s, and all 5s
//*     - Removal in this case means we can just SKIP the indices that have 3 or 5
//* At each step we can either INCLUDE the element or EXCLUDE it
//*     - If we include, take the points and SKIP ahead to an index that has a number > nums[i] + 1
//*     - If we exclude, just move to the next element
//! We need to SORT the input so we can easily abide by the constraints
//* Being able to take a number that has duplicates
//*     - Means we can take ALL of those duplicates
//*     - For example, [4,4,4,4] = 16
//*         - None of the 4s get removed

//! Recurrence Relation: F(n) = max(F(nextIndex) + nums[i], F(i + 1))
function deleteAndEarn(nums) {
  function getScore(i) {
    if (i >= nums.length) return 0;

    let currSum = nums[i];

    //* Sum all of the elements that are duplicates of this one
    let nextIndex = i + 1;
    while (nextIndex < nums.length && nums[nextIndex] === nums[i]) {
      currSum += nums[i];
      nextIndex++;
    }

    //* Skip all of the elements that are === nums[i] + 1
    while (nextIndex < nums.length && nums[nextIndex] === nums[i] + 1) {
      nextIndex++;
    }

    //* Case 1: Include element, get points, skip to next VALID element
    //* Case 2: Exclde element, don't get points
    return Math.max(getScore(nextIndex) + currSum, getScore(i + 1));
  }

  //* Sort to ensure we can just look side by side
  nums.sort((a, b) => a - b);

  return getScore(0);
}

console.log(deleteAndEarn([3, 4, 2])); //* 6
console.log(deleteAndEarn([2, 1, 1, 3])); //* 5
console.log(deleteAndEarn([4, 4, 4, 4])); //* 16
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4])); //* 9

//* Time: O(2^n) - At each step, there are 2 decisions to make
//* Either include the element or don't include the element
//* Within each call, there is an O(n - i) loop in the worst case

//* Space: O(n) - Sorting uses O(n) space usually (it is probably merge sort under the hood)
//* The depth of the recursion tree scales with "n"
//* At each step, we either skip ahead, or transition the state by 1 index
//* At most, there are "n" indices
