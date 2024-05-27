class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseNodesInKGroup(head, k) {
  if (head === null || k <= 1) return head;

  //* We may have to change the head node, this removes edge cases
  let dummy = new ListNode(0);
  dummy.next = head;

  let prevGroupTail = dummy;
  let curr = head;

  while (curr !== null) {
    //* Mark the start of the reversal group
    let groupStart = prevGroupTail.next;

    //* Travel forward "k" nodes using "curr"
    for (let i = 0; i < k; i++) {
      if (curr === null) {
        return dummy.next; //* Handle cases where there aren't "k" nodes left
      }

      curr = curr.next;
    }

    prevGroupTail.next = reverseList(groupStart, curr); //* Reverse the group
    groupStart.next = curr; //* Attach the reversed list to the
    prevGroupTail = groupStart; //* Find the new tail position
  }

  return dummy.next;
}

function reverseList(head, limit) {
  let curr = head;
  let prev = null;

  while (curr !== limit) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);
list1.next.next.next.next.next = new ListNode(6);

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = new ListNode(3);
list2.next.next.next = new ListNode(4);
list2.next.next.next.next = new ListNode(5);

const list3 = new ListNode(10);
list3.next = new ListNode(50);
list3.next.next = new ListNode(100);

const list4 = new ListNode(5);

console.log(reverseNodesInKGroup(list1, 2)); //* 1 -> 4 -> 3 -> 2 -> 5
console.log(reverseNodesInKGroup(list2, 1)); //* 100 -> 50 -> 10
console.log(reverseNodesInKGroup(list3, 3)); //* 5
console.log(reverseNodesInKGroup(null, 1)); //*

//* Time: O(n) - We process each node in the list once
//* The number of reversals is n / k, and a reversal takes O(n) in the worst case
//* We don't do "k" inner loop iterations for every outer loop iteration
//* So the time complexity would be O(n + k) to be specific, but "k" is a constant and smaller than "n"

//* Space: O(1) - The space usage remains constant regardless of the input size
//* We only ever create one dummy node each call, and modify pointers to nodes othewise
