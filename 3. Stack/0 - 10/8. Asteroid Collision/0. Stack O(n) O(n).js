//* We need to be able to access the most recently added asteroid
//* So we use a stack to check the state
//* We are essentially using a monotonic-stack-like logic to solve the problem
//* If the asteroid is going right, we don't worry about collisions
//* Else, it is going left, so we need to ensure that the collisions are handled
//* While the current | asteroid | > top of stack, and you KNOW the top of stack is going right (> 0)
//* Pop the top element
//* Then, if the stack is empty we have no collisions to worry about
//* And if the top element is going left, we already know THIS asteroid is going left too, so no collision there either
//* Lastly, check if the asteroids are equal, in which case just pop the stack and don't add the current asteroid
function asteroidCollision(asteroids) {
  //* Stores the asteroids in motion
  const stack = [];

  for (let i = 0; i < asteroids.length; i++) {
    //* Any asteroid already on stack moving left will NEVER collide with NEW asteroids going right
    if (stack.length === 0 || asteroids[i] > 0) {
      stack.push(asteroids[i]);
    } else {
      //* Handle Collisions
      while (
        stack.length > 0 &&
        stack[stack.length - 1] > 0 && //* Top moving right, we know the CURRENT is moving left, so potential collision
        stack[stack.length - 1] < Math.abs(asteroids[i]) //* Top smaller than current asteroid
      ) {
        stack.pop();
      }

      if (stack.length === 0 || stack[stack.length - 1] < 0) {
        stack.push(asteroids[i]); //* Top is going left, and so is current, so no clash
      } else if (Math.abs(stack[stack.length - 1]) === Math.abs(asteroids[i])) {
        stack.pop(); //* They are equal, so pop the top, and don't add the current
      }
    }
  }

  return stack;
}

console.log(asteroidCollision([5, 10, -5])); //* [5, 10]
console.log(asteroidCollision([8, -8])); //* []
console.log(asteroidCollision([10, 2, -5])); //* [10] -> -5 broke 2, then 10 broke -5
console.log(asteroidCollision([10, 20, 30])); //* [10, 20, 30]

//* Time: O(n) - The time taken scales with the input size
//* At most, we process each element twice, so that would be O(2n) -> O(n)

//* Space: O(n) - In the worst case, every element travels the same direction
//* So the stack has the same length as the input
//* [10, 20, 30] -> [10, 20, 30]
