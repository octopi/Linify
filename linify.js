/**
linify.js
Returns a Jeremy Lin-pun-riddled version of text.
*/

var pairings = [
	[/Lin/, '<img src="l.png" alt="Lin" />'],
	[/ling$/, 'LIN\''],
	[/lin/i, 'LIN'],
	[/^in/, 'lin'],
	[/^In/, 'Lin'],
	[/^.in/, 'lin'],
	[/^li/, 'lin'],
	[/^Li/, 'Lin'],
];
function linify(text) {
	var words = text.replace(/\n/g, '<br /> ').split(' ');
	var linified = '';
	for(var i=0;i<words.length;i++) {
		var curr = words[i];
		var j = 0;
		var rep = '';
		do {
			rep = curr.replace(pairings[j][0], pairings[j][1]);
			j++;
		} while (rep === curr && j < pairings.length);
		linified += (rep === '') ? curr : rep;
		if(i<words.length-1)
			linified += ' ';
	}
	return linified;
}