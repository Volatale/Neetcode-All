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

//* Two trees are equivalent if they have the same structure
//* Case 1: Both nodes are null -> Return true (same structure)
//* Case 2: Either node is null -> Return false (different structure)
//* Case 3: Values are different -> Return false (different values)
//* If those checks pass, then we need to check the children too
//* Check if Same Tree (left, left), (right, right)
//* If that doesn't work, we need to "flip"
//* So check for Symmetric Tree (left, right), (right, left)
function isFlipEquivalent(root1, root2) {
  //* Queue for BFS
  const queue = new MyQueue([root1, root2]);

  while (!queue.isEmpty()) {
    const curr1 = queue.dequeue();
    const curr2 = queue.dequeue();

    if (curr1 === null && curr2 === null) {
      continue; //* Same Structure
    } else if (curr1 === null || curr2 === null || curr1.val !== curr2.val) {
      return false; //* Different structure, or Different Values
    }

    //* Try checking for Same Tree
    if (
      isSameChildren(curr1.left, curr2.left) &&
      isSameChildren(curr1.right, curr2.right)
    ) {
      queue.enqueue(curr1.left);
      queue.enqueue(curr2.left);
      queue.enqueue(curr1.right);
      queue.enqueue(curr2.right);
    } else if (
      //* Try checking for Symmetric Tree
      isSameChildren(curr1.left, curr2.right) &&
      isSameChildren(curr1.right, curr2.left)
    ) {
      queue.enqueue(curr1.left);
      queue.enqueue(curr2.right);
      queue.enqueue(curr1.right);
      queue.enqueue(curr2.left);
    } else {
      return false; //* If they still don't match
    }
  }

  //* Trees are flip equivalent
  return true;
}

function isSameChildren(curr1, curr2) {
  if (curr1 === null || curr2 === null) return curr1 === curr2;
  return curr1.val === curr2.val;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(3);
root2.right = new TreeNode(2);

const root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(4);
root3.left.right = new TreeNode(5);
root3.left.right.left = new TreeNode(7);
root3.left.right.right = new TreeNode(8);
root3.right = new TreeNode(3);
root3.right.left = new TreeNode(6);

const root4 = new TreeNode(1);
root4.left = new TreeNode(3);
root4.left.right = new TreeNode(6);
root4.right = new TreeNode(2);
root4.right.left = new TreeNode(4);
root4.right.right = new TreeNode(5);
root4.right.right.left = new TreeNode(8);
root4.right.right.right = new TreeNode(7);

const root5 = new TreeNode(5);

const root6 = new TreeNode(6);

console.log(isFlipEquivalent(root1, root2)); //* True
console.log(isFlipEquivalent(root3, root4)); //* True
console.log(isFlipEquivalent(root5, null)); //* False
console.log(isFlipEquivalent(null, root6)); //* False
console.log(isFlipEquivalent(null, null)); //* True

//* Time: O(n) - Each node is processed at most twice
//* Each node makes 2 pairs of calls, but each node is unique in value
//* Only 2 out of 4 paths will travel the depth of the tree
//* The other two terminate early

//* Space: O(h) - The size of the queue scales with the width of the widest tree
