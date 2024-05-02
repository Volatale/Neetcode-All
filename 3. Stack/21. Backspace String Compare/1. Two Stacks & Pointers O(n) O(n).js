//* Use Two Stacks - one for each input
//* The two pointers let us track the progress through each input
//* We are essentially performing merge logic from merge sort
//* If you encounter a "#", pop the top element
//* Otherwise, push the element to the stack
//* We attempt to do most of the work in the first loop
function backspaceStringCompare(s, t) {
  //* String Builder
  const stack1 = [];
  const stack2 = [];

  //* Two Pointers - Similar to Merge Logic
  let left = 0;
  let right = 0;

  //* Iterate through both strings at once
  while (left < s.length && right < t.length) {
    if (left < s.length) {
      if (s[left] !== "#") {
        stack1.push(s[left]);
      } else {
        stack1.pop();
      }

      left++;
    }

    if (right < t.length) {
      if (t[right] !== "#") {
        stack2.push(t[right]);
      } else {
        stack2.pop();
      }

      right++;
    }
  }

  //* Pick up the remaining elements if lengths are NOT the same
  while (left < s.length) {
    if (s[left] !== "#") {
      stack1.push(s[left]);
    } else {
      stack1.pop();
    }

    left++;
  }

  while (right < t.length) {
    if (t[right] !== "#") {
      stack2.push(t[right]);
    } else {
      stack2.pop();
    }

    right++;
  }

  //* Convert both arrays into strings and compare them
  return stack1.join("") === stack2.join("");
}

console.log(backspaceStringCompare("ab#c", "ad#c")); //* True
console.log(backspaceStringCompare("ab##", "c#d#")); //* True
console.log(backspaceStringCompare("a#c", "b")); //* False

//* Time: O(max(s.length, t.length)) -
//* We do most of the work in one loop
//* The leftover work is done in a separate loop

//* Space: O(s + t) - In the worst case, we have to push every element in both strings
//* Take this example: ["s", "o", "n", "i", "c"] -> "sonic"
//* There were no "#", so the space complexity grows with input size
//* We have two different inputs that can have varying lengths
