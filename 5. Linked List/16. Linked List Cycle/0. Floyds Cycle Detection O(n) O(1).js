class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Use Floyd's Cycle-Finding Algorithm
//* In other words, Tortoise and the Hare Algorithm
//* Use fast and slow pointers
//* Every iteration, slow moves by 1
//* Fast moves by 2
//* If there is a cycle, fast will already by in it
//* Fast is moving at twice the rate of slow
//* So the relative velocity it 2 - 1 = 1
//* In other words, "fast" is gaining on "slow"
//* At a rate of 1 node per move
function linkedListCycle(head) {
  if (head === null) return false;

  //* Fast and Slow Pointers
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    //* If there is a cycle, eventually the pointers will meet
    if (slow === fast) return true;
  }

  //* No Cycle
  return false;
}

const list1 = new ListNode(3);
list1.next = new ListNode(2);
list1.next.next = new ListNode(0);
list1.next.next.next = new ListNode(-4);
list1.next.next.next.next = list1;

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = list2;

const list3 = new ListNode(1);

console.log(linkedListCycle(list1));
console.log(linkedListCycle(list2));
console.log(linkedListCycle(list3));

//* Time: O(n) - In the worst case, there is no cycle
//* So we traverse the entire list

//* Space: O(1) - We only keep references to nodes within the list
//* So the space usage does not scale with the size of the input
