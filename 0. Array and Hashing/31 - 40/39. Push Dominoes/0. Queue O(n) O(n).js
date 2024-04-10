function pushDominoes(dominoes) {
  dominoes = dominoes.split("");

  const queue = new Queue();

  for (let i = 0; i < dominoes.length; i++) {
    const d = dominoes[i];

    //* Add that will effect the adjacent dominoes
    if (d !== ".") {
      queue.enqueue([i, d]);
    }
  }

  while (queue.length > 0) {
    const [i, d] = queue.dequeue();

    //* If i === 0, we have no left neighbors (don't Out of Bounds)
    //* Also check if left is standing, if it IS we can topple it
    if (d === "L" && i > 0 && dominoes[i - 1] === ".") {
      queue.enqueue([i - 1, "L"]); //* Add this to processing; we might have more neighbors to topple
      dominoes[i - 1] = "L"; //* Update domino
    } else if (d === "R") {
      if (i + 1 < dominoes.length && dominoes[i + 1] === ".") {
        //* Can't knock it over if the NEXT domino to the right of i + 1 that is L
        if (i + 2 < dominoes.length && dominoes[i + 2] === "L") {
          queue.dequeue();
        } else {
          queue.enqueue([i + 1, "R"]);
          dominoes[i + 1] = "R";
        }
      }
    }
  }

  return dominoes.join("");
}

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Queue {
  front = null;
  back = null;
  length = 0;

  constructor(values = []) {
    for (let val of values) {
      this.enqueue(val);
    }
  }

  enqueue(val) {
    const newNode = new ListNode(val);

    if (this.front === null && this.back === null) {
      this.front = newNode;
      this.back = newNode;
    } else if (this.back) {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.length++;
    return this.length;
  }

  dequeue() {
    if (this.front === null) return undefined;

    const dequeued = this.front;

    if (this.front.next === null) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }

    this.length--;

    return dequeued.val;
  }

  values() {
    if (this.front === null) return [];

    const values = [];

    let curr = this.front;

    if (curr === null || curr === undefined) return [];

    while (curr !== null) {
      values.push(curr.val);
      curr = curr.next;
    }

    return values;
  }
}

console.log(pushDominoes("RR.L"));
console.log(pushDominoes(".L.R...LR..L.."));
console.log(pushDominoes(".L"));
console.log(pushDominoes("L."));

//* Time: O(n) - We have to iterate through the entire string once to find the positions of "." dominoes
//* In the worst case, each element could be added to the queue and dequeued once

//* Space: O(n) - In the worst case, the queue
