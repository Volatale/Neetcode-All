class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

//* There are four different cases to consider at each node
//* p and q are BOTH null, in which case the structure is the same
//* p OR q are null, in which case the structures are DIFFERENT
//* p.val !== q.val, in which case the values are different
//* p.val === q.val, in which case the values are the same and so is the structure
//* Recursively perform these checks for every node until every node is processed
//* We can use DFS or BFS
function sameTree(p, q) {
  if (p === null && q === null) return true; //* Structure is the same
  if (p === null || q === null) return false; //* Different structures
  if (p.val !== q.val) return false; //* Different values

  //* Use a Stack for DFS
  const stack = [];

  //* Enqueue BOTH root nodes
  stack.push(p);
  stack.push(q);

  while (stack.length > 0) {
    //* Get both nodes
    const pNode = stack.pop();
    const qNode = stack.pop();

    if (pNode === null && qNode === null) continue; //* Same Structure
    if (pNode === null || qNode === null) return false; //* Different Structure
    if (pNode.val !== qNode.val) return false; //* Different Values

    //* Enqueue the LEFT children together
    stack.push(pNode.left);
    stack.push(qNode.left);

    //* Then push the RIGHT children together
    //* This effectively lets us check if the structures are the same
    stack.push(pNode.right);
    stack.push(qNode.right);
  }

  return true;
}

const p1 = new TreeNode(1);
const q1 = new TreeNode(2);

const p2 = new TreeNode(1);
p2.left = new TreeNode(2);
p2.right = new TreeNode(3);

const q2 = new TreeNode(1);
q2.left = new TreeNode(2);
q2.right = new TreeNode(3);

const p3 = new TreeNode(5);
p3.left = new TreeNode(10);

const q3 = new TreeNode(5);
p3.right = new TreeNode(10);

console.log(sameTree(p1, q1)); //* False, values are different
console.log(sameTree(p2, q2)); //* True
console.log(sameTree(p3, q3)); //* False, structures are different
console.log(sameTree(null, q3)); //* False, structures are different
console.log(sameTree(p3, null)); //* False, structures are different
console.log(sameTree(null, null)); //* True

//* Time: O(n) - The time taken to process every node in both trees scales with "n"
//* If both trees are the same, then we process the same number of nodes in both

//* Space: O(h) - The space used by the stack scales with the height of the trees
