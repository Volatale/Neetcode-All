class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Perform a REVERSE Inorder Traveral
//* Binary Search Trees are sorted left to right
//* We want the largest values to be on the LEFT now
//* Which means the smallest values will be on the RIGHT
//* So do an inorder traversal in reverse (RNL instead of LNR)
//* Track the previous value
function convertBSTToGreaterTree(root) {
  const stack = [];

  let curr = root;
  let prev = null;

  while (curr !== null || stack.length > 0) {
    //* Travel as far right as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.right;
    }

    curr = stack.pop(); //* Process the node

    //* Calculate the new value
    if (prev !== null) {
      curr.val += prev.val;
    }

    prev = curr;
    curr = curr.left; //* Travel left
  }

  return root;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(0);
root1.right = new TreeNode(2);

const root2 = new TreeNode(4);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(3);
root2.right = new TreeNode(6);
root2.right.left = new TreeNode(5);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(5);

console.log(convertBSTToGreaterTree(root1));
console.log(convertBSTToGreaterTree(root2));
console.log(convertBSTToGreaterTree(root3));

//* Time: O(n) - We have to process every node in the tree
//* So the time taken scales with "n"
//* It takes amortized constant time to push to an array

//* Space: O(h) - The stack size scales with the height of the tree
//* If the tree is balanced, this is limited to O(log n)
//* When the tree resembles a linked list that is "n", but h <= n
