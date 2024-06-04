class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* Fundamentally, we want to serialize the tree
//* We need to use preorder or postorder traversal to achieve this
//* JavaScript does not have Tuples so we can't use them with maps
//* Instead, we have to convert our values to strings
//* Create a string from the current value, and the left & right DFS
//* At each level, increment the count of this serial
//* If the serial === 2, we found a duplicate subtree somewhere
//* Push the current node to the results array
function findDuplicateSubtrees(root) {
  function dfs(curr) {
    if (curr === null) return "#"; //* Represents null nodes

    //* Separate using delimiters - The value "12" is not the same as "1,2"
    const serial = `${curr.val},${dfs(curr.left)},${dfs(curr.right)}`;

    //* Increment the counter for this serialization
    subtrees.set(serial, (subtrees.get(serial) || 0) + 1);

    //* Only push to results counter for this serialization is 2 (found a duplicate)
    if (subtrees.get(serial) === 2) {
      results.push(curr);
    }

    return serial;
  }

  if (root === null) return [];

  const results = [];
  const subtrees = new Map(); //* Holds the serializations of each subtree

  dfs(root);
  return results;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.left.left = new TreeNode(1);
root1.right.right = new TreeNode(1);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(4);
root2.right = new TreeNode(3);
root2.right.left = new TreeNode(2);
root2.right.left.left = new TreeNode(4);
root2.right.right = new TreeNode(4);

console.log(findDuplicateSubtrees(root1));
console.log(findDuplicateSubtrees(root2));

//* Time: O(n) - The DFS visits every node exactly once; there are "n" nodes, hence O(n)
//* Constructing a string takes time proprotional to the size of the subtree
//* However, string concatenation is effectively amortized constant time O(1)
//* It takes Θ(1) to lookup the string in the map

//* Space: O(n) - The depth of the recursion stack is O(n)
//* For a balanced tree it would be O(log n)
//* We store the serialization of every subtree in the map
