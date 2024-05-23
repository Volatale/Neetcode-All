class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyLinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    for (let i = 0; i < values.length; i++) {
      this.append(values[i]);
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

//* Create two new dummy nodes
//* Each node aims to split the "head" nodes
//* If curr.val < x, then attach it to the "lower" node
//* Otherwise, attach it to the "higher" node
//* Then combine both lists
function partitionList(head, x) {
  if (head === null) return head;

  //* Create two separate Linked Lists heads
  let higher = new ListNode(0);
  let lower = new ListNode(0);

  //* Tracks progress through the above lists
  let low = lower;
  let high = higher;

  //* Travels through the "head" node
  let curr = head;

  //* Append nodes to their appropriate heads
  while (curr !== null) {
    if (curr.val < x) {
      low.next = curr;
      low = low.next;
    } else {
      high.next = curr;
      high = high.next;
    }

    curr = curr.next;
  }

  high.next = null; //* The end of the "right" list needs to be null
  low.next = higher.next; //* low is at the "last" position, so set its next to higher.next

  //* The "head" of the combined list
  return lower.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(4);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(2);
list1.next.next.next.next = new ListNode(5);
list1.next.next.next.next.next = new ListNode(2);

const list2 = new ListNode(2);
list2.next = new ListNode(1);

console.log(partitionList(list1, 3));
console.log(partitionList(list2, 2));

//* Time: O(n) - Time taken scales with the input size
//* We have to iterate through the entire input list
//* It takes O(1) to attach the current node to another node

//* Space: O(1) - We only create two "new" head nodes
//* So the space usage remains constant regardless of input size
