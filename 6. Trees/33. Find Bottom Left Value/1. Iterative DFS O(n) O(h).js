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

//* Use Depth First Search
//* Track the current depth, and the maximum depth
//* The first time we reach a new depth
//* Modify the bottomLeft variable
function findBottomLeftValue(root) {
  //* [node, depth]
  const stack = [[root, 0]];

  let maxDepth = 0;
  let bottomLeft = root.val;

  while (stack.length > 0) {
    const [curr, depth] = stack.pop();

    //* Find the FIRST node on each level
    if (depth > maxDepth) {
      bottomLeft = curr.val;
      maxDepth = depth;
    }

    //* Check the left and right children for bottomLeft
    if (curr.right) {
      stack.push([curr.right, depth + 1]);
    }

    if (curr.left) {
      stack.push([curr.left, depth + 1]);
    }
  }

  return bottomLeft;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(4);
root2.right = new TreeNode(3);
root2.right.left = new TreeNode(5);
root2.right.left.left = new TreeNode(7);
root2.right.right = new TreeNode(6);

const root3 = new TreeNode(100);

const root4 = new TreeNode(1);
root4.left = new TreeNode(3);
root4.left.left = new TreeNode(5);
root4.right = new TreeNode(4);

const root5 = new TreeNode(1);
root5.left = new TreeNode(2);
root5.left.left = new TreeNode(3);

const root6 = new TreeNode(2);
root6.left = new TreeNode(1);
root6.right = new TreeNode(3);

console.log(findBottomLeftValue(root1)); //* 2
console.log(findBottomLeftValue(root2)); //* 7
console.log(findBottomLeftValue(root3)); //* 100
console.log(findBottomLeftValue(root4)); //* 5
console.log(findBottomLeftValue(root5)); //* 3
console.log(findBottomLeftValue(root6)); //* 1

//* Time: O(n) - We have to process every node in the tree
//* Any node can have "n" depth, so we need to check every node
//* It takes O(1) time to dequeue

//* Space: O(h) - The depth of the call stack scales with the height of the tree
//* If the tree is balanced, the size is limited to O(log n)
//* When the tree resembles a linked list, the size is O(n)
