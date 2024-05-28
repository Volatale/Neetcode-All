class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Keep track of the node we just visited (prev)
//* Travel as far left as possible
//* curr will be null at this point, so curr = stack.peek()
//* If there is no right child, or, the right child === prev
//* Then we can process the current node
//* Push curr.val to the array, and set prev = curr
//* This will prevent infinite loops when going back up the tree on the right
//* curr = null prevents the inner while loop from triggering on this node again
//* Else, there is a right child, so curr = curr.right
function postorderTraversal(root) {
  if (root === null) return [];

  const results = [];
  const stack = []; //* Lets us travel back up the tree

  let prev = null; //* Prevents infinite loops when returning from right nodes
  let curr = root;

  while (curr !== null || stack.length > 0) {
    //* Travel left all the way
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left; //* L
    }

    //* curr is null; set it to the top of the stack
    curr = stack[stack.length - 1];

    //* If there is no right child, you can't go right
    //* If curr.right = prev, we just came from that node
    if (curr.right === null || curr.right === prev) {
      results.push(curr.val); //* N
      stack.pop();
      prev = curr; //* Track the node we just came from
      curr = null; //* Prevents inner while loop from activating again for this node
    } else {
      //* Travel right once
      curr = curr.right; //*"R
    }
  }

  return results;
}

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

console.log(postorderTraversal(root1));
console.log(postorderTraversal(root2));
console.log(postorderTraversal(root3));
console.log(postorderTraversal(root4));
console.log(postorderTraversal(null));

//* Time: O(n) - We have to process every node in the tree

//* Space: O(n) - In the worst case, the tree resembles a linked list
//* The results array holds the values of all "n" nodes
//* The stack holds up to "h" nodes at once (where h is the height of the tree)
//* But "n" will always be >= h, so it dominates "h"
