class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKSortedLists(lists) {
  if (lists === null || lists.length === 0) return null;

  return divideAndConquer(lists, 0, lists.length - 1);
}

//* Repeatedly halve the search space
function divideAndConquer(lists, low, high) {
  if (low > high) return null; //* Invalid

  if (low === high) return lists[low]; //* Size = 1

  let mid = low + ((high - low) >> 1); //* Left leaning mid

  const left = divideAndConquer(lists, low, mid);
  const right = divideAndConquer(lists, mid + 1, high);

  return merge(left, right);
}

//* Merge the lists
function merge(left, right) {
  let dummy = new ListNode(0);
  let curr = dummy;

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

  if (left) {
    curr.next = left;
  }

  if (right) {
    curr.next = right;
  }

  return dummy.next;
}

const list1 = new ListNode(1);
list1.next = new ListNode(4);
list1.next.next = new ListNode(5);

const list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);

const list3 = new ListNode(2);
list3.next = new ListNode(6);

const list4 = new ListNode(10);
list4.next = new ListNode(9);

const list5 = new ListNode(8);
const list6 = new ListNode(-1);

const list7 = new ListNode(10);
const list8 = new ListNode(50);
const list9 = null;

console.log(mergeKSortedLists([list1, list2, list3]));
console.log(mergeKSortedLists([list4, list5, list6]));
console.log(mergeKSortedLists([list7, list8, list9]));
console.log(mergeKSortedLists([null, null]));

//* Time: O(n log k)

//* Space: O(k)
