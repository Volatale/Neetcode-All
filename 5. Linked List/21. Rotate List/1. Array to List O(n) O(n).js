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

//* Push every node value to an array
//* Rotate the array by "k" spaces
//* Build a new linked list using that array
function rotateList(head, k) {
  if (head === null || k <= 0) return head;

  let nodes = [];
  let curr = head;

  //* Push every node value to the array
  while (curr !== null) {
    nodes.push(curr.val);
    curr = curr.next;
  }

  //* Rotate the array by "k" places
  rotateArray(nodes, k);

  //* Build a new linked list using the rotated array
  return new SinglyLinkedList(nodes).head;
}

function rotateArray(nums, k) {
  k = k % nums.length;

  reverse(nums, 0, nums.length - 1); //* Reverse the entire array
  reverse(nums, 0, k - 1); //* Reverse from 0 to k - 1
  reverse(nums, k, nums.length - 1); //* Reverse from k to end
}

function reverse(nums, left, right) {
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);

const list2 = new ListNode(0);
list2.next = new ListNode(9);
list2.next.next = new ListNode(2);

const list3 = new ListNode(10);
list3.next = new ListNode(5);

const list4 = new ListNode(3);
list4.next = new ListNode(6);
list4.next.next = new ListNode(7);
list4.next.next.next = new ListNode(8);
list4.next.next.next.next = new ListNode(9);
list4.next.next.next.next.next = new ListNode(4);

console.log(rotateList(list1, 2)); //* 4 -> 5 -> 1 -> 2 -> 3
console.log(rotateList(list2, 1)); //* 2 -> 0 -> 9
console.log(rotateList(list3, 2)); //* 10 -> 5
console.log(rotateList(list4, 4)); //* 7 -> 8 -> 9 -> 4 -> 3 -> 6

//* Time: O(n) - The time taken to push every value to the array scales with "n"
//* Then, it takes O(n) time to rotate the array by "k" spaces
//* Finally, it takes O(n) time to create the new linked list

//* Space: O(n) - The intermediate array holds "n" values (same as the number of nodes)
//* The returned list also scales with "n", since it has "n" new nodes
