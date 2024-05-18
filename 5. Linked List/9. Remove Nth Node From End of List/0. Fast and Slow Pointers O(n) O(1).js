class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use fast and slow pointers
//* The fast pointer should be "n" nodes ahead of slow
//* Then when "fast" can't move anymore, slow will still be able to
//* Slow will be at the node just before the node we want to remove
//* So then we lose the reference to the next node
//* slow.next = slow.next.next
//* You know this will be valid because otherwise "fast" will be null
function removeNthNodeFromEndOfList(head, n) {
  if (head === null) return head;

  //* We might have to remove the head node
  let dummy = new ListNode(0);
  dummy.next = head;

  //* 1. Move fast ahead by "n" nodes
  let slow = dummy;
  let fast = dummy;

  for (let i = 0; i < n; i++) {
    if (fast === null) return null;
    fast = fast.next;
  }

  //* 2. Move to the end of the list
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  //* Lose the reference to the next node
  slow.next = slow.next.next;

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

//* Time: O(n) - It takes O(n) time to move fast ahead in the worst case
//* Then it takes O(n) time to move both pointers ahead

//* Space: O(1) - The space usage remains constant regardless of the input size
//* We only keep references to the same linked list
