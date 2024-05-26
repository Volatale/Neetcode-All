class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

//* Firstly, create an array of k length where each element is "null"
//* Get the length of the entire list
//* Calculate the average size of each list
//* Figure out the remainder left over (if necessary)
//* Then, begin iterating through the list
//* Take into account the remainder, and push the current node to the array
//* Then, iterate "avgSize" + "remainder" times, and detach this node from the next
//* The NEXT node is the head of the next list, so we need to do prev.next = null
//* Decrement remainder so we don't add too many nodes for the next iteration
function splitLinkedListInParts(head, k) {
  if (head === null) return new Array(k).fill(null);

  //* Assume every node is null by default
  const results = new Array(k).fill(null);

  let curr = head; //* Tracks the current node
  let length = 0;

  //* Get the length of the list so we can determine average list size
  while (curr !== null) {
    length++;
    curr = curr.next;
  }

  let avgSize = Math.floor(length / k); //* The "general" size of each list
  let remainder = length % k; //* Whatever is left over (10 % 3 means 1 node is leftover)

  curr = head;
  let prev = null; //* Prev lets us do prev.next to separate lists

  for (let i = 0; curr && i < k; i++) {
    //* Essentially, we push the entire list, then detach the rest later
    results[i] = curr;

    //* Move curr ahead by avgSize + remainder nodes
    for (let j = 0; j < avgSize + (remainder > 0 ? 1 : 0); j++) {
      prev = curr;
      curr = curr.next;
    }

    prev.next = null; //* Separate the lists like this
    remainder--;
  }

  return results;
}

const list1 = new ListNode(1);
list1.next = new ListNode(2);
list1.next.next = new ListNode(3);
list1.next.next.next = new ListNode(4);
list1.next.next.next.next = new ListNode(5);
list1.next.next.next.next.next = new ListNode(6);
list1.next.next.next.next.next.next = new ListNode(7);
list1.next.next.next.next.next.next.next = new ListNode(8);
list1.next.next.next.next.next.next.next.next = new ListNode(9);
list1.next.next.next.next.next.next.next.next.next = new ListNode(10);

const list2 = new ListNode(1);
list2.next = new ListNode(2);
list2.next.next = new ListNode(3);

console.log(splitLinkedListInParts(list1, 2));
console.log(splitLinkedListInParts(list1, 3));
console.log(splitLinkedListInParts(list2, 5));
console.log(splitLinkedListInParts(list2, 2));
console.log(splitLinkedListInParts(null, 2));

//* Time: O(n + k) - There are "k" outer loop iterations
//* And there are "n" inner loop iterations
//* At worst, every node will be processed once
//* We don't do "n" iterations for every outer iteration, so its O(n + k)

//* Space: O(k) - The space usage scales with "k"
//* Regardless of the length of the list, the array has "k" spaces
//* Those spaces are either filled by nodes, or null
