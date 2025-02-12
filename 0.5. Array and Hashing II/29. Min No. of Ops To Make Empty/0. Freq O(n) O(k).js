//! We want to maximize the number of triple removals
//*     - This will result in the minimum number of overall removals
//* But we ALSO have to make sure that we don't do TOO many triple removals
//*     - The remaining number of elements of this type should be divisible by 2 or 3
//* If frequency is 1
//!     - We cannot delete any elements
//*     - Immediately return -1
//* If frequency is divisible by 3
//!     - There is no remainder at all
//*     - We can perform as many TRIPLE deletions as we want
//*         - deletions += Math.floor(freq / 3)
//! Else, the frequency is NOT divisible by 2 OR 3
//*     - So we need a combination of doubles AND triples
//*     - Something like 7 can be made with (2, 2, 3)
//*         - (7 / 3) = 2 complete deletions
//*             - The 2 comes from the (2, 2)
//*         - Then do 1 more to get the OTHER deletion (there are 3 elements left)
//*             - This gives us the 3, giving us (2, 2, 3) = 3 deletions total
//* The different ways we can make each number using 2 and 3:
//* 2:
//*     - 2
//* 3:
//*     - 3
//* 4:
//*     - 2, 2
//* 5:
//*     - 2, 3 (minimized)
//*     - (5 / 3) = 1 double, then add 1 to get last triple removal
//* 6:
//*     - 2, 2, 2
//*     - 3, 3 (minimized)
//*     - (6 / 3) = 2 triple removals (divisible by 3)
//* 7:
//*     - 2, 2, 3
//*     - (7 / 3) = 2 double removals, then add 1 more triple removal
//* 8:
//*     - 2, 2, 2, 2
//*     - 3, 3, 2 (minimized)
//*     - (8 / 3) = 2 triple removals, then add 1 more double
//* 9:
//*     - 2, 2, 2, 3
//*     - 3, 3, 3 (minimized)
//*     - (9 / 3) = 3 triple removals (divisible by 3)
//* 10:
//*     - 2, 2, 2, 2, 2
//*     - 3, 3, 2, 2 (minimized)
//*     - (10 / 3) = 3 (but its 2 doubles and 2 triples, so adding 1 still works)
//* 11:
//*     - 2, 2, 2, 2, 3
//*     - 3, 3, 3, 2 (minimized)
//*     - (11 / 3) = 3 triples and 1 extra double
//* 14:
//*     - 2, 2, 2, 2, 2, 2, 2
//*     - 3, 3, 3, 3, 2 (minimized)
//*     - (14 / 3) = 4 triples and 1 extra double

function minOperations(nums) {
  //* We cannot delete any elements
  if (nums.length < 2) return -1;

  let deletions = 0;

  //* Track the frequency of each element
  const freqMap = {};

  for (let i = 0; i < nums.length; i++) {
    freqMap[nums[i]] = (freqMap[nums[i]] || 0) + 1;
  }

  //* Try to perform as many triple deletions as possible
  for (let num in freqMap) {
    const freq = freqMap[num];

    //* Not possible to delete every element
    if (freq === 1) return -1;

    //* We can form the max amount of triple deletions
    if (freq % 3 === 0) {
      deletions += Math.floor(freq / 3);
    } else {
      //* Number is NOT divisible by 2 or 3
      //* So perform as many triple or doubles as possible, then 1 extra
      deletions += Math.floor(freq / 3) + 1;
    }
  }

  return deletions;
}

console.log(minOperations([2, 3, 3, 2, 2, 4, 2, 3, 4])); //* 4
console.log(minOperations([2, 1, 2, 2, 3, 3])); //* -1
console.log(minOperations([1, 1, 1, 1, 1])); //* 2
console.log(minOperations([1, 1, 2, 2, 3, 3])); //* 3

//* Time: O(n) - The time taken scales with the size of the input array

//* Space: O(k) - Where "k" is the number of unique elements in nums
