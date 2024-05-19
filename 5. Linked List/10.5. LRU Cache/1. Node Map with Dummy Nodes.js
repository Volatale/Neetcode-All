class ListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

//* Left of list is the LEAST recently used side
//* Right is the MOST recently used
//* Doubly Linked List because this allows us get the prev node too
//* When combined with the nodeMap, we get O(1) removals on nodes
//* At the cost of O(n) space
class DoublyLinkedList {
  constructor() {
    //* Dummy Nodes
    this.head = new ListNode(-Infinity);
    this.tail = new ListNode(Infinity);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  //* Add to the right, becomes most recently used
  append(node) {
    node.next = this.tail;
    node.prev = this.tail.prev;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }

  //* Move to the right; becomes most recently used
  moveToBack(node) {
    //* It is already the "tail" node
    if (node === this.tail.prev) return;

    //* Detach this node
    node.prev.next = node.next;
    node.next.prev = node.prev;

    //* Move it to the right side (most recently used)
    this.append(node);
  }

  //* Remove the least recently used (leftmost)
  dequeue() {
    this.head.next = this.head.next.next;
    this.head.next.prev = this.head;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); //* Key stores value
    this.nodeMap = new Map(); //* Key stores node
    this.list = new DoublyLinkedList(); //* Node stores key
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    //* It becomes the most recently used
    const node = this.nodeMap.get(key);
    this.list.moveToBack(node);

    return this.cache.get(key);
  }

  put(key, value) {
    //* Add the node to the nodeMap and the list
    if (!this.cache.has(key)) {
      const node = new ListNode(key);
      this.list.append(node); //* Add the node to the list
      this.nodeMap.set(key, node); //* Save the reference to the node
    } else {
      const node = this.nodeMap.get(key);
      this.list.moveToBack(node); //* This key becomes the "most recently used"
    }

    this.cache.set(key, value);

    //* Size is above capacity, pop the least recently used element
    if (this.cache.size > this.capacity) {
      const front = this.list.head.next; //* The least recently used node (head is dummy)
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
