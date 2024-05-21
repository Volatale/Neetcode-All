class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use a set to hold node references
//* Every iteration, add the current node to the set
//* If curr already exists in the set, there is a cycle
//* Singly Linked Lists usually end at "null"
//* So if there is no way to get to null, there HAS to be a cycle
function linkedListCycle(head) {
  if (head === null) return false;

  //* Holds references to the nodes traversed
  const nodes = new Set();

  let curr = head;

  while (curr !== null) {
    //* If the set already has curr, there is a cycle
    if (nodes.has(curr)) return true;

    nodes.add(curr);
    curr = curr.next;
  }

  //* No Cycle
  return false;
}

const list1 = new ListNode(3);
list1.next = new ListNode(2);
list1.next.next = new ListNode(0);
list1.next.next.next = new ListNode(-4);
list1.next.next.next.next = list1;

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = list2;

const list3 = new ListNode(1);

console.log(linkedListCycle(list1));
console.log(linkedListCycle(list2));
console.log(linkedListCycle(list3));

//* Time: O(n) - In the worst case, there is no cycle
//* Therefore, we traverse the entire list

//* Space: O(n) - In the worst case, there is no cycle
//* So we add a reference to every node to the set
