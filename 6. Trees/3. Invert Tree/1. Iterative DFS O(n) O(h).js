class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* To invert a tree, we have to swap the left and right children
//* Do this for every node we find until completion
function invertTree(root) {
  if (root === null) return root;

  //* A Stack for DFS
  const stack = [root];

  while (stack.length > 0) {
    const curr = stack.pop();

    //* Swap the left and right children
    const temp = curr.left;
    curr.left = curr.right;
    curr.right = temp;

    //* Do the same thing for the left and right children (if they exist)
    if (curr.left) stack.push(curr.left);
    if (curr.right) stack.push(curr.right);
  }

  return root;
}

const root = new TreeNode(4);
root.left = new TreeNode(7);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(2);
root.right = new TreeNode(2);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(5);

const root2 = new TreeNode(5);
root2.left = new TreeNode(10);
root2.right = new TreeNode(15);

const root3 = new TreeNode(5);

const root4 = new TreeNode(2);
root4.left = new TreeNode(1);
root4.right = new TreeNode(3);

const root5 = new TreeNode(4);
root5.left = new TreeNode(2);
root5.left.left = new TreeNode(1);
root5.left.right = new TreeNode(3);
root5.right = new TreeNode(7);
root5.right.left = new TreeNode(6);
root5.right.right = new TreeNode(9);

const root6 = new TreeNode(1);

console.log(invertTree(root));
console.log(invertTree(root2));
console.log(invertTree(root3));
console.log(invertTree(root4));
console.log(invertTree(root5));
console.log(invertTree(null));

//* Time: O(n) - We have to process every node eventually
//* So the time taken scales with the number of nodes we have

//* Space: O(h) - The space usage scales with the height of the tree
//* If the tree is balanced, the stack space usage is O(log n)
