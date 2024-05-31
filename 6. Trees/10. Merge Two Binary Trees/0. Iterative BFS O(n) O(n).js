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

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.size = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.size++;
    return this.size;
  }

  dequeue() {
    if (this.size === 0) return;

    const front = this.front;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.size--;
    return front.val;
  }
}

//* Apply BFS to traverse BOTH trees at once
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

  //* BFS on two different trees at once
  const queue1 = new MyQueue([root1]);
  const queue2 = new MyQueue([root2]);

  while (!queue1.isEmpty() && !queue2.isEmpty()) {
    //* Dequeue both nodes
    const node1 = queue1.dequeue();
    const node2 = queue2.dequeue();

    //* Merge the values; we know both nodes exist
    node1.val += node2.val;

    if (!node1.left && node2.left) {
      node1.left = node2.left; //* Because left doesn't exist
    } else if (node1.left && node2.left) {
      //* Both exist, so process the left children
      queue1.enqueue(node1.left);
      queue2.enqueue(node2.left);
    }

    if (!node1.right && node2.right) {
      node1.right = node2.right; //* Because right doesn't exist
    } else if (node1.right && node2.right) {
      //* Both exist, so process the right children
      queue1.enqueue(node1.right);
      queue2.enqueue(node2.right);
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
