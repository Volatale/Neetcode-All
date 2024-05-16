class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Get the middle node
//* Split the list into two halves
//* Reverse the second half
//* Then iterate through both lists at the same time
//* If you find a value that !== the other, then it is NOT a palindrome
function palindromeLinkedList(head) {
  if (head === null || head.next === null) return true;

  //* 1. Find the middle node (right-biased mid)

  //* Fast and Slow Pointers + Prev
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //* 2. Reverse the second half of the list
  let prev = null;
  let next = null;

  while (slow !== null) {
    next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  //* 3. Check for palindromes using the above lists

  //* Both of these point to a seperate linked list now
  let left = head;
  let right = prev;

  while (left !== null && right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(2);
list.next.next.next = new ListNode(1);

const list2 = new ListNode(1);
list2.next = new ListNode(2);

const list3 = new ListNode(5);

const list4 = new ListNode(1);
list4.next = new ListNode(10);
list4.next.next = new ListNode(10);
list4.next.next.next = new ListNode(2);

console.log(palindromeLinkedList(list)); //* True
console.log(palindromeLinkedList(list2)); //* False
console.log(palindromeLinkedList(list3)); //* True
console.log(palindromeLinkedList(list4)); //* False

//* Time: O(n) - It takes O(n) time to find the middle node (O(n / 2))
//* Then it takes O(n) to reverse the second half of the list (O(n / 2) again)
//* Finally, it takes O(n) to check for palindromes in the worst case (O(n / 2) once again)

//* Space: O(1) - We are merely modifying the pointers within the linked list
//* The memory usage does not scale with the input size
