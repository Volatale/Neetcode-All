class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function iterativeMergeSort(head) {
  if (head === null || head.next === null) return head;

  let size = 1; //* How many elements are in each list partition
  let length = getLength(head);

  while (size < length) {
    let dummy = new ListNode(-Infinity); //* Eliminates edge cases
    let curr = dummy;
    let remaining = head;

    for (let i = 0; i < length; i += 2 * size) {
      let left = remaining;
      let right = split(left, size);
      remaining = split(right, size); //* The elements left AFTER right

      curr.next = merge(left, right); //* Merge the two lists and attach to curr

      //* Move curr to the last element in the "merged" list
      while (curr.next !== null) {
        curr = curr.next;
      }
    }

    head = dummy.next; //* Overwrite head (sorts slowly every iteration)
    width *= 2; //* Size doubles each iteration
  }

  return head;
}

function getLength(head) {
  let length = 0;
  let curr = head;

  while (curr !== null) {
    length++;
    curr = curr.next;
  }

  return length;
}

function split(head, size) {
  let curr = head;

  //* Grab "size" nodes
  while (size > 1 && curr && curr.next) {
    curr = curr.next;
    size--;
  }

  //* Handles null cases
  if (curr === null) return null;

  //* Splits the lists
  let next = curr.next;
  curr.next = null;

  return next;
}

function merge(left, right) {
  //* Dummy makes it easier to connect the first node to
  let dummy = new ListNode(-Infinity);
  let curr = dummy;

  //* Append the smaller node to curr
  while (left && right) {
    if (left.val <= right.val) {
      curr.next = left;
      left = left.next;
    } else {
      curr.next = right;
      right = right.next;
    }

    curr = curr.next;
  }

  //* Pick up the remaining nodes
  if (left) {
    curr.next = left;
  }

  if (right) {
    curr.next = right;
  }

  return dummy.next;
}

const list1 = new ListNode(5);
list1.next = new ListNode(2);
list1.next.next = new ListNode(10);
list1.next.next.next = new ListNode(1);

const list2 = new ListNode(10);
list2.next = new ListNode(3);
list2.next.next = new ListNode(19);
list2.next.next.next = new ListNode(7);
list2.next.next.next.next = new ListNode(18);
list2.next.next.next.next.next = new ListNode(4);
list2.next.next.next.next.next.next = new ListNode(15);
list2.next.next.next.next.next.next.next = new ListNode(5);
list2.next.next.next.next.next.next.next.next = new ListNode(12);
list2.next.next.next.next.next.next.next.next.next = new ListNode(1);
list2.next.next.next.next.next.next.next.next.next.next = new ListNode(16);
list2.next.next.next.next.next.next.next.next.next.next.next = new ListNode(2);

const list3 = new ListNode(5);
list3.next = new ListNode(2);
list3.next.next = new ListNode(3);

const list4 = new ListNode(1);

debugger;
console.log(iterativeMergeSort(list1));
console.log(iterativeMergeSort(list2));
console.log(iterativeMergeSort(list3));
console.log(iterativeMergeSort(list4));

//* Time: O(n log n)

//* Space: O(1)
