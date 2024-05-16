class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* If curr.next.val === curr.val
//* That means that the NEXT node after this one is a duplicate
//* In which case, we want to "remove" it from the list
//* So we say curr.next = curr.next.next
//* And DON'T progress curr to the next node
//* This means that we merely removed the next node from the list
//* The next node after this could ALSO be a duplicate though
//* So that is why we don't progres curr
function removeDuplicatesFromSortedList(head) {
  if (head === null) return head;

  let curr = head;

  while (curr !== null && curr.next !== null) {
    //* If the next node has the same value, it is a duplicate
    if (curr.next.val === curr.val) {
      curr.next = curr.next.next; //* Remove the next node from the list
    } else {
      curr = curr.next; //* We know the next node is not a duplicate
    }
  }

  return head;
}

const list1 = new ListNode(1);
list1.next = new ListNode(1);
list1.next.next = new ListNode(2);

const list2 = new ListNode(1);
list2.next = new ListNode(1);
list2.next.next = new ListNode(2);
list2.next.next.next = new ListNode(3);
list2.next.next.next.next = new ListNode(3);

const list3 = new ListNode(1);
list3.next = new ListNode(1);
list3.next.next = new ListNode(1);
list3.next.next.next = new ListNode(1);
list3.next.next.next.next = new ListNode(1);

const list4 = new ListNode();

console.log(removeDuplicatesFromSortedList(list1)); //* 1 -> 2
console.log(removeDuplicatesFromSortedList(list2)); //* 1 -> 2 -> 3
console.log(removeDuplicatesFromSortedList(list3)); //* null
console.log(removeDuplicatesFromSortedList(list4)); //* null

//* Time: O(n) - In the worst case, we don't have any duplicates
//* We iterate through every node in the linked list

//* Space: O(1) - The space usage remains the same regardless of input size
