class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyLinkedList {
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

//* Create an array that holds all of the values we want to keep
//* If curr.val === val, we want to skip that element
//* Don't add it to the array
//* Return a NEW linked list that built using newList
function removeLinkedListElements(head, val) {
  if (head === null) return head;

  //* Holds any valid "val", turns into the new list
  const newList = [];

  //* Travels through the list
  let curr = head;

  while (curr !== null) {
    //* Only add VALID values to newList
    if (curr.val !== val) {
      newList.push(curr.val);
    }

    curr = curr.next;
  }

  //* Return the head of a new linked list created through newList values
  return new MyLinkedList(newList).head;
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

//* Time: O(n) - It takes O(n) time to iterate over every node
//* In the worst case, the new list has the same number of elements

//* Space: O(n) - In the worst case, we don't remove any elements from the list
