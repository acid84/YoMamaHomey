'use strict';

const Homey = require('homey');

module.exports.init = function() {	
	this.log('MyApp is running...');

	Homey.manager('speech-input').on('speech', onSpeech);
	Homey.manager('speech-input').on('speechMatch', onSpeechMatch);
	
}
function onSpeech( speech, callback ) {
	return callback( null, true );
}
function onSpeechMatch( speech, word ) {
	const tree = speech.matches.main;

	getFromWikipedia(tree.query.value[0], function(err, result){
		if (err) return speech.say( __("retrieveError"));
		if (result === "") return speech.say( __("noResult", {searchWords: tree.query.value[0]}) );

		return speech.say(result);
	})
}	