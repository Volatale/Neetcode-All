class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor(values = []) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    for (let val of values) {
      this.append(val);
    }
  }

  append(val) {
    const newNode = new ListNode(val);

    if (this.head === null && this.tail === null) {
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

//* Store the node values within an array
//* Reverse the array starting at index left - 1 and right - 1
//* Then create a new linked list using that array
function reverseListII(head, left, right) {
  if (head === null || head.next === null) return head;

  const values = [];
  let curr = head;

  //* Push every element to the array
  while (curr !== null) {
    values.push(curr.val);
    curr = curr.next;
  }

  //* left and right are 1-indexed, whereas arrays are 0-indexed
  reverse(values, left - 1, right - 1);

  return new SinglyLinkedList(values).head;
}

function reverse(nums, left, right) {
  while (left < right) {
    nums[left] ^= nums[right];
    nums[right] ^= nums[left];
    nums[left] ^= nums[right];

    left++;
    right--;
  }
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(10);
list2.next = new ListNode(50);
list2.next.next = new ListNode(100);

const list3 = new ListNode(5);

console.log(reverseListII(list1, 2, 4)); //* 1 -> 4 -> 3 -> 2 -> 5
console.log(reverseListII(list2, 1, 3)); //* 100 -> 50 -> 10
console.log(reverseListII(list3, 1, 1)); //* 5
console.log(reverseListII(null, 1, 1)); //* 5

//* Time: O(n) - It takes O(n) time to iterate through the entire list
//* Then it takes O(n) time in the worst case to reverse the array
//* Finally, it takes O(n) time to create the new list

//* Space: O(n) - The space usage scales with the number of nodes in the input
//* The nodes array contains "n" elements, and so does the returned list
