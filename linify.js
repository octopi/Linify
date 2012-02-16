/**
linify.js
Returns a Jeremy Lin-pun-riddled version of text.
*/

var pairings = [
	[/Lin/, ' <img src="l.png" alt="Lin"/>'],
	[/ling$/, 'LIN\''],
	[/lin/i, 'LIN'],
	[/^in/, 'lin'],
	[/^In/, 'Lin'],
	[/^.in/, 'lin'],
	[/^li/, 'lin'],
	[/^Li/, 'Lin'],
];
var linified, hashtags; // global scope bc used by two functions
function linify(text) {
	var words = text.replace(/\n/g, '<br /> ').split(' ');
	var imgOffset = 0; // because image tags mess up the word indexing
	linified = '';
	hashtags = {}; 
	for(var i=0;i<words.length;i++) {
		var curr = words[i];
		var j = 0;
		var rep = '';
		do {
			rep = curr.replace(pairings[j][0], pairings[j][1]);
			j++;
		} while (rep === curr && j < pairings.length);

		// if replaced, check to see if a hashtag exists
		if(rep !== curr && rep.search(pairings[0][1]) === -1) {
			console.log('inside rep is '+rep);
			jQuery.ajax({
				localI: i,
				localRep: rep,
				localImgOffset: imgOffset,
				url: 'http://search.twitter.com/search.json?q=%23'+rep,
				dataType: 'jsonp',
				success: function(data) {
					if(data.results.length > 0) {
						console.log(data);
						hashtags[this.localI+this.localImgOffset] = ' <a href="https://twitter.com/#!/search/realtime/%23'+this.localRep+'">#'+this.localRep+'</a> ';
						console.log('ht ');
						console.log(hashtags);
					}
				}
			});
		}
		linified += rep;
		if(rep.search(pairings[0][1]) > -1)
			imgOffset += 3;
		if(i<words.length-1)
			linified += ' ';
	}
	return linified;
}

function hashtagify() {
	console.log(hashtags);
	var words = linified.split(' ');
	for(var i in hashtags) {
		console.log(i+', '+hashtags[i]);
		words[i] = hashtags[i];
	}
	var joined = words.join(' ');
	console.log('joined is '+joined);
	return joined;
}