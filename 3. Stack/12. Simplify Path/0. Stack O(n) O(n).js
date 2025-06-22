//* We are given an absolute path for a Unix-style file system
//* The goal is to transform it to its simplified canonical path
//* Rules:
//*     - A single "." represents the current directory
//*     - A double ".." represents the previous/parent directory
//*     - "//", "///", "////" etc are all treated as a single "/"
//*     - Any sequence of periods that is NOT "." or ".." is treated as the NAME of the file/directory
//* Path Rules:
//*     - The path must start with "/"
//*     - Directories within the path are separated by one "/"
//*     - Path must not END with "/" unless it is the root directory
//*     - Path must not have any single / double periods used to denote current or parent directories
//*         - The canonical path should have already dealt with all of these occurrences
//! Since we can only go up or down directories, we are processing everything in LIFO order
//* LIFO processing means we should use a stack data structure
//*     - If we encounter a "..", we should pop the stack - we go back up one dir
//* To simplify the process, we can "split" the array via "/"
//* Then, at the very end, we should "join" the array via "/"
//* The only symbols that need to be handled are "." and ".."
//*     - Everything else gets pushed to the stack (becomes part of the canonical path)
function simplifyPath(path) {
  const string = path.split("/"); //* Get all of the individual symbols
  const canonical = []; //* Stores the canonical path

  for (let symbol of string) {
    if (symbol === ".." && canonical.length > 0) {
      canonical.pop();
    } else if (symbol !== "." && symbol !== "" && symbol !== "..") {
      canonical.push(symbol);
    }
  }

  //* Add the prefix "/" and separate all of the directories
  return "/" + canonical.join("/");
}

console.log(simplifyPath("/home/"));
console.log(simplifyPath("/home//foo/"));
console.log(simplifyPath("/home/user/Documents/../Pictures"));
console.log(simplifyPath("/../"));
console.log(simplifyPath("/.../a/../b/c/../d/./"));
console.log(simplifyPath("/../"));

//* Time: O(n) - The time taken scales with the input size

//* Space: O(n) - In the worst case, the stac's size is equivalent to the input size
