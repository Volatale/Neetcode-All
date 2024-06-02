class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Use a Postorder DFS to delay pushing the ")" until needed
//* When we find a node, push "(" and the value to the string array
//* Then, check if the node has no left, but has a right child
//* If that is the case, we need to push "()" to represent the absence of the left child
//* The rest of this is a regular postorder traversal
//* Use the prev pointer to avoid getting into an infinite loop on the way back up
//* When we do go back up, we need to push ")"; this closes the parentheses
//* When we return, convert the array into a string, and remove the first and last elements
function stringFromBinaryTree(root) {
  if (root === null) return "";

  const string = [];
  const stack = [];

  let curr = root;
  let prev = null;

  //* Postorder Traversal
  while (curr !== null || stack.length > 0) {
    while (curr !== null) {
      stack.push(curr);
      string.push(`(${curr.val}`);

      //* If there is no left child, but there IS a right child
      if (!curr.left && curr.right) {
        string.push("()");
      }

      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    //* No right node, or we're going back up the tree
    if (curr.right === null || curr.right === prev) {
      stack.pop();
      string.push(")"); //* Add the closing parentheses
      prev = curr;
      curr = null;
    } else {
      curr = curr.right;
    }
  }

  //* Convert to string, remove the first and last parentheses
  return string.join("").split(1, -1);
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

//* Time: O(n) - We have to traverse to every node in the list
//* Pushing to an array is Amortized Constant Time

//* Space: O(n) - We create an array to hold all of the parentheses and node values
//* The size of that array scales with the number of nodes "n"
//* A stack is used to track the nodes so we can climb back up the tree
//* The size of this stack scales with the height of the tree
