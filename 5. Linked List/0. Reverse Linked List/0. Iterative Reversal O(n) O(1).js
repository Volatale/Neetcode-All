class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* We need a node to start with (curr)
//* Then, we need a way to track what we want to attach the next element to (prev)
//* Finally, we need a way to retain the reference to the REST of the list (next)
//* While curr !== null, set next = curr.next (this is the implementation of the above)
//* Then, we set curr.next = prev, which effectively makes the pointer go the other way
//* Set prev = curr so we can tell what node to attach the NEXT element to
//* And set curr = next so we progress with the rest of the list
function reverseLinkedList(head) {
  //* Handles case of receiving a null head node
  if (head === null) return head;

  let curr = head;
  let prev = null; //* A reference to the element we attach things to (for the reversal)
  let next = null; //* Retain a reference to elements AFTER curr (otherwise it gets garbage collected)

  //* Reverse every element
  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  //* Prev is now supposed to be the head, since we reversed the list
  return prev;
}

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

const listII = new ListNode(1);
listII.next = new ListNode(2);

console.log(reverseLinkedList(list)); //* 5 -> 4 -> 3 -> 2 -> 1
console.log(reverseLinkedList(listII)); //* 2 -> 1

//* Time: O(n) - We have to iterate over every element in the list

//* Space: O(1) - We use no extra space, we only modify the pointers themselves
