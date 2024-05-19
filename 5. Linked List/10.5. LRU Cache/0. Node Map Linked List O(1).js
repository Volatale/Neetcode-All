class ListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

//* Left of list is the LEAST recently used
//* Right of list is the MOST recently used
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //* Add a node to the right
  enqueue(val) {
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
    return this.size;
  }

  //* Move this node to the right (most recently used)
  moveToBack(node) {
    //* If the node is already the tail node, don't move it
    if (this.size === 1 || node === this.tail) return this;

    if (node === this.head) {
      node.next.prev = node.prev;
      this.head = node.next;
      this.head.prev = null;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    //* Attach "node" to the end of the list
    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    node.next = null;
  }

  //* Remove the leftmost node
  dequeue() {
    if (this.size === 0) return;

    this.head.next.prev = null;
    this.head = this.head.next;

    this.size--;
    return;
  }
}

class LRUCache {
  constructor(capacity) {
    this.cache = new Map(); //* Where lookups to get the values
    this.nodeMap = new Map(); //* Holds references to the nodes
    this.list = new DoublyLinkedList(); //* Left is LEAST recently used
    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    //* Get a reference to the node we want
    const node = this.nodeMap.get(key);

    //* This counts as a "use", so move it to the back
    this.list.moveToBack(node);

    return this.cache.get(key);
  }

  put(key, value) {
    if (!this.cache.has(key)) {
      this.list.enqueue(key); //* Add the node to the list
      this.nodeMap.set(key, this.list.tail); //* this.list.tail is the node we just added
    } else {
      //* This is a "use", so move it to the recently used side (right)
      this.list.moveToBack(this.nodeMap.get(key));
    }

    this.cache.set(key, value);

    //* Size is above capacity, pop the least recently used element
    if (this.cache.size > this.capacity) {
      const front = this.list.head;
      this.list.dequeue();
      this.cache.delete(front.val);
      this.nodeMap.delete(front.val);
    }
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); //* 1
cache.put(3, 3);
console.log(cache.get(2)); //* -1
cache.put(4, 4);
console.log(cache.get(1)); //* -1
console.log(cache.get(3)); //* 3
console.log(cache.get(4)); //* 4

const cache2 = new LRUCache(2);
console.log(cache2.get(2)); //* -1
cache2.put(2, 6);
console.log(cache2.get(1)); //* -1
cache2.put(1, 5);
cache2.put(1, 2);
console.log(cache2.get(1)); //* 2
console.log(cache2.get(2)); //* 6
