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

    //* Add the node to the tail
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    this.size++;
  }

  popRight() {
    if (this.size === 0) return;

    //* Remove the node from the right
    if (this.size > 1) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size--;
  }
}

class BrowserHistory {
  constructor(homepage) {
    this.history = new DoublyLinkedList(homepage);
    this.url = this.history.head; //* Current page
  }

  visit(url) {
    //* Remove all the nodes to the right
    while (this.url.next) {
      this.history.popRight();
    }

    //* Add the new url to the right
    this.history.appendRight(url);

    //* Update the current url
    this.url = this.url.next;
  }

  forward(steps) {
    let curr = this.url;
    let count = 0;

    //* Move forward "steps" steps
    while (curr && curr.next && count < steps) {
      curr = curr.next;
      count++;
    }

    //* Update the current url
    this.url = curr;
    return this.url.val;
  }

  back(steps) {
    let curr = this.url;
    let count = 0;

    //* Move back "steps" steps
    while (curr && curr.prev && count < steps) {
      curr = curr.prev;
      count++;
    }

    //* Update the current url
    this.url = curr;
    return this.url.val;
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
