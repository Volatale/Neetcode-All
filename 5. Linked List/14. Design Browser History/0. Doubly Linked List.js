class ListNode {
  constructor(val, prev = null, next = null) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor(homepage) {
    this.head = new ListNode(homepage);
    this.tail = this.head;
    this.size = 1;
  }

  appendRight(val) {
    const newNode = new ListNode(val);

    if (this.head === null && this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  popRight() {
    if (this.size === 0) return;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
  }
}

class BrowserHistory {
  constructor(homepage) {
    this.history = new DoublyLinkedList(homepage);
    this.url = this.history.head;
  }

  visit(url) {
    //* We need to delete all the nodes on the right
    while (this.url.next) {
      this.history.popRight();
    }

    this.history.appendRight(url);
    this.url = this.history.tail; //* The last node
  }

  forward(steps) {
    let curr = this.url; //* The current position
    let count = 0;

    //* Travel backward "steps" nodes
    while (curr && curr.next && count < steps) {
      curr = curr.next;
      count++;
    }

    this.url = curr;
    return curr.val;
  }

  back(steps) {
    let curr = this.url; //* The current position
    let count = 0;

    //* Travel forward "steps" nodes
    while (curr && curr.prev && count < steps) {
      curr = curr.prev;
      count++;
    }

    this.url = curr;
    return curr.val;
  }
}

const history = new BrowserHistory("leetcode.com");

history.visit("google.com");
history.visit("facebook.com");
history.visit("youtube.com");
console.log(history.back(1)); //* facebook
console.log(history.back(1)); //* google
console.log(history.forward(1)); //* facebook
history.visit("linkedin.com");
console.log(history.forward(2)); //* linkedin.com

console.log(history.back(2)); //* google.com
console.log(history.back(7)); //* leetcode
