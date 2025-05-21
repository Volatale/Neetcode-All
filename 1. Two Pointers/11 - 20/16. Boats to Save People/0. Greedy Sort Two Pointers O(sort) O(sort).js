//* We are given an array people[i] where the ith value is the weight of the ith person
//* We are also given an INFINITE number of boats, where each boat can carry a maximum weight of `limit`
//* Each boat can only carry at most two people (provided that the sum of their weights are <= `limit`)
//* The goal is to find the MINIMUM number of boats needed to deliver everybody
//* In other words, we need to optimize our boat usage by pairing people efficiently
//! Mathematically speaking, it makes the most sense to pair the heaviest people with the lightest
//* In the worst case, we can ONLY move the heavy person
//*     - In this case, the additional person (the lighter person) is just a bonus
//* Sorting the array ensures we always have access to the heaviest and lightest people
//* In any given situation, always add the heaviest since, and if there is still room, add a light person
//*     - The number of boats sent will always be <= n, since we know it is always possible to send everyone
//*     - If we always send the lightest, then in the worst case we end up with `2n` boats
//*     - If we always send the heaviest, then in the worst case we send `n` boats
//*         - So mathematically, we should ALWAYS send someone heavy, and then someone light if we can fit them
//* Since TWO people can fit on the boat at max, and the array exhibits monotonicity, a two pointer aproach can work
//*     - Whenever we send people on the boat, we increment pointers
//* If the pointers ever cross each other, then we know we have sent every person
//* Since we know the pairs are optimized, we know we are guaranteed to send the minimum number of boats
function numRescueBoats(people, limit) {
  if (people.length === 0) return 0;

  //* Sort to ensure we can always pair someone heavy with someone light (monotonically)
  people.sort((a, b) => a - b);

  //* Minimum number of boats sent
  let boats = 0;

  //* Two pointers used to determine who gets sent next
  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    //* Add the light person if the boat has enough capacity
    if (people[left] + people[right] <= limit) {
      left++;
    }

    //* Add the heavy person
    right--;
    boats++;
  }

  return boats;
}

console.log(numRescueBoats([4, 3, 2, 1], 5)); //* 2
console.log(numRescueBoats([1, 2], 3)); //* 1
console.log(numRescueBoats([3, 2, 2, 1], 3)); //* 3
console.log(numRescueBoats([3, 5, 3, 4], 5)); //* 4

//* Time: O(sort) - It takes O(n log n) on average to sort the array
//* Then, we iterate through the array which takes a further O(n)

//* Space: O(sort) - The memory usage depends on the sorting algorithm used
