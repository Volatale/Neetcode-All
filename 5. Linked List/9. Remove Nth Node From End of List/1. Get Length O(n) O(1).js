class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* We may have to remove the head node
//* So we need a dummy node to handle that case
//* Get the length of the linked list
//* And move to the node just before the node we want to remove
function removeNthNodeFromEndOfList(head, n) {
  if (head === null) return head;

  //* We may have to remove the head node
  let dummy = new ListNode(0);
  dummy.next = head;

  //* 1. Calculate the length of the linked list
  let curr = head;
  let length = 0;
  let count = 0;

  while (curr !== null) {
    length++;
    curr = curr.next;
  }

  //* This is the node BEFORE the one we want to remove
  length -= n;
  curr = dummy;

  //* 2. Travel to the node BEFORE the one we want to remove
  while (count < length) {
    curr = curr.next;
    count++;
  }

  //* Lose the reference to the next node
  curr.next = curr.next.next;

  return dummy.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(1);

const list3 = new ListNode(1);
list3.next = new ListNode(2);

const list4 = new ListNode(1);
list4.next = new ListNode(2);

console.log(removeNthNodeFromEndOfList(list1, 2)); //* 1 -> 2 -> 3 -> 5
console.log(removeNthNodeFromEndOfList(list2, 1)); //* null
console.log(removeNthNodeFromEndOfList(list3, 1)); //* 1
console.log(removeNthNodeFromEndOfList(list4, 2)); //* 2

//* Time: O(n) - It takes O(n) to get the length of the list
//* Then it takes O(n) to travel to the node before the one we want to remove

//* Space: O(1) - The space usage remains constant regardless of the input size
