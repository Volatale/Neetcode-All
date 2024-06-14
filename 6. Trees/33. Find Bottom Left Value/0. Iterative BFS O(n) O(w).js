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

//* Use Breadth First Search
//* A level order traversal allows us to retrieve the FIRST node in the level
//* So whenever we go to a new level, we grab the leftmost element in the queue
function findBottomLeftValue(root) {
  //* Just incase we only have 1 node
  let leftMost = root;

  //* Queue for BFS
  const queue = new MyQueue([root]);

  while (!queue.isEmpty()) {
    let size = queue.size; //* So we can do level order traversal
    leftMost = queue.front.val; //* Gives us the FIRST node in each level

    //* Level Order Traversal (we only want the first node in the level)
    for (let i = 0; i < size; i++) {
      const curr = queue.dequeue();

      //* Check the left and right subtrees
      if (curr.left) queue.enqueue(curr.left);

      if (curr.right) queue.enqueue(curr.right);
    }
  }

  //* Return the value
  return leftMost.val;
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

//* Space: O(w) - The queue's size scales with the width of the tree
//* If the tree resembles a linked list, there will only be 1 element in the queue
//* When the tree is perfectly balanced, there are (n / 2) + 1 elements in the queue
