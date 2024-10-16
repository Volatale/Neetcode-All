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
  const cMin = [];
  const cMax = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      cMax.push("(");
      cMin.push("(");
    } else if (s[i] === ")") {
      //* We can't need -1 ")", invalid string
      if (cMax.length === 0) return false;

      cMax.pop();
      cMin.pop(); //* If pop !== undefined, treat as ")", else ""
    } else {
      cMax.push("("); //* Treat as "("
      cMin.pop(); //* If pop !== undefined, treat as ")", else ""
    }
  }

  //* If the MINIMUM number of ")" needed is 0, the input is valid
  return cMin.length === 0;
}

console.log(checkValidString("()")); //* True
console.log(checkValidString("(*)")); //* True
console.log(checkValidString("(*))")); //* True
console.log(checkValidString("****")); //* True
console.log(checkValidString(")(")); //* False
console.log(checkValidString("()(()*")); //* True
console.log(checkValidString("()*(")); //* False

//* Time: O(n) - We iterate through the entire string, which takes O(n)
//* Every other operation takes constant time

//* Space: O(n) - If we had something like "((((", both arrays would be 4 length
//* So the space usage can scale proportionally with the input size in the worst case
