//* Each number can only be 3 length at most
//* So every call to backtrack will do 3 iterations worth of work
//* Get the substring from start to i + 1
//*     - Start remains static while i will increment
//*     - So every iteration (of the same stack frame), the substring gets larger
//*     - Therefore we get to try every possible combination of numbers
//* Numbers have to be <= 255 and cannot have leading zeroes
function restoreIPAddresses(s) {
  //* 4 numbers each with 3 digits = 12 numbers total
  //* Having more than 12 characters means it cannot be a valid IP
  if (s.length > 12) return [];

  const results = [];
  backtrack(0, "", 0, s, results);
  return results;
}

function backtrack(start, curr, dots, s, results) {
  if (dots > 4) return; //* Added too many dots, cannot possibly be valid IP
  if (dots === 4 && start === s.length) {
    results.push(curr.slice(0, -1)); //* Remove the final dot (IPs only have 3)
    return;
  }

  //* There are 3 branches at each step of recursion
  //* So we want to do 3 iterations, but not if that would make us go out of bounds
  //* Either iterate 3 times, or until s.length (whichever comes first)
  for (let i = start; i < start + 3 && i < s.length; i++) {
    const ss = s.substring(start, i + 1);

    //* Numbers have to be <= 255 && cannot have leading zeroes
    if (parseInt(ss) > 255 || (ss.length > 1 && ss[0] === "0")) continue;

    //* i + 1 because we can't reuse indices, curr + ss + "." and dots + 1
    backtrack(i + 1, curr + ss + ".", dots + 1, s, results);
  }
}

console.log(restoreIPAddresses("10120"));
console.log(restoreIPAddresses("12341234"));
console.log(restoreIPAddresses("25525511135"));

//* Time: O(3^4) - Each call can lead to 3 more calls
//* So the branching factor of the recursion is 3
//* The depth of the recursion is 4 (+ 1) because we can only have 4 dots max

//* Space: O(C(n,k)) - An IP string has a length of 15 at most
//* There can only be C(n,k) valid combinations
//* In this case, we know the "k" is 4
//* So the results array scales at a rate of O(C(n,k))
//* The depth of the recursion is O(4) (a constant)
