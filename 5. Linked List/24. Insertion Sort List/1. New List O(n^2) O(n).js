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

    if (this.size === 0) {
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

//* Create an array out of the values in the list
//* Insertion sort those values
//* Create a new list out of the array
function insertionSortList(head) {
  if (head === null || head.next === null) return head;

  const nums = [];
  let curr = head;

  while (curr !== null) {
    nums.push(curr.val);
    curr = curr.next;
  }

  insertionSort(nums);

  return new SinglyLinkedList(nums).head;
}

function insertionSort(nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    let j = i + 1;

    while (j > 0 && nums[j] < nums[j - 1]) {
      nums[j] ^= nums[j - 1];
      nums[j - 1] ^= nums[j];
      nums[j] ^= nums[j - 1];
      j--;
    }
  }

  return nums;
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

//* Time: O(n^2) - In the worst case, insertion sort is O(n^2)
//* If the array is sorted in descending order, we go from the end to the start every iteration

//* Space: O(n) - The array holds "n" elements, and so does the final returned list
