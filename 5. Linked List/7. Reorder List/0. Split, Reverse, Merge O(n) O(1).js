class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* The returned list is in the order: 0 -> n - 1 -> 1 -> n - 2 -> n - 3
//* Take this list: 1 -> 2 -> 3 -> 4 -> 5 - > 6
//* That gives us: 1 -> 6 -> 2 -> 5 -> 3 -> 4
//* If you look carefully, you can see the following patterns:
//* The 2 -> 3 Pattern
//* And the 6 -> 5 -> 4 pattern
//* So we should split the list into two (technically 3 since the first node is not connected)
//* That gives you 2 -> 3, and 4 -> 5 -> 6
//* Reverse list 2 ONLY, then you get 6 -> 5 -> 4
//* Then, we just merge both lists into one
//* 1 -> 6 -> 2 -> 5 -> 3 -> 4
function reorderList(head) {
  //* If we only have 1 node, the reordering results in the same node
  if (head === null || head.next === null) return head;

  let curr = head;

  //* 1. Find middle point
  let prevStart = null;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    prevStart = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  //* Detach the first half from the second
  prevStart.next = null;

  //* 2. Split the list into two (2 -> 3 and 4 -> 5 -> 6)
  //* The first node is ALWAYS the first in the list
  let first = head.next;
  let second = slow;

  //* 3. Reverse the SECOND list
  second = reverseList(second);

  //* 4. Merge the two lists with the first
  while (first || second) {
    //* Add SECOND first
    if (second) {
      curr.next = second;
      second = second.next;
      curr = curr.next;
    }

    //* Add FIRST next
    if (first) {
      curr.next = first;
      first = first.next;
      curr = curr.next;
    }
  }

  return head;
}

function reverseList(curr) {
  let prev = null;
  let next = null;

  while (curr !== null) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = new ListNode(3);
list2.next.next.next = new ListNode(4);
list2.next.next.next.next = new ListNode(5);

const list3 = new ListNode(5);

const list4 = new ListNode();

const list5 = new ListNode(1);
list5.next = new ListNode(2);
list5.next.next = new ListNode(3);
list5.next.next.next = new ListNode(4);
list5.next.next.next.next = new ListNode(5);
list5.next.next.next.next.next = new ListNode(6);

console.log(reorderList(list1)); //* 1 -> 4 -> 2 -> 3
console.log(reorderList(list2)); //* 1 -> 5 -> 2 -> 4 -> 3
console.log(reorderList(list3)); //* 5
console.log(reorderList(list4)); //* null
console.log(reorderList(list5)); //* 1 -> 6 -> 2 -> 5 -> 3 - > 4

//* Time: O(n) - It takes O(n) time to find the middle point in the list
//* O(n) time to reverse the second list
//* And then it takes O(n) to merge the two lists together

//* Space: O(1) - The space usage remains the same regardless of input size
//* We are essentially maintaining references to memory addresses
