class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Get the length of the linked list
//* Find the kth node from the start and from the end
//* Kth from the start is count = k
//* Kth from the end is length - k + 1
function swappingNodesInALinkedList(head, k) {
  if (head === null || k <= 1) return head;

  let length = 0;
  let count = 0;

  let curr = head;

  //* The nodes with the values we want to swap
  let node1 = null;
  let node2 = null;

  //* 1. Get the length of the list
  while (curr !== null) {
    length++;
    curr = curr.next;
  }

  //* Reset curr
  curr = head;

  //* 2. Find the kth node from the start and the end
  while (curr !== null) {
    count++;

    //* Kth node from the start
    if (count === k) {
      node1 = curr;
    }

    //* Kth node from the end
    if (count === length - k + 1) {
      node2 = curr;
    }

    curr = curr.next;
  }

  //* 3. Swap the values of the nodes
  let temp = node1.val;
  node1.val = node2.val;
  node2.val = temp;

  return head;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(7);
list2.next = new ListNode(9);
list2.next.next = new ListNode(6);
list2.next.next.next = new ListNode(6);
list2.next.next.next.next = new ListNode(8);
list2.next.next.next.next.next = new ListNode(7);
list2.next.next.next.next.next.next = new ListNode(3);
list2.next.next.next.next.next.next.next = new ListNode(0);
list2.next.next.next.next.next.next.next.next = new ListNode(9);
list2.next.next.next.next.next.next.next.next.next = new ListNode(5);

console.log(swappingNodesInALinkedList(list1, 2));
console.log(swappingNodesInALinkedList(list2, 5));

//* Time: O(n) - It takes O(n) to get the length of the list
//* Then we iterate through the list one more time to get the nodes we want to swap

//* Space: O(1) - We use the same amount of space regardless of the input size
