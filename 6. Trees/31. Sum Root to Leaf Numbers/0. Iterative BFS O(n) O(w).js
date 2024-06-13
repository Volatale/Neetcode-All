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
//* The order we visit nodes in is irrelevant
//* We merely need to track the totalSum encountered thus far
//* Enqueue nodes in tuples along with their sum (save the state)
//* Then, within each iteration of the while loop
//* "sum = sum * 10 + curr.val" lets us utilize place value
function sumRootToLeafPath(root) {
  //* [node, sum]
  const queue = new MyQueue([[root, 0]]);

  let totalSum = 0;

  while (!queue.isEmpty()) {
    //* Retrieve the state
    let [curr, sum] = queue.dequeue();

    //* Add the current digit (place value)
    sum = sum * 10 + curr.val;

    //* If the current node is a leaf
    if (curr.left === null && curr.right === null) {
      totalSum += sum;
    }

    if (curr.left !== null) {
      queue.enqueue([curr.left, sum]);
    }

    if (curr.right) {
      queue.enqueue([curr.right, sum]);
    }
  }

  return totalSum;
}

const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(5);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(4);
root3.left = new TreeNode(9);
root3.left.left = new TreeNode(5);
root3.left.right = new TreeNode(1);
root3.right = new TreeNode(0);

console.log(sumRootToLeafPath(root1)); //* 25
console.log(sumRootToLeafPath(root2)); //* 560
console.log(sumRootToLeafPath(root3)); //* 1026

//* Time: O(n) - It takes O(n) time to traverse to every node
//* Dequeuing takes O(1) time

//* Space: O(w) - The space used by the stack scales with the width of the tree
