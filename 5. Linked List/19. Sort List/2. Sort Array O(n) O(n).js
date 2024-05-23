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

//* Create an array to hold all the node values
//* Iterate through every node, pushing the current value
//* Sort the nodes array
//* Create a new linked list using the sorted values
function sortList(head) {
  if (head === null || head.next === null) return head;

  const nodes = [];
  let curr = head;

  //* 1. Iterate through the list adding all the nodes
  while (curr !== null) {
    nodes.push(curr.val);
    curr = curr.next;
  }

  //* 2. Sort the list
  nodes.sort((a, b) => a - b);

  //* 3. Create new linked list
  return new SinglyLinkedList(nodes).head;
}

const list1 = new ListNode(-1);
list1.next = new ListNode(5);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(0);

const list2 = new ListNode(5);
list2.next = new ListNode(8);
list2.next.next = new ListNode(1);
list2.next.next.next = new ListNode(0);

const list3 = new ListNode(1);

console.log(sortList(list1)); //* -1 -> 0 -> 3 -> 4 -> 5
console.log(sortList(list2)); //* 0 -> 1 -> 5 -> 8
console.log(sortList(list3)); //* 1
console.log(sortList(null)); //* null

//* Time: O(n log n) - It takes O(n log n) to sort the array
//* It takes O(n) time to iterate through the list and push every val
//* Then it takes O(n) time to build the new linked list
//* But the n log n dominates the linear complexity

//* Space: O(n) - It takes O(n) to hold all of the node values
//* The new linked list itself also scales linearly with "n" in size
