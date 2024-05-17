class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use a data structure with fast lookups
//* Store a reference to nodes in headA
//* Then iterate through headB
//* If the set has that node, this is the intersection
//* Return that node
function intersectionOfTwoLinkedLists(headA, headB) {
  const nodes = new Set();

  //* 1. Travel along headA
  let curr = headA;

  //* Store references from headA
  while (curr !== null) {
    nodes.add(curr); //* Add the object (reference) itself
    curr = curr.next;
  }

  //* 2. Travel along headB
  curr = headB;

  while (curr !== null) {
    if (nodes.has(curr)) return curr; //* Found intersection
    curr = curr.next;
  }

  //* No intersection
  return null;
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

//* Space: O(n) - We have to save references to every node in headA
