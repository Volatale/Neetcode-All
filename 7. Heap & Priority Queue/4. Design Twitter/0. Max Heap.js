class MyMaxHeap {
  constructor(values, func = (a, b) => b[0] - a[0]) {
    this.heap = values;
    this.func = func;
    this.heapify();
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]];
  }

  heapify() {
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }

  peek() {
    if (this.heap.length === 0) return undefined;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    while (i !== 0 && this.func(this.heap[i], this.heap[parent]) < 0) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);
    return popped;
  }

  sinkDown(i) {
    let length = this.heap.length;

    while (true) {
      let leftChild = 2 * i + 1;
      let rightChild = 2 * i + 2;
      let swapIndex = i;

      if (
        leftChild < length &&
        this.func(this.heap[leftChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = leftChild;
      }

      if (
        rightChild < length &&
        this.func(this.heap[rightChild], this.heap[swapIndex]) < 0
      ) {
        swapIndex = rightChild;
      }

      if (i === swapIndex) break;

      this.swap(i, swapIndex);
      i = swapIndex;
    }
  }
}

class Twitter {
  constructor() {
    this.timestamp = 0; //* Uniquely identify each tweet so we can get the top "10" (something to compare)
    this.tweets = new Map(); //* userId's tweets are: [[timestamp, tweetId]]
    this.following = new Map(); //* userId follows -> Set<userId>
  }

  postTweet(userId, tweetId) {
    //* "User" must have an array to be able to store their tweets
    if (!this.tweets.has(userId)) {
      this.tweets.set(userId, []);
    }

    //* timestamp lets us track the most recent tweets (largest value)
    //* Each tweet has a unique "tweet" count
    this.tweets.get(userId)?.push([this.timestamp, tweetId]);
    this.timestamp++;
  }

  getNewsFeed(userId) {
    const tweets = [];
    const priorityQueue = new MyMaxHeap();

    //* User technically needs to be following themself to see their own tweets
    if (!this.following.has(userId)) {
      this.following.set(userId, new Set());
    }

    //* User now follows themself
    this.following.get(userId).add(userId);

    //* Get the users the user follows
    for (let followee of this.following.get(userId)) {
      //* Ensure the user even has tweets to get (they may not have tweeted)
      if (this.tweets.has(followee)) {
        //* Take tweets from the BACK because those are the most recent ones
        const index = this.tweets.get(followee).length - 1;
        const [timestamp, tweetId] = this.tweets.get(followee)[index];

        //* timestamp lets the Max Heap order based on recency (for top k)
        //* tweetId is so we can push this tweet to the tweets array if needed
        //* followee is so we can get more tweets from the same user
        //* index - 1 because we JUST processed THIS tweet, get the next in the list
        priorityQueue.enqueue([timestamp, tweetId, followee, index - 1]);
      }
    }

    //* Get the top 10 recent tweets (max heap)
    while (!priorityQueue.isEmpty() && tweets.length < 10) {
      let [timestamp, tweetId, followee, index] = priorityQueue.dequeue();
      tweets.push(tweetId);

      //* That user may have more tweets, so process them too, in which case index is not - 1
      //* Get the timestamp/id of the NEXT tweet and add it to the priority queue
      if (index >= 0) {
        [timestamp, tweetId] = this.tweets.get(followee)[index];
        priorityQueue.enqueue([timestamp, tweetId, followee, index - 1]);
      }
    }

    return tweets;
  }

  follow(followerId, followeeId) {
    //* Ensure that this user has a set to track who they follow
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set());
    }

    //* Add the followee to the user's following set
    this.following.get(followerId)?.add(followeeId);
  }

  unfollow(followerId, followeeId) {
    if (this.following.get(followerId)?.has(followeeId)) {
      this.following.get(followerId)?.delete(followeeId);
    }
  }
}
