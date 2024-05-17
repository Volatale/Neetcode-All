class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Instead of modifying the linked list itself
//* We can use a stack to effectively reverse the list
//* Find the mid point in the linked list
//* Then add the remaining nodes to a stack
//* A stack lets us pop in reverse order (LIFO)
//* So then we can iterate from the START of the list again
//* And within each iteration, pop from the stack
function pairSum(head) {
  let maxTwinSum = 0;
  let curr = head;

  //* Holds the latter half of the nodes
  //* A stack pops in reverse order, so we effectively reversed the second half
  //* Without actually modifying the list itself
  const stack = [];

  //* 1. Find the middle point
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  //* 2. Add the rest of the nodes to the stack (so we don't have to reverse)
  while (slow) {
    stack.push(slow);
    slow = slow.next;
  }

  //* 3. Find the maximum twin sum
  //* If we had 3 -> 4 -> 5 -> 4, then the stack looks like [5, 4]
  //* So we process 3 (0) and 4 (3) at the same time, then 4 (1) and 5 (2)

  while (stack.length > 0) {
    maxTwinSum = Math.max(curr.val + stack.pop().val, maxTwinSum);
    curr = curr.next;
  }

  return maxTwinSum;
}

const list1 = new ListNode(4);
list1.next = new ListNode(2);
list1.next.next = new ListNode(2);
list1.next.next.next = new ListNode(3);

const list2 = new ListNode(1);
list2.next = new ListNode(100000);

const list3 = new ListNode(5);
list3.next = new ListNode(4);
list3.next.next = new ListNode(2);
list3.next.next.next = new ListNode(1);

console.log(pairSum(list1)); //* 7
console.log(pairSum(list2)); //* 100001
console.log(pairSum(list3)); //* 6

//* Time: O(n) - Finding the mid point in the list takes O(n) time
//* The time taken to push the remaining elements to the stack is also O(n)
//* Finally, we find the maximum twin sum which ALSO takes O(n) time

//* Space: O(n) - The stack's size increases as the input size increases
//* If the list had two nodes: [1]
//* If the list had 6 nodes: [3, 4, 5]
