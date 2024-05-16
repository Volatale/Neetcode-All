class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let i = 0; i < values.length; i++) {
      this.enqueue(values[i]);
    }
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this.length;
  }
}

//* Create an array to hold all of the unique values
//* Track the last value found
//* We know that the linked list is sorted
//* So nodes toward the right cannot be < the current node
//* If the current node is not equal to the last found value
//* Then we can push it to the array; it is unique
//* Return a new linked list created using these unique values
function removeDuplicatesFromSortedList(head) {
  if (head === null) return null;

  //* Stores the values that are unique
  const result = [];

  let curr = head;
  let lastVal = -Infinity;

  //* Push any singular value to the array
  while (curr !== null) {
    if (curr.val !== lastVal) {
      result.push(curr.val);
      lastVal = curr.val; //* Avoid pushing this same value again
    }

    curr = curr.next;
  }

  //* Return a new list created using the values in "results"
  return new LinkedList(result).head;
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

//* Time: O(n) - It takes O(n) time to iterate through every node
//* Then it takes O(n) time to create the new linked list in the worst case
//* We might not remove any value at all, if every node is unique

//* Space: O(n) - Both the results array and returned linked list
//* Scale with the size of the input
//* In the worst case, we don't remove any elements
//* Thus, both the results array AND the linked list have "n" length
