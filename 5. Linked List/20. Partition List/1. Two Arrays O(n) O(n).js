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
    this.size = 0;

    for (let i = 0; i < values.length; i++) {
      this.append(values[i]);
    }
  }

  append(val) {
    const newNode = new ListNode(val);

    if (!this.head && !this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
    return this.size;
  }
}

//* Split the values into two arrays
//* "smaller" holds all the values < x
//* "larger" holds all the values >= x
//* Then, create two lists and attach the second to the first
function partitionList(head, x) {
  if (head === null) return head;

  //* Arrays to hold the values that are < x or >= x
  const smaller = [];
  const larger = [];

  let curr = head;

  //* Populate both arrays
  while (curr !== null) {
    if (curr.val < x) {
      smaller.push(curr.val);
    } else {
      larger.push(curr.val);
    }

    curr = curr.next;
  }

  //* Create the first half, then attach the second half to the tail of part 1
  const A = new MyLinkedList(smaller);
  A.tail.next = new MyLinkedList(larger).head;

  return A.head;
}

const list1 = new ListNode(1);
list1.next = new ListNode(4);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(2);
list1.next.next.next.next = new ListNode(5);
list1.next.next.next.next.next = new ListNode(2);

const list2 = new ListNode(2);
list2.next = new ListNode(1);

console.log(partitionList(list1, 3));
console.log(partitionList(list2, 2));

//* Time: O(n) - It takes O(n) time to populate both arrays
//* We have to iterate through the entire linked list
//* Then it takes O(n) time total to create the two new lists

//* Space: O(n) - The space usage scales with the number of input noes
//* We create two linked lists, both with n / 2 length
//* Then we combine both into one list
