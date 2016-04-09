// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

var pronounceable = require('../pronounceable');

// Training probabilites using a word list.
// The training method returns a probability array
// for word tuples and word triples.

pronounceable.train('../data/dictionary.txt', function(tuples, triples) {
	console.log(triples);
});
