//* Ultimately, we need to check if two strings are equal after processing them
//* Specifically, the `#` character indicates a backspace
//!     - Backspacing an empty string does not do anything (it is still an empty string)
//* We only ever have to "backspace" the MOST RECENT character
//* However, instead of using stacks, we could simply iterate in reverse order
//! If we ever encounter a `#`, we simply skip this character and the next
//*     - Why the next character too? Because we never compare `#`
//*     - A backspace is essentially us sayinh "skip this character in the equality comparison"
//* Then, we can simply compare both characters simultaneously
//*     - If they are NOT equal, then we know the strings will never be equal
//*     - If they are, then we simply continue processing the strings
//! However, there are edgecases that need to be handled
//* The strings are not guaranteed to be of equal length
//*     - So we should check if EITHER pointer is out of bounds
//*     - If that is the case, return false (they are clearly not equal)
//* We are also not guaranteed that there'll be a single "#" in a row
//*     - So we should keep track of how many skips need to happen
function backspaceCompare(s, t) {
  //* Two pointers used to compare characters
  let left = s.length - 1;
  let right = t.length - 1;

  //* Track the current number of "#" that need to be handled per string
  let count1 = 0;
  let count2 = 0;

  while (left >= 0 || right >= 0) {
    //* Travel through "s" until we find an undeletable character (or oob)
    while (left >= 0) {
      if (s[left] === "#") {
        count1++; //* We need to skip next character
        left--;
      } else if (count1 > 0) {
        count1--;
        left--;
      } else {
        break; //* Can't delete this character; compare it
      }
    }

    //* Do the same for "t"
    while (right >= 0) {
      if (t[right] === "#") {
        count2++;
        right--;
      } else if (count2 > 0) {
        count2--;
        right--;
      } else {
        break;
      }
    }

    //! Ensure that neither are out of bounds, or that BOTH are
    if ((left < 0 && right >= 0) || (left >= 0 && right < 0)) {
      return false;
    }

    //* Validate the equality of both characters
    if (left >= 0 && right >= 0 && s[left] !== t[right]) {
      return false;
    }

    left--;
    right--;
  }

  //* Both strings are equal
  return true;
}

console.log(backspaceCompare("ab#c", "ad#c")); //* True
console.log(backspaceCompare("ab##", "c#d#")); //* True
console.log(backspaceCompare("xyz", "xy#z")); //* False
console.log(backspaceCompare("sonic", "sonic")); //* True
console.log(backspaceCompare("xywrrmp", "xywrrmu#p")); //* True
console.log(backspaceCompare("ab", "abcd##")); //* True

//* Time: O(n) - Where `n` is the length of the largest of the two strings

//* Space: O(1) - The memory usage remains constant regardless of input size
