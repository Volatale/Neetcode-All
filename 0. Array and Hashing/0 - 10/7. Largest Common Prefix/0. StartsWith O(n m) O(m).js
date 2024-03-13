//* Grab the first word in the input (pre)
//* For each word, check if strs[i] starts with whatever you grabbed originally
//* If it DOESN'T, knock off the last character in "pre"
//* Keep doing this and eventually you end up with pre === ""
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";

  let pre = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(pre)) {
      pre = pre.slice(0, -1);
    }
  }

  return pre;
}

console.log(longestCommonPrefix(["sonic", "sonia", "solar"])); // "so"
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log(longestCommonPrefix(["a", "a", "a"])); // a
console.log(longestCommonPrefix(["woo", "woom", "woof"])); // woo

//* Time - O(n * m)
//* It takes O(n) to loop through each word in the input
//* Then the inner loop itself can happen "m" times

//* Space - O(m) - We create a new string (temporarily) since strings in JS are immutable by nature
//! If this were a language like C++, we could overwrite the strings in place
