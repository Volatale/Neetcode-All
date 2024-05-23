class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* We want to create a circle
//* Get the length of the entire list
//* Set curr.next = head; this creates a circle
//* Then, move "head" over by "k"
function rotateList(head, k) {
  if (head === null || head.next === null || k <= 0) return head;

  let length = 1;
  let curr = head;

  //* Get the length of the list so we can % k by list length
  while (curr.next !== null) {
    length++;
    curr = curr.next;
  }

  curr.next = head; //* Create the circular link
  k = k % length; //* Removes unneeded iterations

  //* Move "head" length - k - 1 nodes along
  for (let i = 0; i < length - k - 1; i++) {
    head = head.next;
  }

  const newHead = head.next; //* The "new" head is the NEXT node
  head.next = null; //* Cut off the rest of the list (break the circle)
  return newHead;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(0);
list2.next = new ListNode(9);
list2.next.next = new ListNode(2);

const list3 = new ListNode(10);
list3.next = new ListNode(5);

const list4 = new ListNode(3);
list4.next = new ListNode(6);
list4.next.next = new ListNode(7);
list4.next.next.next = new ListNode(8);
list4.next.next.next.next = new ListNode(9);
list4.next.next.next.next.next = new ListNode(4);

console.log(rotateList(list1, 2)); //* 4 -> 5 -> 1 -> 2 -> 3
console.log(rotateList(list1, 3)); //* 3 -> 4 -> 5 -> 1 -> 2
console.log(rotateList(list2, 1)); //* 2 -> 0 -> 9
console.log(rotateList(list3, 2)); //* 10 -> 5
console.log(rotateList(list4, 4)); //* 7 -> 8 -> 9 -> 4 -> 3 -> 6
console.log(rotateList(new ListNode(3, new ListNode(6, new ListNode(7))), 1));

//* Time: O(n) - The time taken scales with the number of nodes in the input
//* It takes O(n) to get the list length
//* Then it takes O(length - k - 1) time to move "head" along

//* Space: O(1) - The space complexity remains the same regardless of input size
