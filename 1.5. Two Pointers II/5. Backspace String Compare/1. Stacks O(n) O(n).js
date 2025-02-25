//* Since we need to remove the most recent character for a "#"
//* We should use stacks, this allows us to simulate backspaces via a pop()
//* If the current character is NOT a "#", then just push it to the corresponding stack
//* At the end, join both arrays at the end and compare their equality
function backspaceCompare(s, t) {
  //* Build both strings over time
  const sString = [];
  const tString = [];

  //* Two pointers to track progress through s and t
  let left = 0;
  let right = 0;

  while (left < s.length && right < t.length) {
    //* Handle s's next character
    if (left < s.length) {
      s[left] !== "#" ? sString.push(s[left]) : sString.pop();
      left++;
    }

    //* Handle t's next character
    if (right < t.length) {
      t[right] !== "#" ? tString.push(t[right]) : tString.pop();
      right++;
    }
  }

  //* Pickup the remaining characters in s
  while (left < s.length) {
    s[left] !== "#" ? sString.push(s[left]) : sString.pop();
    left++;
  }

  //* Pickup the remaining characters in t
  while (right < t.length) {
    t[right] !== "#" ? tString.push(t[right]) : tString.pop();
    right++;
  }

  //* Check if both strings are equal
  return sString.join("") === tString.join("");
}

console.log(backspaceCompare("ab#c", "ad#c")); //* true
console.log(backspaceCompare("ab##", "c#d#")); //* true
console.log(backspaceCompare("xyz", "xy#z")); //* false
console.log(backspaceCompare("sonic", "sonic")); //* true
console.log(backspaceCompare("xywrrmp", "xywrrmu#p")); //* true

//* Time: O(n + m) - In the worst case, we iterate entirely through both inputs
//* And the inputs do not necessarily have equal length

//* Space: O(max(n, m)) - Where "n" and "m" are s.length and t.length respectively
//* The maximum space used scales with the longest of the two inputs
