class MyListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class MyQueue {
  constructor(values = []) {
    this.front = null;
    this.back = null;
    this.length = 0;

    for (const val of values) {
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
    const newNode = new MyListNode(val);

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

//* Logically speaking, it makes sense to ban the immediate next opposite senate
//*     - For example: "RD", the Radiant should immediately ban the next Dire
//*     - We have no guarantee that we'll even get another chance
//*         - What if we choose NOT to ban the next and instead the furthest to the right?
//*         - Then the next Dire could choose to ban the first radiant
//*     - Optimally, we should ban Senates BEFORE they get to have their move
//* Since this is a round based system, we can think of this as BFS
//*     - Each frontier represents a round
//*     - Whichever queue has no more senates is the loser
//* The senate with the smaller index was BEFORE the other
//*     - And since indices are monotonically increasing, there will be no equality problem
//* We need to re-enqueue senators that win
//*     - The queues represent whose turn it is
//*     - So if senateA and senateB (R and D respectively) both take their turn
//*         - Then they can't have ANOTHER turn before the other senators in THIS round go
//*         - Hence, we add "n" to their index to ensure they will only go again in the next round
//*     - Adding "n" also ensures an infinite loop is possible (theoretically)
function predictPartyVictory(senate) {
  //* Immediately return a victor
  if (senate.length === 1) {
    return senate[0] === "R" ? "Radiant" : "Dire";
  }

  const n = senate.length;
  const rQueue = new MyQueue();
  const dQueue = new MyQueue();

  //* Initialize first round
  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") {
      rQueue.enqueue(i);
    } else {
      dQueue.enqueue(i);
    }
  }

  //* Begin playing game (until one queue is empty)
  while (!rQueue.isEmpty() && !dQueue.isEmpty()) {
    const rValue = rQueue.dequeue();
    const dValue = dQueue.dequeue();

    //* For next round, put winning senator at back of their queue
    //* This round must finish before they go again (add n to ensure next round)
    if (rValue < dValue) {
      rQueue.enqueue(rValue + n);
    } else {
      dQueue.enqueue(dValue + n);
    }
  }

  return rQueue.length === 0 ? "Dire" : "Radiant";
}

console.log(predictPartyVictory("RD")); //* "Radiant"
console.log(predictPartyVictory("RDD")); //* "Dire"
console.log(predictPartyVictory("RRDDD")); //* "Radiant"
console.log(predictPartyVictory("RDRDRDD")); //* "Radiant"

//* Time: O(n) - The time taken scales with the size of the input

//* Space: O(n) - In the worst case, the queue stores "n" elements (the entire string)
