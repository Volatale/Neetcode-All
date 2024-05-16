class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Get the lenth of the linked list
//* Divide the length by 2
//* Reset curr to the head of the list
//* Iterate up until the middle node and return that
function middleOfLinkedList(head) {
  if (head === null) return head;

  let curr = head;
  let half = 0;
  let count = 0;

  //* Get the length of the list
  while (curr !== null) {
    curr = curr.next;
    half++;
  }

  //* Reset curr to head
  curr = head;

  half = Math.floor(half / 2);

  //* Move to the middle node (right biased)
  while (count < half) {
    count++;
    curr = curr.next;
  }

  //* Return the middle node
  return curr;
}

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);
list.next.next.next.next = new ListNode(5);

const list2 = new ListNode(4);
list2.next = new ListNode(5);
list2.next.next = new ListNode(6);

const list3 = new ListNode(10);

const list4 = new ListNode(2);
list4.next = new ListNode(4);
list4.next.next = new ListNode(6);
list4.next.next.next = new ListNode(8);

console.log(middleOfLinkedList(list)); //* 3
console.log(middleOfLinkedList(list2)); //* 5
console.log(middleOfLinkedList(list3)); //* 10
console.log(middleOfLinkedList(list4)); //* 4

//* Time: O(n) - We iterate through the entire linked list once
//* So that takes O(n) time, then we iterate through half of the list
//* So O(n / 2). O(n) + O(n / 2) = O(n)

//* Space: O(1) - We only keep references to different nodes in the list
//* The space usage does not scale with
