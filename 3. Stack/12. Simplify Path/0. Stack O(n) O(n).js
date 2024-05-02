//* Use a stack to track our canonical path
//* A canonical path is the path you ACTUALLY take
//* So "/home/documents/.." results in "/home"
//* Split the input via "/" so its easier to work with
//* If you encounter a ".." pop the last thing in the stack
//* Ignore ".", ".." and ""
//* Push everything else to the stack
function simplifyPath(path) {
  //* The stack tracks our canonical path
  const stack = [];

  //* Remove the "/", we'll add them back later
  const p = path.split("/");

  for (let i = 0; i < p.length; i++) {
    if (stack.length > 0 && p[i] === "..") {
      stack.pop(); //* We aren't ACTUALLY visiting the previous directory, so remove it
    } else if (p[i] !== "." && p[i] !== "" && p[i] !== "..") {
      stack.push(p[i]); //* Its a word, so just push it
    }
  }

  //* Canonical path STARTS with a "/", AND add back the "/" we lost earlier
  return "/" + stack.join("/");
}

console.log(simplifyPath("/home/"));
console.log(simplifyPath("/home//foo/"));
console.log(simplifyPath("/home/user/Documents/../Pictures"));
console.log(simplifyPath("/../"));
console.log(simplifyPath("/.../a/../b/c/../d/./"));

//* Time: O(n) - It takes O(n) time to generate the the split array
//* Then, we do another O(n) iteration through the split array
//* Lastly, it takes O(n) in the worst case to join the "stack"

//* Space: O(n) - The split array can potentially scale linearly with the input
//* The rebuilt string may have an idential length to the input
//* Either way, the space usage scales with the input size
