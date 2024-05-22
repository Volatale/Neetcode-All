class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function swapNodesInPairs(head) {
  if (head === null || head.next === null) return head;

  //* We have to swap the head node, dummy makes it easier
  let dummy = new ListNode(0);
  dummy.next = head;

  //* Track where we need to attach the swapped nodes to
  let prev = dummy;
  let curr = head;

  while (curr !== null && curr.next !== null) {
    //* Swap the adjacent nodes
    prev.next = curr.next;
    curr.next = prev.next.next;
    prev.next.next = curr;

    //* Readjust pointers
    prev = curr;
    curr = prev.next;
  }

  return dummy.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);

const list2 = new ListNode(1);

const list3 = new ListNode(4);
list3.next = new ListNode(5);
list3.next.next = new ListNode(8);

const list4 = new ListNode(9);

console.log(swapNodesInPairs(list1)); //* 2 - 1 -> 4 -> 3
console.log(swapNodesInPairs(null)); //* null
console.log(swapNodesInPairs(list2)); //* 1
console.log(swapNodesInPairs(list3)); //* 5 -> 4 -> 8

//* Time: O(n) - The time taken scales with the number of nodes
//* It takes O(1) time swap nodes, and we do this n / 2 times

//* Space: O(1) - The space usage remains constant regardless of the input size
//* We only keep references to specific nodes in the list
