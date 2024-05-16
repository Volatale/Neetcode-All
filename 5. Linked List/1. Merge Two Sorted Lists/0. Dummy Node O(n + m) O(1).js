class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use the merge logic from merge sort
//* A dummy node makes it easier to attach the first nodes to
//* Track the progress through each of the lists
//* If left.val <= right.val, then attach the left node
//* Else, attach the right node
//* If there are any remaining nodes, attach them to the rest of the list
function mergeTwoSortedLists(list1, list2) {
  //* Not really necessary, but returns the list that isn't null, or just null
  if (list1 === null || list2 === null) return list1 ?? list2;

  //* We need a node to attach the first node to
  let dummy = new ListNode(0);
  let curr = dummy;

  //* References to the heads of both lists
  let left = list1;
  let right = list2;

  //* Attach the SMALLER node first
  while (left !== null && right !== null) {
    if (left.val <= right.val) {
      curr.next = left; //* Attach the node to "curr"
      left = left.next; //* Move to the next node in the list
    } else {
      curr.next = right;
      right = right.next;
    }

    //* Move curr along to the next node
    curr = curr.next;
  }

  //* Any remaining nodes are already in sorted order, so just attach them
  if (left !== null) {
    curr.next = left;
  }

  if (right !== null) {
    curr.next = right;
  }

  //* dummy.next is the original "head" of the list
  return dummy.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(4);

const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

const list3 = new ListNode();
const list4 = new ListNode();

const list5 = new ListNode();
const list6 = new ListNode(0);

console.log(mergeTwoSortedLists(list1, list2)); //* [1, 1, 2, 3, 4, 4]
console.log(mergeTwoSortedLists(list3, list4)); //* []
console.log(mergeTwoSortedLists(list5, list6)); //* [0]

//* Time: O(n + m) - Where n = list1.length and m = list2.length
//* In the worst case, we have to process every node in both lists

//* Space: O(1) - The space usage remains constant regardless of input size
//* We are keeping references to memory addressess essentially
//* NOT creating new linked lists
