class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class ListNode {
  constructor(val, next = null, prev = null) {
    this.val = val;
    this.next = next;
    this.prev = prev;
  }
}

class Deque {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.size = 0;

    for (let val of values) {
      this.append(val);
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  append(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      newNode.prev = this.back;
      this.back.next = newNode;
      this.back = newNode;
    }

    this.size++;
    return this.size;
  }

  pop() {
    if (this.size === 0) return;

    const popped = this.back;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.back = this.back.prev;
      this.back.next = null;
    }

    this.size--;
    return popped.val;
  }

  appendLeft(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      newNode.next = this.front;
      this.front.prev = newNode;
      this.front = newNode;
    }

    this.size++;
    return this.size;
  }

  popLeft() {
    if (this.size === 0) return;

    const front = this.front;

    if (this.size === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
      this.front.prev = null;
    }

    this.size--;
    return front.val;
  }
}

//* Use a deque - we need to alternate between left and right orders
//* If parity is 0, pop from the right, and push to the left (left first)
//* If parity is 1, pop from the left, and push to the right (right first)
//* Keep repeating this process until we are done
//* By PUSHING to the LEFT, the next iteration makes us POP from the LEFT
//* So we process the level in REVERSE order
//* From THIS level, push to the RIGHT (right first)
//* Then on the next iteration, you pop from the right which is left to right ordered
function zigzagOrderTraversal(root) {
  if (root === null) return [];

  const results = [];

  //* Use a Deque - we need O(1) insertion and deletion from both sides
  const deque = new Deque([root]);
  let parity = 0;

  while (!deque.isEmpty()) {
    let size = deque.size;
    const values = [];

    for (let i = 0; i < size; i++) {
      if (parity === 0) {
        //* Pop from the right
        const curr = deque.pop();
        values.push(curr.val);

        //* Push to the left (left first)
        if (curr.left) deque.appendLeft(curr.left);
        if (curr.right) deque.appendLeft(curr.right);
      } else {
        //* Pop from the left
        const curr = deque.popLeft();
        values.push(curr.val);

        //* Push to the right (right first)
        if (curr.right) deque.append(curr.right);
        if (curr.left) deque.append(curr.left);
      }
    }

    parity ^= 1; //* Swap parity
    results.push(values);
  }

  return results;
}

const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);

const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.right = new TreeNode(5);
root2.right.left = new TreeNode(6);
root2.right.right = new TreeNode(7);

const root3 = new TreeNode(1);

console.log(zigzagOrderTraversal(root1));
console.log(zigzagOrderTraversal(root2));
console.log(zigzagOrderTraversal(root3));
console.log(zigzagOrderTraversal(null));

//* Time: O(n) - The time taken to push every value to an array scales with "n"

//* Space: O(w) - The size of the deque scales with the width of the tree
//* If the first level has 1 node, and the last has 8, then the deque may store 8 elements at once
