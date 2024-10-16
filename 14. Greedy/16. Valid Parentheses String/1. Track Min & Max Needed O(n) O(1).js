//* Technically each "*" introduces three variants to the string
//* "(*)" could be any of the following, for example
//*     - "()" - treated as ""
//*     - "(()" - treated as "("
//*     - "())" - treated as ")"
//* If were to try EVERY possibility at each step
//*     - It would either require lots of if statements to c
//*     - Or it would require a REAL brute force approach
//*     - As in, recursively trying each possibility
//*         - The time complexity could end up being O(3^n)
//*         - There are 3 possibilities at each step
//*         - Imagine a scenario where every character is "*"
//* Track the MINIMUM and MAXIMUM number of "(" we still have yet to find a match for
//* Or, think of it as the MINIMUM and MAXIMUM number of closers needed
//*     - cMin will treat every "*" as ")" or ""
//*         - Why ""? Because if "**", we can't treat the "*" as a ")"
//*     - cMax will treat every "*" as "("
//* If char is "("
//*     - BOTH counters INCREASE - we found a ")", so we now need one more "("
//* If char is ")"
//*     - BOTH counters DECREASE - we found a "(", so now we need less ")"
//!     - We cannot need less than 0 of either
//!         - if cMin - 1 would be LESS than 0, we treat the "*" as a ""
//*         - Treating it as a ")" here would result in an incorrect answer
//!     - If cMax < 0, return false
//*         - The same logic applies to cMax, how can we require -1 closers?
//* If at the end, cMin === 0
//*     - It means the MINIMUM number of closers needed is 0
//*     - Thus we can implicitly say that the input is valid
function checkValidString(s) {
  let cMax = 0; //* Max no. of ")" needed - Assumes every * is "("
  let cMin = 0; //* Min no. of ")" needed - Assumes every * is ")" or ""

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      cMax++;
      cMin++;
    } else if (s[i] === ")") {
      cMax--;
      cMin = Math.max(cMin - 1, 0); //* We can't need -1 ")", so treat "*" as ""
    } else {
      cMax++; //* cMax treats "*" as "("
      cMin = Math.max(cMin - 1, 0); //* cMin treats "*" as ")" or ""
    }

    //* We can't need -1 ")", so return false
    if (cMax < 0) return false;
  }

  //* If the MINIMUM number of ")" needed is 0, the input is valid
  return cMin === 0;
}

console.log(checkValidString("()")); //* True
console.log(checkValidString("(*)")); //* True
console.log(checkValidString("(*))")); //* True
console.log(checkValidString("****")); //* True
console.log(checkValidString(")(")); //* False
console.log(checkValidString("()(()*")); //* True
console.log(checkValidString("()*(")); //* False

//* Time: O(n) - We iterate through the entire string which takes O(n)
//* All of the other operations take constant time

//* Space: O(1) - We are only using constant space variables
//* So the space usage does not scale with input size
