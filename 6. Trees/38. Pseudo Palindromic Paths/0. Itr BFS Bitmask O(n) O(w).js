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

//* Use a Bitmask to toggle on and off bits
//* This works similarly to the set solution
//* Where if we already found the element, remove it from the set
//* Else, you would add it to the set instead
//* The same works here, but in the context of an XOR operation
//* 4 in binary is 1000. 1000 ^ 1000 = 0
//* 0 ^ 1000 = 1000, so we can toggle bits on and off
//* The << allows us to maintain the previous state in the bitmask
//* If you find a number that already exists in the bitmask, you FLIP the bits OFF
//* Otherwise, they get toggled on
//* Then we just need to check if the current node is a leaf
//* If it IS a leaf, check if there is only 1 set bit in the bitmask
//* This works because: 2^n in binary is 1 followed by "n" 0s
//* So, 2^n - 1 is: 0 followed by "n" 1s
//* If we perform 2^n & 2^n-1, we get 0 IF the bitmask was a POWER OF TWO
//* 4 & 3 = 0, so we know the bitmask had ONE set bit
function pseudoPalindromicPaths(root) {
  if (root === null) return 0;

  //* [node, bitmask]
  const queue = new MyQueue([[root, 0]]);
  let paths = 0;

  while (!queue.isEmpty()) {
    let [curr, bitmask] = queue.dequeue();

    //* Toggle the current value
    bitmask ^= 1 << (curr.val - 1);

    //* If the node is a leaf AND AT MOST ONE element occurred an odd amount of times
    if (curr.left === curr.right && (bitmask & (bitmask - 1)) === 0) {
      paths++;
    }

    //* Enqueue the children to process them too
    if (curr.right) {
      queue.enqueue([curr.right, bitmask]);
    }

    if (curr.left) {
      queue.enqueue([curr.left, bitmask]);
    }
  }

  return paths;
}

const root1 = new TreeNode(2);
root1.left = new TreeNode(3);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(1);
root1.right = new TreeNode(1);
root1.right.right = new TreeNode(1);

const root2 = new TreeNode(10);

const root3 = new TreeNode(2);
root3.left = new TreeNode(1);
root3.left.left = new TreeNode(1);
root3.left.right = new TreeNode(3);
root3.left.right.right = new TreeNode(1);
root3.right = new TreeNode(1);

console.log(pseudoPalindromicPaths(root1)); //* 2
console.log(pseudoPalindromicPaths(root2)); //* 1
console.log(pseudoPalindromicPaths(root3)); //* 1

//* Time: O(n) - We have to process every node in the tree
//* The bitwise operations take O(1) time within each iteration

//* Space: O(w) - The size of the queue scales with the width of the tree
//* We use one integer to act as the bitmask for the numbers, which uses constant space
