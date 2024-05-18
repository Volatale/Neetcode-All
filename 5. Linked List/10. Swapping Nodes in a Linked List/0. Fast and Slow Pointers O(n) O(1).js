class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Move the left pointer ahead by k - 1 nodes
//* Create two more pointers
//* Set the "curr" pointer to where left is
//* This guarantees that head to left and right to curr
//* All have the same distance from each other
function swappingNodesInALinkedList(head, k) {
  if (head === null) return head;

  //* 1. Get the kth node from the start
  let left = head;

  for (let i = 0; i < k - 1; i++) {
    left = left.next;
  }

  let curr = left; //* "curr" is set to left as the offset
  let right = head; //* "right" is set to be k - 1 nodes behind curr

  //* 2. Find the right node
  while (curr && curr.next) {
    curr = curr.next;
    right = right.next;
  }

  //* 3. Swap the values
  let temp = left.val;
  left.val = right.val;
  right.val = temp;

  return head;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(7);
list2.next = new ListNode(9);
list2.next.next = new ListNode(6);
list2.next.next.next = new ListNode(6);
list2.next.next.next.next = new ListNode(7);
list2.next.next.next.next.next = new ListNode(8);
list2.next.next.next.next.next.next = new ListNode(3);
list2.next.next.next.next.next.next.next = new ListNode(0);
list2.next.next.next.next.next.next.next.next = new ListNode(9);
list2.next.next.next.next.next.next.next.next.next = new ListNode(5);

console.log(swappingNodesInALinkedList(list1, 2));
console.log(swappingNodesInALinkedList(list2, 5));

//* Time: O(n) - The time taken scales with the number of nodes

//* Space: O(1) - We use the same amount of space regardless of the input size
