// Luke Mitchell, 2016
// https://github.com/lukem512/pronounceable

var pronounceable = require('../pronounceable');

// Run tests to determine whether the
// metric is correct.
function test() {
	var payload = {
		a: true,
		froggies: true,
		frggies: false,
		fry: true,
		friy: false,
		frrrr: false,
		ax: true,
		xa: true,
		xax: false,
		xaxa: false,
		mom: true,
		moom: true,
		maam: false,
		goo: true,
		hxueb: false,
		thth: false,
		thump: true,
		grumph: true,
		samosa: true,
		xghsii: false,
		as: true,
		ha: true,
		sa: true,
		xz: false,
		kt: false
	};

	var failed = false;
	Object.keys(payload).some(function(w){
		if (pronounceable.test(w) !== payload[w]) {
			console.error('Test failed with \'' + w + '\'');
			failed = true;
		}
		return failed;
	});

	return !failed;
};

// Run the test!
test();
