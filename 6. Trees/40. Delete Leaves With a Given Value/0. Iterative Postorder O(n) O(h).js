class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* We need a way to track the parents of nodes
//* Use a map to track the nodes and their parents
//* Upon finding a node, set the left & right children's parents to curr
//* When processing nodes, check if the node is both a leaf and a "target" node
//* If it is, get the reference to the PARENT of this node from the parentMap
//* If the node's parent is null, "curr" is the "root" node; return null
//* Otherwise, we don't know whether "curr" is the left or right child
//* So check if parentNode.left === curr, if it does, parentNode.left = null
//* Else, its the right child, so parentNode.right = null
function removeLeafNodes(root, target) {
  if (root === null) return root;

  const stack = [];

  //* Stores the parent of each node (root has no parent)
  const parentMap = new Map([[root, null]]);

  let curr = root;
  let prev = null;

  while (curr !== null || stack.length > 0) {
    //* Go left as far as possible
    while (curr !== null) {
      stack.push(curr);
      if (curr.left !== null) parentMap.set(curr.left, curr);
      if (curr.right !== null) parentMap.set(curr.right, curr);
      curr = curr.left;
    }

    curr = stack[stack.length - 1];

    if (curr.right === null || curr.right === prev) {
      if (curr.left === curr.right && curr.val === target) {
        //* Get the parent of this node from the map so we can delete the connection
        const parentNode = parentMap.get(curr);

        //* Root node is a "target" and is also a leaf
        if (parentNode === null) return null;
        //* Delete the node on the correct side
        else if (parentNode.left === curr) parentNode.left = null;
        else if (parentNode.right === curr) parentNode.right = null;
      }

      stack.pop();
      prev = curr;
      curr = null;
    } else {
      curr = curr.right; //* Go right
    }
  }

  return root;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.left.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.right.left = new TreeNode(2);
root1.right.right = new TreeNode(4);

const root2 = new TreeNode(5);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(5);
root2.left.left.left = new TreeNode(5);
root2.left.left.left.left = new TreeNode(5);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);

console.log(removeLeafNodes(root1, 2));
console.log(removeLeafNodes(root2, 5));
console.log(removeLeafNodes(root3, 3));
console.log(removeLeafNodes(root3, 2));

//* Time: O(n) - We have to traverse every node in the tree
//* We can't use any heuristics to skip any work

//* Space: O(h) - The size of the stack scales with the height of the tree
//* If the tree is balanced, the space usage is limited to O(log n)
//* When the tree resembles a linked list the space usage is O(n), but h <= n
