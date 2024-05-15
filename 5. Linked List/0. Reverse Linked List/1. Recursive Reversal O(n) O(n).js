class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Recursively find the final node in the list
//* Once we have that node, set head.next.next = head
//* If we have  1 -> 2 -> 3, then 3 was just "popped" from the call stack
//* So "head" = 2. 2.next = 3 (because it STILL has the reference to the next)
//* 3.next = head means 3 -> 2, then we say that 2.next = null
//* Because if we don't, we get a circular reference (3 -> 2 -> 3 -> 2 etc)
function reverseLinkedList(head) {
  //* Base Case, handles case of null nodes
  if (head === null || head.next === null) return head;

  //* Find the last node
  const reversed = reverseLinkedList(head.next);

  //* Reverse the nodes
  head.next.next = head; //* 4.next = 5, so 5.next = head (4): 5 -> 4
  head.next = null; //* Prevents circular references

  return reversed;
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

//* Space: O(n) - The depth of the call stack scales with the length of the linked list
