class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.length === 0) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (this.length === 0) return undefined;

    const front = this.front;

    if (this.length === 1) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;
    return front.val;
  }
}

//* We are in a permanent cycle of draw -> skip -> draw -> skip
//* Sort the array to ensure every card is in order
//* Use a queue as a dispensary for index of the next card
//*     - After dequeuing, set result[i] = that card
//*     - Then, we need to SKIP the next card (as long as there is one)
//*         - Dequeue the top card and enqueue it (this puts it at the back of the queue)
function deckRevealedIncreasing(deck) {
  //* There are no cards
  if (deck.length === 0) return 0;

  const n = deck.length;

  //* Sort to ensure the cards are monotonically increasing in value
  deck.sort((a, b) => a - b);

  const result = new Array(n).fill(0);

  //* We want to populate the queue with every index (value)
  const values = [];
  for (let i = 0; i < n; i++) {
    values.push(i);
  }

  //* Acts as a dispensary for where the next index should go
  const queue = new MyQueue(values);

  //* Process all of the cards
  for (let card of deck) {
    const i = queue.dequeue();
    result[i] = card;

    //* Skip the next and put it at the back of the queue
    if (!queue.isEmpty()) {
      queue.enqueue(queue.dequeue());
    }
  }

  return result;
}

console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7])); //* [2, 13, 3, 11, 5, 17, 7]
console.log(deckRevealedIncreasing([1, 1000])); //* [1, 1000]
console.log(deckRevealedIncreasing([1, 2, 3, 4])); //* [1, 3, 2, 4]

//* Time: O(n log n) - It takes O(n log n) to sort the cards
//* It also takes O(n) to build the values array, and O(n) to add everything to the queue
//* Finally, we iterate over the deck which also takes O(n) time

//* Space: O(n) - The values array, queue and sorting all use O(n) space
