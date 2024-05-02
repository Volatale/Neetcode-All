//* Use two stacks - one for each string
//* If you encounter a "#", we pop the most recently added element
//* Push anything else
//* At the end, convert both to strings and compare them
//* This is why we use an array instead of an actual stack
function backspaceStringCompare(s, t) {
  //* String Builders, similar to Java instead of a stack
  const stack1 = [];
  const stack2 = [];

  //* Add elements from s
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "#") {
      stack1.push(s[i]);
    } else {
      stack1.pop();
    }
  }

  //* Add elements from t
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== "#") {
      stack2.push(t[i]);
    } else {
      stack2.pop();
    }
  }

  //* Convert both to strings and compare them
  return stack1.join("") === stack2.join("");
}

console.log(backspaceStringCompare("ab#c", "ad#c")); //* True
console.log(backspaceStringCompare("ab##", "c#d#")); //* True
console.log(backspaceStringCompare("a#c", "b")); //* False

//* Time: O(s + t) - It takes O(s + t) time to iterate through both strings
//* And then we have to convert both arrays into strings
//* So O(2s + 2t) simplifies to O(s + t)

//* Space: O(s + t) - In the worst case, we have to push every element in both strings
//* Take this example: ["s", "o", "n", "i", "c"] -> "sonic"
//* There were no "#", so the space complexity grows with input size
//* We have two different inputs that can have varying lengths
