//* We are given an asteroid[], where `i` indicates the relative position of the ith asteroid
//*     - asteroid[i] represents the the `size` of the ith asteroid (take the absolute value)
//* If an asteroid's value is "negative", it means it is travelling left, otherwise it travels right
//* Additionally, all of the asteroids move at the same speed
//*     - So it doesn't really matter if we process left-to-right or right-to-left
//* We need to determine the state of the asteroids after all collisions have occurred
//* Notes:
//*     - If two asteroids collide, the SMALLER one will explode/
//*     - If both are the same size, both will explode
//*     - Two asteroids moving in a different direction will never meet
//! Take this example: [10, 2, -5]
//*     - 10 and 2 are moving right, and -5 is moving left
//*     - 2 is closer in proximity to -5 than 10, so process that first
//*         - 5 > 2, so 2 is destroyed
//*     - Then, 10 collides with -5, and 10 > 5, so only 10 is left
//! Since only opposing asteroids can collide, we need to process them in LIFO order
//* We can use a stack to hold asteroids traveling right
//* Then, if we encounter a left-travelling asteroid, it'll collide with whatever the current element is
//*     - While asteroid[i] > stack[stack.length - 1], pop the stack
//* Any left-travelling asteroid that does not collide should be added to the stack
function asteroidCollision(asteroids) {
  //* Holds the asteroids travelling toward the right
  const stack = [];

  for (let asteroid of asteroids) {
    let destroyed = false;

    //* The top asteroid will collide with the current one
    while (stack.length > 0 && stack[stack.length - 1] > 0 && asteroid < 0) {
      const top = stack[stack.length - 1];

      if (top < -asteroid) {
        stack.pop(); //* Top asteroid is destroyed
      } else if (top === -asteroid) {
        stack.pop(); //* Both are destroyed
        destroyed = true;
        break;
      } else {
        destroyed = true; //* Left asteroid is destroyed
        break;
      }
    }

    //* The left-travelling asteroid was not destroyed, add it to the stack
    if (!destroyed) {
      stack.push(asteroid);
    }
  }

  return stack;
}

debugger;
console.log(asteroidCollision([5, 10, -5])); //* [5, 10]
console.log(asteroidCollision([8, -8])); //* []
console.log(asteroidCollision([10, 2, -5])); //* [10] -> -5 broke 2, then 10 broke -5
console.log(asteroidCollision([10, 20, 30])); //* [10, 20, 30]
console.log(asteroidCollision([10, 5, -3, 6, -7])); //* [10]
console.log(asteroidCollision([1, 2, 3, -5, 5, -5, 5])); //* [-5, 5]

//* Time: O(n) - We process each element at most twice, so the time complexity is linear

//* Space: O(n) - The stack's size scales with the size of the input, in the worst case
