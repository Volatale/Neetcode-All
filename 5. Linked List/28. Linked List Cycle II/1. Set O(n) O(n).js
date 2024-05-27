class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use a set to track the nodes we have found
//* If there is a cycle, we will eventually revisit a node
//* Return this node because it is guaranteed to be the cycle-starter
function linkedListCycleII(head) {
  if (head === null || head.next === null) return head;

  //* Tracks references to the nodes we have found so far
  const nodes = new Set();
  let curr = head;

  while (curr !== null) {
    if (nodes.has(curr)) return curr; //* Cycle Detected at THIS node

    nodes.add(curr);
    curr = curr.next;
  }

  return head;
}

const list1 = new ListNode(3);
list1.next = new ListNode(2);
list1.next.next = new ListNode(0);
list1.next.next.next = new ListNode(-4);
list1.next.next.next.next = list1.next;

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = list2;

const list3 = new ListNode(1);

console.log(linkedListCycleII(list1));
console.log(linkedListCycleII(list2));
console.log(linkedListCycleII(list3));

//* Time: O(n) - The time taken scales with the number of nodes
//* The list is not guaranteed to have a cycle in it
//* But if it doesn't, then you have to process every node in the list

//* Space: O(n) - In the worst case, there is no cycle in the list
//* So the set contains a reference to every node
