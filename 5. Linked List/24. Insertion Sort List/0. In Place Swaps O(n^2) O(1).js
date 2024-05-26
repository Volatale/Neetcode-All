class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* The first node may be changed, so use a dummy node
//* Split the list into a sorted partition and an unsorted partition
//* Set the prev pointer to dummy
//* And the next node to curr.next
//* Find the position where curr (using prev)
//* Place the "curr"node node between prev and curr.next
function insertionSortList(head) {
  if (head === null || head.next === null) return head;

  //* The head node may change, so dummy.next always gives the correct node
  let dummy = new ListNode(0);
  dummy.next = head;

  let curr = head.next; //* The first node is ALWAYS sorted (has no other elements)
  head.next = null; //* Sorted List vs Unsorted List

  while (curr !== null) {
    let prev = dummy; //* Pointer that finds the insert position
    let next = curr.next; //* Retain reference to the REST of the list

    //* Walk the "sorted" list and find the insertion position
    while (prev.next && prev.next.val < curr.val) {
      prev = prev.next;
    }

    //* Put "curr" inbetween prev and curr.next
    curr.next = prev.next;
    prev.next = curr;
    curr = next;
  }

  return dummy.next;
}

const list1 = new ListNode(4);
list1.next = new ListNode(2);
list1.next.next = new ListNode(1);
list1.next.next.next = new ListNode(3);

const list2 = new ListNode(-1);
list2.next = new ListNode(5);
list2.next.next = new ListNode(3);
list2.next.next.next = new ListNode(4);
list2.next.next.next.next = new ListNode(0);

const list3 = new ListNode(100);

console.log(insertionSortList(list1));
console.log(insertionSortList(list2));
console.log(insertionSortList(list3));

//* Time: O(n^2) - In the worst case we have to iterate the entire list "n" times in each iteration
//* It ends up being O(n * (n - 1) / 2)

//* Space: O(1) - We only ever create a single node, and move pointers around
//* So the space usage remains constant
