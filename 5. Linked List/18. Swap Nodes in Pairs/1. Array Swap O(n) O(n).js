class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    for (let val of values) {
      this.append(val);
    }
  }

  append(val) {
    const newNode = new ListNode(val);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return this.size;
  }
}

//* Add every value to an array
//* Swap the adjacent values without going out of bounds
//* Return a new linked list with those swapped values
function swapNodesInPairs(head) {
  if (head === null || head.next === null) return head;

  const nodes = [];
  let curr = head;

  //* Add every value to the nodes array
  while (curr !== null) {
    nodes.push(curr.val);
    curr = curr.next;
  }

  //* Swap the adjacent indices
  for (let i = 0; i < nodes.length; i += 2) {
    if (i + 1 >= nodes.length) break;

    //* Swap the values of both nums[i] and nums[i + 1]
    nodes[i] ^= nodes[i + 1];
    nodes[i + 1] ^= nodes[i];
    nodes[i] ^= nodes[i + 1];
  }

  //* Create a new list with the swapped nodes
  return new SinglyLinkedList(nodes).head;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);

const list2 = new ListNode(1);

console.log(swapNodesInPairs(list1));
console.log(swapNodesInPairs(null));
console.log(swapNodesInPairs(list2));

//* Time: O(n) - The time taken to iterate through the whole list scales with "n"
//* Then it takes O(n / 2) time (so O(n) simplified) to swap all the values
//* Finally, it takes O(n) time to create the new linked list

//* Space: O(n) - The nodes array scales in size linearly with "n"
//* Then, the returned list ALSO scales with "n"
