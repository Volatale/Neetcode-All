class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Preorder Traversal is as follows: N L R
//* If we are at a valid node, process it (push the value)
//* BEFORE we go left, push the right child to the stack
//* THEN go left
//* When curr is ever null, set curr = stack.pop()
//* Essentially, the stack holds all of the right children
function preorderTraversal(root) {
  if (root === null) return [];

  const results = [];
  const stack = []; //* The stack holds all of the "right" child nodes

  let curr = root;

  while (curr !== null || stack.length > 0) {
    if (curr !== null) {
      results.push(curr.val); //* N
      stack.push(curr.right);
      curr = curr.left; //* L
    } else {
      curr = stack.pop(); //* R
    }
  }

  return results;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right = new TreeNode(3);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
root2.right.left = new TreeNode(3);

const root3 = new TreeNode(10);

const root4 = new TreeNode(5);
root4.left = new TreeNode(10);
root4.left.left = new TreeNode(15);
root4.left.left.left = new TreeNode(20);
root4.left.left.left.left = new TreeNode(25);

console.log(preorderTraversal(root));
console.log(preorderTraversal(root1));
console.log(preorderTraversal(root2));
console.log(preorderTraversal(root3));
console.log(preorderTraversal(root4));
console.log(preorderTraversal(null));

//* Time: O(n) - The time taken to process every node scales with "n", where n is the number of nodes

//* Space: O(n) - The stack will hold at most "h" nodes at once, where "h" is the height of the tree
//* The results array holds every node value, so that scales with the number of nodes (n)
