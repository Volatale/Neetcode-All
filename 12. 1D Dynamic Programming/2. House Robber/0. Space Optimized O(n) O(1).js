//! We cannot rob ADJACENT houses
//* If you DON'T rob house 0, then move to house 0 + 1 (i + 1)
//* If you DO rob house 0, then skip ahead to 0 + 2 (i + 2)
//* At each step, either rob or don't rob
//*     - Don't rob: (0 + f(n + 1))
//*     - Rob: (nums[i] + f(n + 2))
//! Base Cases:
//*     - n === 1 (return nums[0]) because there is only 1 house
//*     - n === 2 (return max(nums[0], nums[1])); there are two houses

//! Recurrence Relation: F(n) = Math.max(F(n-2) + cost[n], F(n-1))
//* F(n) = Maximum profit possible to get at this house
//! We only need the two previous results, so use variables instead of an array
function houseRobber(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  //* Represents F(n-1) and F(n-2) respectively
  let first = nums[0];
  let second = Math.max(nums[0], nums[1]);

  //* Third represents F(n) itself
  //* take max profit between F(n-1) and F(n-2)
  for (let i = 2; i < nums.length; i++) {
    const third = Math.max(first + nums[i], second);
    first = second;
    second = third;
  }

  return second;
}

console.log(houseRobber([1, 2, 3, 1])); //* 4
console.log(houseRobber([2, 7, 9, 3, 1])); //* 12
console.log(houseRobber([4, 3, 7, 8, 1, 2])); //* 14
console.log(houseRobber([4, 5, 6])); //* 10

//* Time: O(n) - We perform a loop that scales with the input size (n)

//* Space: O(1) - We are only tracking the results of the two previous "calls"
//* So the space usage remains constant regardless of input size
