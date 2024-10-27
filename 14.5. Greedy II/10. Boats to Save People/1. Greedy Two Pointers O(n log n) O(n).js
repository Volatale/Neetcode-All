//* We want to use the MINIMUM number of boats possible
//*     - Each boat can fit TWO people at most
//*     - Thus, we need to MAXIMIZE the number of people on each boat
//* Sort the people by their weight (since their ordering does not matter)
//*     - This gives us easy access to the lightest / heaviest people at all times
//* In the absolute worst case, we need "n" boats where "n" is people.length
//* We should always send the heaviest people
//*     - And then try to pair the lightest remaining people with person being sent
//* If we have [4, 5] and limit = 9
//*     - We ALWAYS want to send the 5 weight person
//*     - But we should also try to fit the "4" weight person on their boat if we can
//* In the event we DO manage to squeeze them onto the boat
//*     - Increment "left", because there is now one less person to assign a boat to
//* We send ONE boat each iteration, and right will decrement ONCE each iteration
//*     - This means even if we DON'T fit two people on a boat, the heaviest is still sent
//*     - The sums are technically monotonically decreasing
//*         - So at some point we may be able to fit two smaller people on the same boat
function numRescueBoats(people, limit) {
  //* Limit is always >= people[i], so there is ALWAYS a solution
  if (people.length <= 1) return people.length;

  //* Sort people by weight so we can keep pairing lightest with heaviest
  people.sort((a, b) => a - b);

  let boats = 0;

  //* Two pointers - ALWAYS try to fit the smallest with the largest
  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    const sum = people[left] + people[right];

    //* Try to fit lighter person with heavier (not other way around)
    if (sum <= limit) {
      left++; //* Succcessfully put lighter on same boat
    }

    right--;
    boats++;
  }

  return boats;
}

console.log(numRescueBoats([1, 2], 3)); //* 1
console.log(numRescueBoats([3, 2, 2, 1], 3)); //* 3
console.log(numRescueBoats([3, 5, 3, 4], 5)); //* 4
console.log(numRescueBoats([1, 1, 1, 5], 5)); //* 3
console.log(numRescueBoats([1, 1, 1, 5], 6)); //* 2
console.log(numRescueBoats([5], 5)); //* 1
console.log(numRescueBoats([3, 3, 3], 3)); //* 3
console.log(numRescueBoats([], 9)); //* 0

//* Time: O(n log n) - It takes O(n log n) to sort the people
//* Then it takes O(n) in the worst case to assign everyone to a boat

//* Space: O(n) - Sorting generally uses O(n) memory due to merge sort (but it depends on the algorithm)
