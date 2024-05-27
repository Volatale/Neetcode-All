class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use Floyd's Cycle Detection / Tortoise and the Hare Algorithm
//* Use fast and slow pointers to find the intersection point
//* Set the fast pointer back to the start of the list
//* After doing this, both the slow and fast pointer
//* Slow is technically closer to the node we want
//* But fast is gaining on slow at a rate of 1 per iteration
//* So eventually they will meet on the same node (which is the cycle node)
function linkedListCycleII(head) {
  if (head === null || head.next === null) return null;

  //* Fast and Slow Pointers
  let slow = head;
  let fast = head;

  //* 1. Find the intersection point
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) break;
  }

  //* No Intersection Point = No Cycle
  if (fast === null || fast.next === null) return null;

  //* 2. Both pointers are now the same distance from the cycle node
  fast = head;

  //* 3. Move both pointers at the same rate
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return fast;
}

const list1 = new ListNode(3);
list1.next = new ListNode(2);
list1.next.next = new ListNode(0);
list1.next.next.next = new ListNode(-4);
list1.next.next.next.next = list1.next;

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = list2;

const list3 = new ListNode(1);

console.log(linkedListCycleII(list1));
console.log(linkedListCycleII(list2));
console.log(linkedListCycleII(list3));

//* Time: O(n) - It takes O(n) time to find the intersection node
//* Then it takes O(n) to find the cycle-starter node after that

//* Space: O(1) - We only keep references to nodes that already exist
