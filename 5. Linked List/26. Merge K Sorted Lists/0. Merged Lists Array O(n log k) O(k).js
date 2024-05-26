class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Track the merged lists we have
//* We want to merge in groups of two, so i += 2 each iteration
//* We know lists[i] will be valid, but not lists[i + 1], so ensure it is within bounds
//* If its not, just set it to null; there is no list in that position
//* Merge the pair of lists, and then push the merged list to "mergedLists"
//* After the inner iteration, set lists = mergedLists and repeat until completion
//* The while loop condition wants us to have MORE THAN 1 list remaining
//* So if there is only 1 list left, there is nothing to merge, thus return lists[0]
//* lists[0] contains the fully merged, sorted list
function mergeKSortedLists(lists) {
  if (lists === null || lists.length === 0) return null;

  //* While we still have lists to merge
  while (lists.length > 1) {
    const mergedLists = [];

    //* We are taking lists in groups of 2, so increment by 2 each time
    for (let i = 0; i < lists.length; i += 2) {
      const left = lists[i];
      const right = i + 1 < lists.length ? lists[i + 1] : null; //* Don't out of bounds

      //* Merge the lists  and push to the new array
      mergedLists.push(merge(left, right));
    }

    //* Overwrite the original lists with the merged
    lists = mergedLists;
  }

  //* Only 1 list remains now, so just return that one
  return lists[0];
}

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

//* Time: O(n log k) - "n" represents the number of lists we have initially
//* The size of lists halves each iteration, since we merge two elements each inner iteration
//* It takes O(n) to merge the two lists together, and we do this "log k" times
//* If k is 8, 8 / 2 = 4. 4 / 2 = 2. 2 / 2 = 1
//* 2**3 = 8, log2(8) = 3

//* Space: O(k) - The merging portion uses no extra space other than a dummy node
//* The auxillary array "mergedLists" scales in space with the number of lists we have initially
//* If "k" is 8, then mergedLists will have at most 4 length (for the first iteration)
//* Then its size is halved by 2 each subsequent iteration (8 -> 4 -> 2 ->1)
