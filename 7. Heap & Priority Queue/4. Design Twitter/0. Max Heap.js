class MaxHeap {
  constructor(values = []) {
    this.heap = [];

    for (let val of values) {
      this.enqueue(val);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  swap(x, y) {
    const temp = this.heap[x];
    this.heap[x] = this.heap[y];
    this.heap[y] = temp;
  }

  peek() {
    if (this.heap.length === 0) return;
    return this.heap[0];
  }

  enqueue(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    let parent = Math.floor((i - 1) / 2);

    //* Compare the COUNTS of each element
    while (i !== 0 && this.heap[i][0] > this.heap[parent][0]) {
      this.swap(i, parent);
      i = parent;
      parent = Math.floor((i - 1) / 2);
    }
  }

  dequeue() {
    if (this.heap.length === 0) return;

    this.swap(0, this.heap.length - 1);
    const popped = this.heap.pop();
    this.sinkDown(0);

    return popped;
  }

  sinkDown(i) {
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;
    let length = this.heap.length;

    //* Compare the COUNTS of the elements
    while (
      (leftChild < length && this.heap[i][0] < this.heap[leftChild][0]) ||
      (rightChild < length && this.heap[i][0] < this.heap[rightChild][0])
    ) {
      if (
        rightChild >= length ||
        this.heap[leftChild][0] > this.heap[rightChild][0]
      ) {
        this.swap(i, leftChild);
        i = leftChild;
      } else {
        this.swap(i, rightChild);
        i = rightChild;
      }

      leftChild = 2 * i + 1;
      rightChild = 2 * i + 2;
    }
  }
}

class Twitter {
  constructor() {
    this.count = 0;
    this.tweets = new Map(); //* userId: [count, tweetIds]
    this.following = new Map(); //* userId: set()
  }

  postTweet(userId, tweetId) {
    //* If the user does NOT already have a tweets array
    if (!this.tweets.get(userId)) {
      this.tweets.set(userId, []);
    }

    this.tweets.get(userId)?.push([this.count, tweetId]);
    this.count++;
  }

  getNewsFeed(userId) {
    const tweets = [];
    const maxHeap = new MaxHeap();

    //* User has to be following themselves technically
    if (!this.following.has(userId)) {
      this.following.set(userId, new Set());
    }

    //* User's OWN tweets have to be included in the feed
    this.following.get(userId)?.add(userId);

    //* Get all of the people that this user follows and destructure the tweet pairs
    for (let followee of this.following.get(userId)) {
      //* Ensure the user even has tweets to get
      if (this.tweets.has(followee)) {
        const index = this.tweets.get(followee).length - 1;
        const [count, tweetId] = this.tweets.get(followee)[index];

        maxHeap.enqueue([count, tweetId, followee, index - 1]);
      }
    }

    //* Get the top 10 values
    while (!maxHeap.isEmpty() && tweets.length < 10) {
      let [count, tweetId, followee, index] = maxHeap.dequeue();
      tweets.push(tweetId);

      //* Get more of that person's tweets if they exist
      if (index >= 0) {
        [count, tweetId] = this.tweets.get(followee)[index];
        maxHeap.enqueue([count, tweetId, followee, index - 1]);
      }
    }

    return tweets;
  }

  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set());
    }
    this.following.get(followerId)?.add(followeeId);
  }

  unfollow(followerId, followeeId) {
    //* If the user is following followee. Get THIS user's follow set
    if (this.following.get(followerId)?.has(followeeId)) {
      this.following.get(followerId)?.delete(followeeId);
    }
  }
}
