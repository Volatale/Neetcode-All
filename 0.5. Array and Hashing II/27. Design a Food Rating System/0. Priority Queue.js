class MyPriorityQueue {
  #heap;
  #func;

  constructor(values = [], func = (a, b) => a - b) {
    this.#heap = values;
    this.#func = func;
    this.#heapify();
  }

  #heapify() {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  isEmpty() {
    return this.#heap.length === 0;
  }

  size() {
    return this.#heap.length;
  }

  #swap(x, y) {
    [this.#heap[x], this.#heap[y]] = [this.#heap[y], this.#heap[x]];
  }

  peek() {
    if (this.#heap.length === 0) return undefined;
    return this.#heap[0];
  }

  enqueue(val) {
    this.#heap.push(val);
    this.#bubbleUp(this.#heap.length - 1);
  }

  #bubbleUp(i) {
    let parent = (i - 1) >> 1;

    while (i !== 0 && this.#func(this.#heap[i], this.#heap[parent]) < 0) {
      this.#swap(i, parent);
      i = parent;
      parent = (i - 1) >> 1;
    }
  }

  dequeue() {
    if (this.#heap.length === 0) return undefined;

    this.#swap(0, this.#heap.length - 1);
    const popped = this.#heap.pop();
    this.#sinkDown(0);
    return popped;
  }

  #sinkDown(i) {
    let length = this.#heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let swapIndex = i;

      if (
        leftChild < length &&
        this.#func(this.#heap[leftChild], this.#heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.#func(this.#heap[rightChild], this.#heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.#swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

class FoodRatings {
  constructor(foods, cuisines, ratings) {
    this.cuisineMap = {}; //* Cuisine -> PQ of [food, rating]
    this.foodMap = {}; //* Food -> [name, rating] (for direct access)
    this.cuisines = {}; //* Food -> Cuisine

    for (let i = 0; i < foods.length; i++) {
      const cuisine = cuisines[i];
      const food = foods[i];
      const rating = ratings[i];

      if (!this.cuisineMap[cuisine]) {
        this.cuisineMap[cuisine] = new MyPriorityQueue([], this.#func);
      }

      this.cuisineMap[cuisine].enqueue([food, rating]); //* Gives access to highest rated food
      this.foodMap[food] = [food, rating]; //* For easy rating changes
      this.cuisines[food] = cuisine; //* Determines the cuisine from the food
    }
  }

  //* Reuse this same function reference for EVERY PQ (exists on prototype)
  #func(a, b) {
    //* Both ratings are the same, compare names lexicographically
    if (a[1] === b[1]) {
      return a[0].localeCompare(b[0]);
    }

    //* Otherwise, compare ratings (in DESCENDING order)
    return b[1] - a[1];
  }

  changeRating(food, newRating) {
    const cuisine = this.cuisines[food];
    const PQ = this.cuisineMap[cuisine];

    //* Update the food's rating directly in the map
    this.foodMap[food][1] = newRating;

    //* Add the new rating to the queue (old entries remain, but are ignored)
    PQ.enqueue([food, newRating]);
  }

  highestRated(cuisine) {
    const PQ = this.cuisineMap[cuisine];

    //* Remove invalid (stale) entries
    while (PQ.peek() && this.foodMap[PQ.peek()[0]][1] !== PQ.peek()[1]) {
      PQ.dequeue();
    }

    //* Highest rated food
    return PQ.peek()[0];
  }
}
