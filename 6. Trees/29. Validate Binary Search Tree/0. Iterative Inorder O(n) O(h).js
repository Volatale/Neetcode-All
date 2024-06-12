class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use Inorder Traversal, this gives us the nodes in order
//* Essentially, we want to ensure that each node is > its previous
//* Additionally, Binary Search Trees should not have duplicate values
//* That means if the value is LESS THAN OR EQUAL TO prev, return false
function isValidBST(root) {
  const stack = [];
  let curr = root;
  let prev = null;

  while (curr !== null || stack.length > 0) {
    //* Go left as far as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();

    //* Check if the current node <= prev
    if (prev !== null && curr.val <= prev.val) return false;

    //* If curr.val <= prev on the right node, return false (not in order)
    prev = curr;
    curr = curr.right;
  }

  return true;
}

const root1 = new TreeNode(2);
root1.left = new TreeNode(1);
root1.right = new TreeNode(3);

const root2 = new TreeNode(5);
root2.left = new TreeNode(1);
root2.right = new TreeNode(4);
root2.right.left = new TreeNode(3);
root2.right.right = new TreeNode(6);

const root3 = new TreeNode(100);
root3.left = new TreeNode(150);
root3.right = new TreeNode(200);

const root4 = new TreeNode(2);
root4.left = new TreeNode(1);
root4.right = new TreeNode(3);
root4.right.right = new TreeNode(6);
root4.right.right.left = new TreeNode(5);
root4.right.right.right = new TreeNode(7);

console.log(isValidBST(root1)); //* True
console.log(isValidBST(root2)); //* False
console.log(isValidBST(root3)); //* False
console.log(isValidBST(root4)); //* True

//* Time: O(n) - It takes O(n) time since we need to traverse to every node
//* Checking for the validity of a node is O(1)

//* Space: O(h) - The stack size scales with the height of the tree
//* If the tree is balanced, the stack is limited to O(log n) size
