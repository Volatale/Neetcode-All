class ListNode {
  constructor(val, next = null, random) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

//* Iterate through the original list
//* Create a mapping of oldNode to newNode
//* This keeps the oldNode's conenctions intact
//* Then, iterate through the original list again
//* Use the mapping to create the connections
//* Since the old node maps to the new node
//* All we have to do is lookup the old node to get the "new" connections
function copyRandomList(head) {
  if (head === null) return head;

  const cache = new Map();
  let curr = head;

  //* 1. Create a mapping of oldNode to newNode
  //* We aren't concerned with connections here
  while (curr !== null) {
    cache.set(curr, new ListNode(curr.val));
    curr = curr.next;
  }

  curr = head;

  //* 2. Fix the connections (next & random)
  while (curr !== null) {
    const node = cache.get(curr) || null; //* Reference to newNode
    node.next = cache.get(curr.next) || null; //* Connect this to the next "newNode"
    node.random = cache.get(curr.random) || null; //* Grab the random node too

    curr = curr.next;
  }

  //* Returns the head of the "new" list
  return cache.get(head);
}

//* Time: O(n) - It takes O(n) time to iterate through the whole linked list
//* Then it takes O(n) time to iterate again to create the links

//* Space: O(n) - The new list also has "n" nodes
