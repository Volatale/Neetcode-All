//* We are told to use a greedy approach
//* Every time we include a word, add the length to the lineLength
//* If the addition of a word would overflow the line length, don't include the word
//* Then, determine how much space is needed
//*     - spaceNeeded = maxWidth - lineLength (the space used by our characters)
//!     - Remember, we avoided considering any space up until this point
//*         - So we have to retroactively consider it
//* If this is the last line, or there is only one word, we need to left justify the word
//*     - Which means pushing the word, and adding as much space as possible
//* Otherwise, you need to evenly distribute the space among the other words
function fullJustify(words, maxWidth) {
  const result = [];
  let i = 0;

  while (i < words.length) {
    let row = [];
    let lineLength = 0;

    //* Greedily collect as many words as we can
    while (
      i < words.length &&
      lineLength + words[i].length + row.length <= maxWidth
    ) {
      row.push(words[i]);
      lineLength += words[i].length;
      i++;
    }

    let spaceNeeded = maxWidth - lineLength;

    //* If its the last line, or there is only ONE word, left justify
    if (i === words.length || row.length === 1) {
      result.push(row.join(" ") + " ".repeat(spaceNeeded - (row.length - 1)));
      continue;
    }

    //* Otherwise, evenly distribute space
    let spaceBetween = Math.floor(spaceNeeded / (row.length - 1));
    let extraSpaces = spaceNeeded % (row.length - 1);

    //* Start with the first word
    let justifiedLine = row[0];

    for (let j = 1; j < row.length; j++) {
      let spaces = spaceBetween + (extraSpaces > 0 ? 1 : 0);
      extraSpaces--;
      justifiedLine += " ".repeat(spaces) + row[j];
    }

    result.push(justifiedLine);
  }

  return result;
}

console.log(
  fullJustify(
    ["This", "is", "an", "example", "of", "text", "justification."],
    16
  )
);

console.log(
  fullJustify(["What", "must", "be", "acknowledgment", "shall", "be"], 16)
);

console.log(
  fullJustify(
    [
      "Science",
      "is",
      "what",
      "we",
      "understand",
      "well",
      "enough",
      "to",
      "explain",
      "to",
      "a",
      "computer.",
      "Art",
      "is",
      "everything",
      "else",
      "we",
      "do",
    ],
    20
  )
);

//* Time: O(n) - Each word is processed exactly once in the outer while loop
//* The inner while loop can iterate multiple times, but "i" increments once per
//* The justified line creation takes at most O(maxWidth) per line
//* But the max number of lines is O(n / maxWidth), which still scales with "n"

//* Space: O(n) - The max number of lines is O(n / maxWidth)
