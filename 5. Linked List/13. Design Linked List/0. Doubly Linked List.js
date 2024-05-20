class ListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

class MyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //* Traverse along the linked list
  traverse(index) {
    let curr = this.head;
    let count = 0;

    while (curr !== null && count < index) {
      curr = curr.next;
      count++;
    }

    //* Return the node we want need
    return curr;
  }

  get(index) {
    //* Invalid index
    if (index < 0 || index >= this.size) return -1;

    if (index === 0) {
      return this.head.val;
    } else if (index === this.size - 1) {
      return this.tail.val;
    }

    //* We need to travel to the correct node
    return this.traverse(index).val;
  }

  addAtHead(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.size++;
  }

  addAtTail(val) {
    const newNode = new ListNode(val);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  addAtIndex(index, val) {
    if (index < 0 || index > this.size) return; //* Out of Bounds
    if (index === 0) return this.addAtHead(val); //* Head Node
    if (index === this.size) return this.addAtTail(val); //* Tail Node

    const newNode = new ListNode(val);

    //* Travel to the node BEFORE the "index-th" node
    const beforeNode = this.traverse(index - 1);

    //* Put the NEW node inbetween this and the next
    newNode.next = beforeNode.next;
    newNode.prev = beforeNode;
    newNode.next.prev = newNode;
    beforeNode.next = newNode;

    this.size++;
  }

  deleteHead() {
    if (this.size === 0) return;

    if (this.size === 1) {
      //* There will be no more nodes, thus null on both
      this.head === null;
      this.tail === null;
    } else {
      //* Next node (from the left) becomes head
      this.head.next.prev = null;
      this.head = this.head.next;
    }

    this.size--;
  }

  deleteTail() {
    if (this.size === 0) return;

    if (this.size === 1) {
      //* No more nodes
      this.head === null;
      this.tail === null;
    } else {
      //* Previous node (from the right) becomes tail
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    }

    this.size--;
  }

  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) return; //* Out of Bounds

    if (index === 0) {
      return this.deleteHead(); //* Deleting head node
    } else if (index === this.size - 1) {
      return this.deleteTail(); //* Deleting tail node
    }

    const curr = this.traverse(index);

    //* Remove the connections to the "index-th" node
    curr.prev.next = curr.next;
    curr.next.prev = curr.prev;

    this.size--;
  }
}

const ll1 = new MyLinkedList();

ll1.addAtHead(1); //* 1
ll1.addAtTail(3); //* 1 -> 3
ll1.addAtIndex(1, 2); //* 1 -> 2 -> 3
console.log(ll1.get(1)); //* 2
ll1.deleteAtIndex(1); //* 1 -> 3
console.log(ll1.get(1)); //* 3

const ll2 = new MyLinkedList();

debugger;
ll2.addAtIndex(0, 10);
ll2.addAtIndex(0, 20);
ll2.addAtIndex(1, 30);
console.log(ll2.get(0)); //* 20

const ll3 = new MyLinkedList();

ll3.addAtHead(1);
ll3.addAtTail(3);
ll3.addAtIndex(1, 2);
console.log(ll3.get(1)); //* 2
console.log(ll3.get(3)); //* -1
ll3.deleteAtIndex(1);
console.log(ll3.get(3)); //* -1
ll3.deleteAtIndex(3);
ll3.deleteAtIndex(0);
console.log(ll3.get(0)); //* 3
ll3.deleteAtIndex(0);
console.log(ll3.get(0)); //* -1
