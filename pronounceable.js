// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

var fs = require('fs');
var path = require('path');

var threshold = 0.001;
var probs = {};

// Load probabilities from JSON file.
var probs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data/triplets.json'), 'utf8'));

// Remove any non-alphabet characters
// and convert to lower case.
function clean(word) {
	return word.replace(/[^a-zA-Z]/g,'').toLowerCase();
};

// Make a percentage.
function percent(score, count) {
	return (score / count) * 100;
};

// Extract probabilities of word tuples
// from a large list of words.
module.exports.train = function(filename, callback) {
	var probs = {};
	var count = 0;

	fs.readFile(filename, 'utf8', function read(err, data) {
	    if (err) throw err;

	    var words = data.trim().split(/\s+/);
	    words.forEach(function(w){
	    	w = clean(w);

	    	for (var i = 0; i < (w.length - 2); i++) {
	    		if (!probs[w[i]]) probs[w[i]] = {};
	    		if (!probs[w[i]][w[i+1]]) probs[w[i]][w[i+1]] = {};
	    		if (!probs[w[i]][w[i+1]][w[i+2]]) probs[w[i]][w[i+1]][w[i+2]] = 1;
	    		else probs[w[i]][w[i+1]][w[i+2]]++;
	    		count++;
	    	}
	    });

		Object.keys(probs).forEach(function(first) {
			Object.keys(probs[first]).forEach(function(second){
				Object.keys(probs[first][second]).forEach(function(third){
					probs[first][second][third] =
						percent(probs[first][second][third], count);
				});
			});
		});

		callback(probs);
	});
};

// Check whether a word is pronounceable using
// the word tuple probabilities.
module.exports.test = function(word) {
	var w = clean(word);

	switch (w.length) {
		case 1:
			break;

		case 2:
			// TODO - word pairs
			if (typeof probs[w[0]][w[1]] === 'undefined') return false;

		default:
			for (var i = 0; i < (w.length - 2); i++) {
				if (typeof probs[w[i]] === 'undefined' ||
					typeof probs[w[i]][w[i+1]] === 'undefined' ||
					typeof probs[w[i]][w[i+1]][w[i+2]] === 'undefined' || 
					probs[w[i]][w[i+1]][w[i+2]] < threshold)
					return false;
			}
	}

	return true;
};

// Compute a normalised score for
// the pronounceability of the word.
module.exports.score = function(word) {
	var w = clean(word);
	var score = 0;

	switch (w.length) {
		case 1:
			return 1;

		case 2:
			// TODO - word pairs
			return NaN;

		default:
			for (var i = 0; i < (w.length - 2); i++) {
				if (typeof probs[w[i]] === 'undefined' ||
					typeof probs[w[i]][w[i+1]] === 'undefined' ||
					typeof probs[w[i]][w[i+1]][w[i+2]] === 'undefined') {
					score = score + 0;
				} else {
					score = score + probs[w[i]][w[i+1]][w[i+2]];
				}
			}
	}

	return (score / w.length);
};
