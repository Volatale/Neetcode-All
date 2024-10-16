//* Since we are given two arrays that represent each car's stats
//*     - We should combine those stats into a single array
//* Logically speaking, the furthest cars are LESS likely (or won't) catch up
//*     - So we should SORT the cars based on their position
//* We should iterate BACKWARDS through the cars
//*     - The car furthest to the right won't ever have its speed limited
//* To find our which cars will form a fleet
//*     - Get the distance we STILL need to travel for the current car
//*     - Then, divide that by the speed
//*         - (target - position) / speed = How many seconds need to pass to reach target
//* Use a monotonic stack to track the previous results
//*     - If the current is less than or equal to the top of the stack
//*     - It means the current car will catch up to the car in front BEFORE or AT the target
//! The stack tracks the number of car fleets
//*     - Every element in the stack represents a DIFFERENT car fleet
//* Pop the top of the stack when we find a car part of THIS fleet
//*     - There is no longer any point in keeping that car in the stack
//*     - We already know that the current car caught up and is now part of the fleet
//*         - Both the previous car AND this car now travel at the same speed
//*         - So either way, if the NEXT car catches up, it'll still be part of this same fleet
//*     - Remember, the stack tracks DIFFERENT car fleets
//*         - So we are trying to see if the NEXT car after this one is part of this fleet too
function carFleet(target, position, speed) {
  //* Sort in reverse (cars in front have a CONSTANT speed)
  const cars = position
    .map((val, i) => [position[i], speed[i]])
    .sort((a, b) => b[0] - a[0]);

  const stack = []; //* Number of car fleets

  //* Iterate through cars starting with highest position backwards
  for (const [pos, spe] of cars) {
    //* target - pos = distance away from target
    //* / speed = how many seconds it takes to reach target
    stack.push((target - pos) / spe);

    if (
      stack.length >= 2 &&
      stack[stack.length - 1] <= stack[stack.length - 2]
    ) {
      stack.pop(); //* Decrease number of car fleets
    }
  }

  //* Stack.length gives us the number of car fleets
  return stack.length;
}

console.log(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])); //* 3
console.log(carFleet(10, [3], [3])); //* 1
console.log(carFleet(100, [0, 2, 4], [4, 2, 1])); //* 1
console.log(carFleet(10, [3, 5, 7], [3, 2, 1])); //* 1

//* Time: O(n log n) - It takes O(n log n) to sort all of the cars in descending order
//* Before sorting, it takes O(n) to map over the cars and create the new array
//* Finally, it takes O(n) to iterate over every car

//* Space: O(n) - The space used by sorting is generally O(n)
//* We use O(n) space to create the new array(s) of car stats
//* And the stack itself can also use O(n) space in the worst case
