class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Serialize the tree by storing the values in an array
//* Use either Preorder or Postorder Traversal
//* This allows us to preserve the order of the tree (so deserialization is possible)
//* Inorder would put the leftmost node as the "first" in the list
//* Which makes it hard to deserialize later
//* Convert both serialized trees to strings (s and t)
//* Then, check if the substring of "t" exists in "s"
function isSubtree(root, subRoot) {
  //* Serialize the trees (convert the tree's nodes to strings)
  const s = dfs(root, []).join("");
  const t = dfs(subRoot, []).join("");

  //* Check if "subroot" exists within "root"
  return KMP(s, t);
}

function KMP(s, t) {
  if (s.length < t.length) return false;

  //* Failure Function
  const dp = new Array(t.length).fill(0);
  let j = 0;

  //* Find the the LPS (longest prefix suffix)
  for (let i = 1; i < t.length; i++) {
    while (j > 0 && s[i] !== t[j]) {
      j = dp[j - 1];
    }

    //* Successful Match
    if (s[i] === t[j]) {
      dp[i] = j + 1;
      j++;
    }
  }

  //* Reset j
  j = 0;

  //* Find the substring
  for (let i = 0; i < s.length; i++) {
    while (j > 0 && s[i] !== t[j]) {
      j = dp[j - 1];
    }

    //* Successful Match
    if (s[i] === t[j]) {
      j++;
    }

    //* "t" exists in "s"
    if (j === t.length) return true;
  }

  //* "t" does NOT exist in "s"
  return false;
}

//* Serialize the tree
function dfs(root) {
  const results = [];
  const stack = [root];

  while (stack.length > 0) {
    const curr = stack.pop();

    if (curr !== null) {
      //* Add a separator
      results.push("," + curr.val);
      //* We have to add the null nodes to the stack
      stack.push(curr.left);
      stack.push(curr.right);
    } else {
      results.push("#"); //* Marking null nodes
    }
  }

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(4);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(2);
root1.right = new TreeNode(5);

const subRoot1 = new TreeNode(4);
subRoot1.left = new TreeNode(1);
subRoot1.right = new TreeNode(2);

const root2 = new TreeNode(3);
root2.left = new TreeNode(4);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(2);
root2.left.right.left = new TreeNode(0);
root2.right = new TreeNode(5);

const subRoot2 = new TreeNode(4);
subRoot2.left = new TreeNode(1);
subRoot2.right = new TreeNode(2);

const root3 = new TreeNode(12);
const subRoot3 = new TreeNode(1);

const root4 = new TreeNode(1);
root4.left = new TreeNode(2);
root4.right = new TreeNode(3);

const subRoot4 = new TreeNode(1);
subRoot4.left = new TreeNode(2);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);

const subRoot5 = new TreeNode(1);
subRoot5.left = new TreeNode(2);

console.log(isSubtree(root1, subRoot1)); //* True
console.log(isSubtree(root2, subRoot2)); //* False
console.log(isSubtree(root3, subRoot3)); //* False
console.log(isSubtree(root4, subRoot4)); //* False
console.log(isSubtree(root5, subRoot5)); //* True

//* Time: O(n + m) - We have to perform a preorder traversal on both trees
//* Since the size of both trees can be different, that is n + m
//* Then, it takes O(n + m) to convert both arrays into strings
//* Finally, KMP itself takes O(n + m) to complete

//* Space: O(n + m) - It takes O(n + m) space to serialize both trees
//* We have a different string array for each input O(n) + O(m)
//* Then, we convert both arrays into strings, which is O(n) + O(m) in total
//* Finally, the failure function of KMP is O(m) itself
