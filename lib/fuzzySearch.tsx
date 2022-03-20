// Simple Fuzzy Matching in Typescript
const fuzzySearch = (input: string, note: NoteType): boolean => {
  // Grab note content
  const nContent = note.content;
  // If function is called and input is empty then return true
  // so that all notes will show since search should be inactive
  if (!input.length) return true;
  // If the search input is longer than the note content then return false
  if (input.length > nContent.length) return false;
  // If the input length is equal to the note content length
  // return true if the content matches, else return false
  if (input.length === nContent.length) return input === nContent;
  // this variable is to reset the nContent search start point for when a match was made
  let k = 0;
  // Label for loop to break out of while loop and continue search
  search: for (let i = 0; i < input.length; i++) {
    // Grab character to match the note content
    const char = input.toLowerCase().charCodeAt(i);
    // While j is less than nContent length continue search
    for (let j = k; j < nContent.length; j++) {
      const noteChar = nContent.toLowerCase().charCodeAt(j);
      // Increment j and use to check content char against input char
      if (noteChar === char) {
        // Reset the starting point for the search
        // If character matches break out and continue searching
        k = j;
        continue search;
      }
    }
    // If there is not match at the end of the inner loop then return false
    return false;
  }
  // If there is no match at the end of the outer loop then return false
  return true;
};

export default fuzzySearch;
