//* Instead of sorting, we can group people based on the frequency of each weight
//* The indices themselves represent the weight
//* weight[i] represents the number of people who have the same weight
//* We still use two pointers since we want to pair the lightest with the heaviest people
//*     - Ensure that both pointers are pointing to an index that actually has a frequency > 0
//* If left > right, everybody has been sent on a boat
//* Counting sort works because indices are monotonically increasing (or decreasing) by nature
//*     - So this allows us to avoid explicitly sorting the array
//* people[i] <= limit, so we don't have to worry about any calculations
//* Instead of people[left] + people[right]
//*     - We do left + right, since the indices represent the WEIGHT VALUE
//* Every time we "send" somebody, we decrement the number of people that have that weight
function numRescueBoats(people, limit) {
  //* Limit is always >= people[i], so there is ALWAYS a solution
  if (people.length <= 1) return people.length;

  //* Find the largest weight (so we can have an upper bound on the weight ranges)
  //* "i" = weight value, weight[i] = frequency of people with this weight
  const maxWeight = people.reduce((max, weight) => Math.max(max, weight), 0);
  const weight = new Array(maxWeight + 1).fill(0);

  for (let i = 0; i < people.length; i++) {
    weight[people[i]]++;
  }

  //* Two Pointers - we want to try to fit the smaller with the larger weights
  let left = 0;
  let right = weight.length - 1;

  let boats = 0;

  while (left <= right) {
    //* Ensure both pointers are looking at a weight with freq > 0
    while (left <= right && weight[left] <= 0) left++;
    while (left <= right && weight[right] <= 0) right--;

    //* There are no more people to put on a boat
    if (left > right) break;

    //* Try to fit smaller weight with larger weight (not the other way around)
    if (left + right <= limit) {
      weight[left]--; //* One less person to ship that has a weight of "left"
    }

    weight[right]--; //* We ALWAYS send the heavier person
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
console.log(numRescueBoats([4, 4, 4], 4)); //* 3

//* Time: O(n) - It takes O(n) to find the maximum weight in people[]
//* Building the weights array takes O(maxWeight), and populating that array takes O(n)
//* Finally we iterate over the weights array and in the worst case perform "n" iterations

//* Space: O(n) - The weights array scales with the maximum weight in the people array
