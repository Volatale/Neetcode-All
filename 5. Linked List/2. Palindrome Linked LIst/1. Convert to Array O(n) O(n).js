class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Add every value that exists in a node to an array
//* Then check if that array is a palindrome, return true
function palindromeLinkedList(head) {
  if (head === null) return head;

  //* A list that holds the values of every node
  const nums = [];

  let curr = head;

  while (curr !== null) {
    nums.push(curr.val);
    curr = curr.next;
  }

  //* Check if the array is a palindrome
  for (let i = 0; i < nums.length / 2; i++) {
    if (nums[i] !== nums[nums.length - i - 1]) return false;
  }

  return true;
}

const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(2);
list.next.next.next = new ListNode(1);

const list2 = new ListNode(1);
list2.next = new ListNode(2);

const list3 = new ListNode(5);

const list4 = new ListNode(1);
list4.next = new ListNode(10);
list4.next.next = new ListNode(10);
list4.next.next.next = new ListNode(2);

console.log(palindromeLinkedList(list)); //* True
console.log(palindromeLinkedList(list2)); //* False
console.log(palindromeLinkedList(list3)); //* True
console.log(palindromeLinkedList(list4)); //* False

//* Time: O(n) - It takes O(n) time to iterate over every node
//* Then it takes O(n / 2) time to check for the palindrome
//* O(n / 2) simplifies to O(n)

//* Space: O(n) - The array scales linearly in size with the number of nodes
