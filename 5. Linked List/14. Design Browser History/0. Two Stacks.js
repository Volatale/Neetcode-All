class BrowserHistory {
  constructor(homepage) {
    this.url = homepage;

    //* History holds the current history (going forward only)
    //* Futue holds elements we pop to go "back"
    this.history = [homepage];
    this.future = [];
  }

  visit(url) {
    //* Remove all of the "forward" history (in O(1) time)
    this.future = [];

    this.history.push(url);

    //* The "peek" element of the stack
    this.url = this.history[this.history.length - 1];
    return this.url;
  }

  //* Move forward in history "steps"
  //* "Future" holds the elements that
  forward(steps) {
    let count = 0;

    //* Pop from future and push to history
    while (this.future.length > 0 && count < steps) {
      this.history.push(this.future.pop());
      count++;
    }

    //* The "peek" element of the stack
    this.url = this.history[this.history.length - 1];
    return this.url;
  }

  //* Pop "steps" things from history
  //* Push them to future so we can access them later
  back(steps) {
    let count = 0;

    //* Pop from history and push to future
    while (this.history.length > 1 && count < steps) {
      this.future.push(this.history.pop());
      count++;
    }

    //* The "peek" element of the stack
    this.url = this.history[this.history.length - 1];
    return this.url;
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
