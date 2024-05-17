class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Singly Linked Lists don't let us iterate backwards
//* And even if they did, you'd need the nodes on the right to link to their left
//* To solve that issue, we can reverse the second half of the list
//* And then that lets us iterate through both the FRONT and BACK nodes at the same time
function pairSum(head) {
  let maxTwin = 0;

  //* 1. Find the middle of the list
  let slow = head;
  let fast = head;
  let prevStart = null;

  while (fast && fast.next) {
    prevStart = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  //* Detach the first half from the second
  prevStart.next = null;

  //* 2. Reverse the second part of the list
  let prev = null;
  let next = null;

  while (slow !== null) {
    next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  //* 3. Find the maximum twin sums
  let left = head;
  let right = prev;

  //* Both lists are equal length
  while (left && right) {
    maxTwin = Math.max(left.val + right.val, maxTwin);

    //* Progress the pointers
    left = left.next;
    right = right.next;
  }

  return maxTwin;
}

const list1 = new ListNode(4);
list1.next = new ListNode(2);
list1.next.next = new ListNode(2);
list1.next.next.next = new ListNode(3);

const list2 = new ListNode(1);
list2.next = new ListNode(100000);

const list3 = new ListNode(5);
list3.next = new ListNode(4);
list3.next.next = new ListNode(2);
list3.next.next.next = new ListNode(1);

console.log(pairSum(list1)); //* 7
console.log(pairSum(list2)); //* 100001
console.log(pairSum(list3)); //* 6

//* Time: O(n) - Finding the mid point in a linked list takes O(n) time
//* Reversing a linked list also takes O(n) time
//* Then, we iterate through both sides of the linked list at once
//* Effectively, we process every node, so O(n / 2) time, which simplifies to O(n)

//* Space: O(1) - We only keep references to memory addresses
//* So the space usage remains constant regardless of input size
