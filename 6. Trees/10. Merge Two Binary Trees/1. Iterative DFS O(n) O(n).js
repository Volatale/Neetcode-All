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

//* Apply DFS to traverse BOTH trees at once
//* The only situations we have to consider are:
//* Both nodes are null; return null
//* Either node is null; return the non-null node
//* Neither node is null; merge the values
//* Also enqueue both children to process THEIR children too
//* Repeat this process for each node
//* Ultimately, we want to merge into ROOT1, not root2
function mergeTrees(root1, root2) {
  if (root1 === null && root2 === null) return null; //* Both null
  if (root1 === null) return root2; //* Only root2 exists
  if (root2 === null) return root1; //* Only root1 exists

  //* DFS on two different trees at once
  const stack1 = [root1];
  const stack2 = [root2];

  while (stack1.length > 0 && stack2.length > 0) {
    //* Dequeue both nodes
    const node1 = stack1.pop();
    const node2 = stack2.pop();

    //* Merge the values; we know both nodes exist
    node1.val += node2.val;

    if (!node1.left && node2.left) {
      node1.left = node2.left; //* Because left doesn't exist
    } else if (node1.left && node2.left) {
      //* Both exist, so process the left children
      stack1.push(node1.left);
      stack2.push(node2.left);
    }

    if (!node1.right && node2.right) {
      node1.right = node2.right; //* Because right doesn't exist
    } else if (node1.right && node2.right) {
      //* Both exist, so process the right children
      stack1.push(node1.right);
      stack2.push(node2.right);
    }
  }

  return root1;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(5);
root1.right = new TreeNode(2);

const root2 = new TreeNode(2);
root2.left = new TreeNode(1);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(3);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(1);

const root4 = new TreeNode(1);
root4.left = new TreeNode(2);

const root5 = new TreeNode(1);
root5.left = new TreeNode(10);

const root6 = new TreeNode(1);
root6.right = new TreeNode(20);

const root7 = new TreeNode(5);

const root8 = null;

console.log(mergeTrees(root1, root2));
console.log(mergeTrees(root3, root4));
console.log(mergeTrees(root5, root6));
console.log(mergeTrees(root7, root8));

//* Time: O(n) - In the worst case, we process every node in both trees
//* But this will always been capped at the smaller number of nodes in either tree
//* If a node doesn't exist in either tree, we don't push the children

//* Space: O(n) - The depth of the call stack scales with the number of nodes
//* If both trees are balanced, the space usage is O(log n)
