//* Ultimately, we need to check if two strings are equal after processing them
//* Specifically, the `#` character indicates a backspace
//!     - Backspacing an empty string does not do anything (it is still an empty string)
//* Since a backsace removes the most recent character, that hints toward the use of a stack
//* Stacks allow us to process elements in LIFO order
//*     - We want to delete the MOST RECENT character (which will be on top of the stack)
//* We can track the progress through the strings using two pointers
//*     - The input strings are not guaranteed to be of equal length
function backspaceCompare(s, t) {
  //* Build both strings over time
  const sStack = [];
  const tStack = [];

  //* Two pointers used to track progress through `s` and `t`
  let left = 0;
  let right = 0;

  while (left < s.length && right < t.length) {
    //* Handle s' next character
    if (left < s.length) {
      s[left] !== "#" ? sStack.push(s[left]) : sStack.pop();
      left++;
    }

    if (right < t.length) {
      t[right] !== "#" ? tStack.push(t[right]) : tStack.pop();
      right++;
    }
  }

  //* Handle the remaining characters in either string
  while (left < s.length) {
    s[left] !== "#" ? sStack.push(s[left]) : sStack.pop();
    left++;
  }

  while (right < t.length) {
    t[right] !== "#" ? tStack.push(t[right]) : tStack.pop();
    right++;
  }

  //* Compare the strings after they have been completely processed
  return sStack.join("") === tStack.join("");
}

console.log(backspaceCompare("ab#c", "ad#c")); //* True
console.log(backspaceCompare("ab##", "c#d#")); //* True
console.log(backspaceCompare("xyz", "xy#z")); //* False
console.log(backspaceCompare("sonic", "sonic")); //* True
console.log(backspaceCompare("xywrrmp", "xywrrmu#p")); //* True

//* Time: O(n + m) - Where `n` is s.length and `m` is t.length
//* Ultimately, we need to iterate through both inputs entirely

//* Space: O(n + m) - The memory usage scales with the length of both strings combined
