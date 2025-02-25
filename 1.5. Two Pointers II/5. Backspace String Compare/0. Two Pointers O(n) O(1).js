//* Since we can't use a stack anymore, we need to find another way to handle this
//* Ultimately, we want to track our progress through both strings simultaneously
//*     - So use a Two Pointer approach and do just that
//! But how do we handle the backspaces?
//*     - Iterate in reverse; this allows us to simply SKIP the element(s) on the left
//* Since there is no limitation of only having a single #, we should count how many we have
//* For BOTH strings, keep iterating left until we reach a character we CANNOT delete
//* If skipLeft or skipRight === 0, AND the current char is NOT "#"
//*     - Then we can't skip the current character
//* In that case, we need to compare the characters our pointers are located at
//* But there are edge cases to handle too:
//* The strings can have different lengths, one pointer could go out of bounds earlier than the other
//*     - Check if EITHER (exclusive or) pointer is out of bounds
//*     - If that is the case, return false; the strings are clearly not equal
//* Then, we can simply check if both characters at the current positions are equal
//*     - If they are, then fine, move onto the next
//*     - Else, return false because the strings are clearly not equal
function backspaceCompare(s, t) {
  //* Used to track the next character (going R to L)
  let left = s.length - 1;
  let right = t.length - 1;

  //* Tracks the current amount of "#" for each strin
  let skipLeft = 0;
  let skipRight = 0;

  while (left >= 0 || right >= 0) {
    //* Travel through "s" until undeletable char or -1
    while (left >= 0) {
      if (s[left] === "#") {
        //* Skip the NEXT character
        skipLeft++;
        left--;
      } else if (s[left] !== "#" && skipLeft > 0) {
        //* We need to skip the current character
        skipLeft--;
        left--;
      } else {
        break; //* Can't delete this character, so compare with t[right]
      }
    }

    //* Travel through "t" until undeletable char or -1
    while (right >= 0) {
      if (t[right] === "#") {
        //* Skip the NEXT character
        skipRight++;
        right--;
      } else if (t[right] !== "#" && skipRight > 0) {
        //* We need to skip the current character
        skipRight--;
        right--;
      } else {
        break; //* Can't delete this character, so compare with s[left]
      }
    }

    //* Now, ensure both are out of bounds, or neither are ("a#" vs "a")
    if ((left < 0 && right >= 0) || (left >= 0 && right < 0)) {
      return false;
    }

    //* Lastly, validate the equality of both current characters
    if (left >= 0 && right >= 0 && s[left] !== t[right]) return false;

    //* By this point we know these characters are equal, so just move on
    left--;
    right--;
  }

  //* Both strings are equal
  return true;
}

console.log(backspaceCompare("ab#c", "ad#c")); //* true
console.log(backspaceCompare("ab##", "c#d#")); //* true
console.log(backspaceCompare("xyz", "xy#z")); //* false
console.log(backspaceCompare("sonic", "sonic")); //* true
console.log(backspaceCompare("xywrrmp", "xywrrmu#p")); //* true

//* Time: O(n + m) - In the worst case, we iterate entirely through both inputs
//* And the inputs do not necessarily have equal length

//* Space: O(1) - The memory used does not scale with either input
