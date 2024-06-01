class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function stringFromBinaryTree(root) {
  //* Pushing to an array and converting later is more performant
  const string = [];

  preorderTraversal(root, string);
  return string.join("");
}

function preorderTraversal(curr, string) {
  if (curr === null) return;

  string.push(curr.val); //* N

  if (curr.left) {
    string.push("(");
    preorderTraversal(curr.left, string); //* L
    string.push(")");
  }

  if (curr.right) {
    //* Has right child but no left; () must go BEFORE right child
    if (curr.left === null) string.push("()");

    string.push("(");
    preorderTraversal(curr.right, string); //* R
    string.push(")");
  }
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

//* Space: O(n) - We create an array that holds every node value
//* The depth of the call stack scales with the height of the tree
