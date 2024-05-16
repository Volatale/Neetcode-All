class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Check the next node's value
//* If it is equal to val, we want to remove that node
//* The easiest way to remove a node is to remove all references to it
//* Therefore, it will be garbage collected
//* If the node's val does NOT equal val, we can keep the node
function removeLinkedListElements(head, val) {
  if (head === null) return head;

  //* We may have to change the head node, dummy makes it easier
  let dummy = new ListNode(0);
  dummy.next = head;

  //* Travels through the list
  let curr = dummy;

  while (curr !== null && curr.next !== null) {
    if (curr.next.val !== val) {
      curr = curr.next;
    } else {
      //* Remove the next node by skipping it (gets GC'd)
      curr.next = curr.next.next;
    }
  }

  //* Return dummy.next and not head, because "head" may have been changed
  return dummy.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(6);
list1.next.next.next = new ListNode(3);
list1.next.next.next.next = new ListNode(4);
list1.next.next.next.next.next = new ListNode(5);
list1.next.next.next.next.next.next = new ListNode(6);

const list2 = new ListNode();

const list3 = new ListNode(7);
list3.next = new ListNode(7);
list3.next.next = new ListNode(7);
list3.next.next.next = new ListNode(7);

console.log(removeLinkedListElements(list1, 6)); //* 1 -> 2 -> 3 -> 4 -> 5
console.log(removeLinkedListElements(list2, 1)); //* null
console.log(removeLinkedListElements(list3, 7)); //* 7 -> 7 -> 7 -> 7

//* Time: O(n) - The time taken scales with the number of nodes
//* In the worst case, we don't remove any elements
//* So we do "n" iterations because there are "n" nodes

//* Space: O(1) - The only extra space we use is creating a dummy node
//* Otherwise, we merely change the pointers of nodes
//* This doesn't use any extra memory that scales with the input size
