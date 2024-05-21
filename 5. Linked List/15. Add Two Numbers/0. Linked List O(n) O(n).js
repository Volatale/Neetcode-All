class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Calculate the sum of the nodes
//* We know that digits range from 0 to 9
//* So to get the actual node value
//* We can do sum % 10; there are 10 possible digits
//* 10 % 10 = 0, so that works out
//* To calculate the "carry", we floor(sum / 10)
//* 6 + 7 = 13. floored(13 / 10) = 1
//* So we know that the NEXT number should have 1 added to sum
//* Rinse and repeat until we are complete
function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(-1); //* To attach the first node to
  let curr = dummy;

  //* Pointers to traverse through the lists
  let left = l1;
  let right = l2;

  //* The largest number a digit can be is 9
  let carry = 0;

  //* Loop while we have nodes left
  //* Or, while we "carried" a value
  while (left || right || carry) {
    //* Start with the carry
    let sum = carry;

    if (left) {
      sum += left.val;
      left = left.next;
    }

    if (right) {
      sum += right.val;
      right = right.next;
    }

    //* Digits range from [0 .. 9], so use result % 10
    //* floor(13 / 10) = 1, so we know to add 1 to the next node
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);

    curr = curr.next;
  }

  //* The head node of the new list
  return dummy.next;
}

const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

const l3 = new ListNode(0);
const l4 = new ListNode(0);

const l5 = new ListNode(9);
l5.next = new ListNode(9);
l5.next.next = new ListNode(9);
l5.next.next.next = new ListNode(9);
l5.next.next.next.next = new ListNode(9);
l5.next.next.next.next.next = new ListNode(9);
l5.next.next.next.next.next.next = new ListNode(9);

const l6 = new ListNode(9);
l6.next = new ListNode(9);
l6.next.next = new ListNode(9);
l6.next.next.next = new ListNode(9);

console.log(addTwoNumbers(l1, l2));
console.log(addTwoNumbers(l3, l4));
console.log(addTwoNumbers(l5, l6));

//* Time: O(n) - We iterate through both lists at once
//* So the time taken scales with the largest of the two lists

//* Space: O(n) - The returned list scales with the largest of the two lists
