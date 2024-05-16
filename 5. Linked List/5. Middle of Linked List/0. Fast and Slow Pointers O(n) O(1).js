class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function middleOfLinkedList(head) {
  if (head === null) return head;

  //* Use slow and fast pointers
  let slow = head;
  let fast = head;

  //* By the time fast can't move anymore, slow is halfway through the list
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //* This is a "right" biased mid (in cases where list length is evn)
  return slow;
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

//* Time: O(n) - We only iterate over half of the total nodes
//* So the true time complexity is O(n / 2), but we simplify to O(n)

//* Space: O(1) - We only keep references to different nodes in the list
//* The space usage does not scale with the input size
