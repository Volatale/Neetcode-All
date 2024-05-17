class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* A + B = B + A, so we have commutativity
//* So if both the lengths are different
//* if A has 5 nodes, and B has 6
//* 5 + 6 = 11
//* 6 + 5 = 11
//* That means traveling along BOTH paths means both will converge
//* Traveling along only one list leaves an offset
//* That offset is dealt with by traveling along the other path
function intersectionOfTwoLinkedLists(headA, headB) {
  //* Pointers to travel through both lists
  let A = headA;
  let B = headB;

  while (A !== B) {
    if (A !== null) {
      A = A.next;
    } else {
      A = headB; //* A reached the end of headA, move to headB
    }

    if (B !== null) {
      B = B.next;
    } else {
      B = headA; //* A reached the end of headA, move to headB
    }
  }

  //* Either the intersection node, or null
  return A;
}

const list1 = new ListNode(4);
list1.next = new ListNode(1);
const intersect1 = new ListNode(8);
intersect1.next = new ListNode(4);
intersect1.next.next = new ListNode(5);
list1.next.next = intersect1;

const list2 = new ListNode(5);
list2.next = new ListNode(6);
list2.next.next = new ListNode(1);
list2.next.next.next = intersect1;

console.log(intersectionOfTwoLinkedLists(list1, list2));

//* Time: O(n + m) - We have to iterate through both lists
//* Both lists can have a different length

//* Space: O(1) - The space usage remains the same regardless of input lengths
