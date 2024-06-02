class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a preorder DFS; the string representation is of a preorder traversal
//* Use a visited set to keep track of the nodes we have already visited
//* If we have already visited the current node, pop the stack and append a ")"
//* This signifies that we are going back up the tree, thus close the parentheses
//* Otherwise, mark the node as visited and append a "(" and the node value
//* If there is NO left child, but there IS a right child, push "()"
//* Since this is preorder, and we are using a stack
//* We should push the RIGHT child first
//* THEN, push the left child
function stringFromBinaryTree(root) {
  const stack = [root];
  const string = [];

  const visited = new Set(); //* Tracks the visited nodes

  while (stack.length > 0) {
    //* Don't immediately pop, we need to know when we should append a ")"
    const curr = stack[stack.length - 1];

    if (visited.has(curr)) {
      stack.pop();
      string.push(")"); //* Closing Parentheses
      continue;
    }

    visited.add(curr); //* Mark as visited
    string.push(`(${curr.val}`); //* Push the "(" and the value

    //* If there is no left child, but there IS a right child
    if (!curr.left && curr.right) {
      string.push("()");
    }

    //* Right needs to be processed AFTER left, so right is pushed first
    if (curr.right) {
      stack.push(curr.right);
    }

    if (curr.left) {
      stack.push(curr.left);
    }
  }

  //* There is remove the first and last parentheses
  return string.join("").slice(1, -1);
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(4);
root.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(3);

const root3 = new TreeNode(100);

const root4 = new TreeNode(10);
root4.left = new TreeNode(20);
root4.left.left = new TreeNode(30);
root4.right = new TreeNode(40);
root4.right.right = new TreeNode(50);

console.log(stringFromBinaryTree(root)); //* "1(2(4))(3)"
console.log(stringFromBinaryTree(root2)); //* "1(2()(4))(3)"
console.log(stringFromBinaryTree(root3)); //* "100"
console.log(stringFromBinaryTree(root4)); //* "10(20(30))(40()(50)"

//* Time: O(n) - The time taken scales with the size of the tree
//* We have to traverse to every node
//* Pushing to an array takes α(1)
//* It takes Θ(1) to lookup a key with the set

//* Space: O(n) - Ultimately, we create an array that scales in size with the number of nodes
//* We track each node using the visited set, so that scales with the input size
//* The string array is converted to a string literal at the end, which scales with the input size
