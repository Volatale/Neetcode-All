class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Add every value to the array
//* That lets us process the array from both sides at once
//* Thus, we are able to calculate the twin sum easily
function pairSum(head) {
  const nodes = [];

  let maxTwinSum = 0;
  let curr = head;

  //* 1. Add every value to an array
  while (curr !== null) {
    nodes.push(curr.val);
    curr = curr.next;
  }

  let n = nodes.length;

  //* 2. Process both elements at once
  for (let i = 0; i < n / 2; i++) {
    maxTwinSum = Math.max(nodes[i] + nodes[n - 1 - i], maxTwinSum);
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

//* Time: It takes O(n) time to add every node to the results array
//* Then we iterate through half of the array to find the twin sums in O(n) time
