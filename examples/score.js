// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

var pronounceable = require('../pronounceable');

// Scoring a word using the standard dataset.
// The output is a normalised score. The higher the number
// the more pronounceable the word.

var morePronouncable = 'peonies';
console.log(morePronouncable, pronounceable.score(morePronouncable));

var lessPronouncable = 'sshh';
console.log(lessPronouncable, pronounceable.score(lessPronouncable));