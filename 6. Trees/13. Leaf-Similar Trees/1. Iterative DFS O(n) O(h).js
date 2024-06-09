class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Iterate through both trees using DFS
//* Find the leaf nodes and add them to an array
//* Check if the lengths are different
//* If they are, we know they can't possibly be leaf similar
//* One tree has more leaves than the other
//* If they ARE equal lengths, find dissimilarities in the trees
function leafSimilar(root1, root2) {
  const leaves1 = preorder(root1);
  const leaves2 = preorder(root2);

  //* The trees don't have the same number of leaves
  if (leaves1.length !== leaves2.length) return false;

  //* Find dissimilarities
  for (let i = 0; i < leaves1.length; i++) {
    if (leaves1[i] !== leaves2[i]) return false;
  }

  return true;
}

//* It doesn't HAVE to be preorder
//* We just want to push the left nodes left to right
function preorder(root) {
  if (curr === null) return;

  const results = [];

  const stack = []; //* Stack for DFS
  let curr = root;

  while (curr !== null || stack.length > 0) {
    //* Go left as far as possible
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();

    //* Only push leaf nodes
    if (!curr.left && !curr.right) {
      results.push(curr.val);
    }

    curr = curr.right; //* Go Right
  }

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(5);
root1.left.left = new TreeNode(6);
root1.left.right = new TreeNode(2);
root1.left.right.left = new TreeNode(7);
root1.left.right.right = new TreeNode(4);
root1.right = new TreeNode(1);
root1.right.left = new TreeNode(9);
root1.right.right = new TreeNode(8);

const root2 = new TreeNode(3);
root2.left = new TreeNode(5);
root2.left.left = new TreeNode(6);
root2.left.right = new TreeNode(7);
root2.right = new TreeNode(1);
root2.right.left = new TreeNode(4);
root2.right.right = new TreeNode(2);
root2.right.right.left = new TreeNode(9);
root2.right.right.right = new TreeNode(8);

const root3 = new TreeNode(100);

const root4 = new TreeNode(100);

const root5 = new TreeNode(5);
root5.left = new TreeNode(10);

const root6 = new TreeNode(5);
root5.right = new TreeNode(10);

console.log(leafSimilar(root1, root2)); //* True
console.log(leafSimilar(root3, root4)); //* True
console.log(leafSimilar(root5, root6)); //* False

//* Time: O(n + m) - Both trees can have a different number of nodes
//* We need two different variables since 1 tree may have 3 nodes, and the other 10
//* If there are an even number of leaves in both
//* The time taken to check for dissimilarities is O(n) where "n" is the number of leaves
//* But there cannot be more than "n" leaves so we leave this out of the Big O

//* Space: O(h) - We have to store all of the leaves of both trees
//* But the number of leaves is always <= the number of nodes
//* The space of the stack scales with the height of the trees
