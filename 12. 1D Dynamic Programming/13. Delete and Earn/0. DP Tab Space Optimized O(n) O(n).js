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
//! Create BUCKETS of identical elements
//!     - This ONLY works because we can take ALL of the duplicates
//*     - SUM of all identical numbers
//*     - This also PREVENTS the need to SORT
//*         - By creating buckets, essentially get a sorted input

//! Recurrence Relation: F(n) = max(F(nextIndex) + nums[i], F(i + 1))
//*     - We only need the two previous states
//* Apply tabulation to avoid recursion overhead
function deleteAndEarn(nums) {
  if (nums.length === 0) return 0;

  const maxValue = Math.max(...nums);
  const points = new Array(maxValue + 1).fill(0);

  //* Create buckets to sum all duplicate elements
  //* This also step essentially SORTS the values too
  for (let num of nums) {
    points[num] += num;
  }

  //! The problem has now been reduced to House Robber
  //* We are unable to pick ADJACENT numbers
  //* If you include the current element, skip the next
  let first = points[0]; //* F(n-2)
  let second = points[1]; //* F(n-1)

  //* F(n) = max(F(n-2) + points[i], F(n-1))
  for (let i = 2; i <= maxValue; i++) {
    const third = Math.max(first + points[i], second);
    first = second;
    second = third;
  }

  return second;
}

console.log(deleteAndEarn([2, 1, 1, 3])); //* 5
console.log(deleteAndEarn([3, 4, 2])); //* 6
console.log(deleteAndEarn([4, 4, 4, 4])); //* 16
console.log(deleteAndEarn([2, 2, 3, 3, 3, 4])); //* 9

//* Time: O(n) - There are "n" unique subproblems where "n" is maxValue
//* It takes O(n) to create the points array
//* Then it takes O(n) to compute every subproblem

//* Space: O(n) - The buckets array uses O(n) space
//* The subproblems are stored in constant space variables
