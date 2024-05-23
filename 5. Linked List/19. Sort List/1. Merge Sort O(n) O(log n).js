class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Merge Sort, but on a linked list
//* Recursively split the list in half
//* After, merge both lists together
function sortList(head) {
  //* Base Case, no nodes, or only 1 node
  if (head === null || head.next === null) return head;

  //* Split the list in half
  let prev = null;
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  //* Detach the first half from the second
  prev.next = null;

  const left = sortList(head);
  const right = sortList(slow);

  return merge(left, right);
}

function merge(l1, l2) {
  //* We need something to attach the first node to
  const dummy = new ListNode(0);
  let curr = dummy;

  let left = l1;
  let right = l2;

  //* Repeatedly append the smaller node
  while (left !== null && right !== null) {
    if (left.val <= right.val) {
      curr.next = left;
      left = left.next;
    } else {
      curr.next = right;
      right = right.next;
    }

    //* Progress to the next node
    curr = curr.next;
  }

  //* Pick up the remaining nodes on the leftover list
  //* It will already be sorted
  if (left !== null) {
    curr.next = left;
  }

  if (right !== null) {
    curr.next = right;
  }

  //* The head of the "new" list
  return dummy.next;
}

const list1 = new ListNode(-1);
list1.next = new ListNode(5);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(0);

const list2 = new ListNode(5);
list2.next = new ListNode(8);
list2.next.next = new ListNode(1);
list2.next.next.next = new ListNode(0);

const list3 = new ListNode(1);

console.log(sortList(list1)); //* -1 -> 0 -> 3 -> 4 -> 5
console.log(sortList(list2)); //* 0 -> 1 -> 5 -> 8
console.log(sortList(list3)); //* 1
console.log(sortList(null)); //* null

//* Time: O(n log n) - We split the list each call
//* And the merging step takes O(n)

//* Space: O(log n) - There are log n recursive calls
