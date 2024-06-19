class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  function dfs(curr) {
    if (curr === null) {
      results.push("#"); //* Denotes a null node
      return;
    }

    //* Push the node representation + separator
    results.push(`${curr.val},`);

    //* Do the same for the subtrees
    dfs(curr.left);
    dfs(curr.right);
  }

  const results = [];

  dfs(root);
  return results.join("");
}

function deserialize(data) {
  function getNextNode() {
    if (index >= data.length) return null;

    //* If the current node is a "null" node
    if (data[index] === "#") {
      index++; //* Move past the null node
      return null;
    }

    //* Push every value up until the separator
    let val = "";

    while (index < data.length && data[index] !== ",") {
      val += data[index++];
    }

    //* Move past the ","
    index++;

    //* Create the node
    const curr = new TreeNode(parseInt(val));

    curr.left = getNextNode();
    curr.right = getNextNode();

    return curr;
  }

  let index = 0;
  return getNextNode();
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(5);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.left.left = new TreeNode(5);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);

console.log(deserialize(serialize(root1)));
console.log(deserialize(serialize(root2)));
console.log(deserialize(serialize(root3)));
console.log(deserialize(serialize(null)));

//* Time: O(n) - It takes O(n) time to serialize the tree
//* Then it takes O(n) to deserialize the tree
//* Creating nodes takes constant time

//* Space: O(n) - The space usage scales with the number of nodes
//* Serializing creates a string that scales in size with "n"
//* We also create "n" tree nodes
//* The depth of the call stack scales with the height of the tree
