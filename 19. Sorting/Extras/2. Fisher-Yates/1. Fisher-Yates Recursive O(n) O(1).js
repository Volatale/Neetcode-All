function fisherYates(arr, i = arr.length - 1) {
  if (i < 0) return arr;

  let j = Math.floor(Math.random() * (i + 1));

  [arr[i], arr[j]] = [arr[j], arr[i]];

  return fisherYates(arr, i - 1);
}

console.log(fisherYates([1, 2, 3, 4, 5]));
