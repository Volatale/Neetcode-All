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

    if (this.size === 0) {
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

function reverseListII(head, left, right) {
  if (head === null || head.next === null) return head;

  //* Makes it easier to reverse any node, including the head
  let dummy = new ListNode(-1);
  dummy.next = head;

  //* The node just BEFORE the one we want to reverse
  let prevGroupTail = dummy;

  //* The start / end of the reversal group
  let newTail = head;
  let newHead = head;

  for (let i = 1; i < right; i++) {
    if (i < left) {
      prevGroupTail = prevGroupTail.next;
      newTail = newTail.next;
    }

    if (i < right) {
      newHead = newHead.next;
    }
  }

  const next = newHead.next; //* Retain a reference to the next node
  prevGroupTail.next = reverseList(newTail, next); //* Reverse the group, stop at "next"
  newTail.next = next; //* Set the new tail's next to "next"

  return dummy.next;
}

function reverseList(head, limit) {
  let prev = null;
  let next = null;
  let curr = head;

  while (curr !== limit) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(10);
list2.next = new ListNode(50);
list2.next.next = new ListNode(100);

const list3 = new ListNode(5);

console.log(reverseListII(list1, 2, 4)); //* 1 -> 4 -> 3 -> 2 -> 5
console.log(reverseListII(list2, 1, 3)); //* 100 -> 50 -> 10
console.log(reverseListII(list3, 1, 1)); //* 5
console.log(reverseListII(null, 1, 1)); //*

//* Time: O(n) - The time taken scales with the number of nodes in the input
//* In the worst case, it takes O(n) time to reverse the list
//* Because we may have to reverse the entire list

//* Space: O(1) - The space usage remains constant regardless of the input size
//* We only create one dummy node
