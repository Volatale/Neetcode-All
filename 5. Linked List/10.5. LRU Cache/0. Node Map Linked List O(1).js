class ListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

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
    return newNode;
  }

  moveToBack(node) {
    //* This is the only node
    if (this.size === 1) return this.head;

    if (this.head === node) {
      node.next.prev = node.prev;
      this.head = node.next;
      this.head.prev = null;
    } else {
      node.next.prev = node.prev;
      node.prev.next = node.next;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    node.next = null;
  }

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
    this.cache = new Map();
    this.nodeMap = new Map();
    this.list = new DoublyLinkedList();

    this.capacity = capacity;
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    //* Get a reference to the node we want
    const node = this.nodeMap.get(key);

    this.list.moveToBack(node);

    return this.cache.get(key);
  }

  put(key, value) {
    if (!this.cache.has(key)) {
      const node = this.list.enqueue(key);
      this.nodeMap.set(key, node);
      this.cache.set(key, value);
    } else {
      this.cache.set(key, value);
      this.list.moveToBack(this.nodeMap.get(key));
    }

    if (this.cache.size > this.capacity) {
      const front = this.list.head;
      this.list.dequeue();
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
