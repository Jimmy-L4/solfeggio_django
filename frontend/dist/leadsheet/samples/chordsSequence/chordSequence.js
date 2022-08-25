//Require and Qunit working, done following  http://www.nathandavison.com/article/17/using-qunit-and-requirejs-to-build-modular-unit-tests
require.config({
	baseUrl: "../../",
	paths: {
		jquery: 'external-libs/jquery-2.1.0.min',
		vexflow: 'external-libs/vexflow-min',
		pubsub: 'external-libs/tiny-pubsub.min',
	},
	shim: {
		// 'LeadsheetJS': {
		//	exports: 'LS'
		// },
		vexflow: {
			exports: 'Vex'
		}
	}
});

define(function(require) {
	//var $ = require('jquery');
	//var LJS = require('LJS');
	var chordsSong = {"title":"Solar","composer":"Miles Davis","time":"4\/4","style":"Jazz","source":"511385b758e3381874000000","changes":[{"id":"0","name":"Melody\/Solos","numBars":"12","repeat":"0","endingNumBars":"0","timeSignature":"","style":"","bars":[{"chords":[{"p":"C","ch":"m","beat":1}]},{"chords":[{"p":"C","ch":"m","beat":1}]},{"chords":[{"p":"G","ch":"m7","beat":1}]},{"chords":[{"p":"C","ch":"7","beat":1}]},{"chords":[{"p":"F","ch":"M7","beat":1}]},{"chords":[{"p":"F","ch":"M7","beat":1}]},{"chords":[{"p":"F","ch":"m7","beat":1}]},{"chords":[{"p":"Bb","ch":"7","beat":1}]},{"chords":[{"p":"Eb","ch":"M7","beat":1}]},{"chords":[{"p":"Eb","ch":"m7","beat":1},{"p":"Ab","ch":"7","beat":3}]},{"chords":[{"p":"Db","ch":"M7","beat":1}]},{"chords":[{"p":"D","ch":"halfdim7","beat":1},{"p":"G","ch":"7b9","beat":3}]}]}],"keySignature":"C","tempo":120};
	//var chordsSong = require('tests/songs/AloneTogether');
	var SongModel_CSLJson = require('modules/converters/MusicCSLJson/src/SongModel_CSLJson');
	
	var LSChordSequenceViewer = require('modules/LSViewer/src/LSChordSequenceViewer');
	var OnWindowResizer = require('modules/LSViewer/src/OnWindowResizer');
	var AudioModule = require('modules/Audio/src/AudioModule');
	var ChordSpaceManager = require('modules/ChordEdition/src/ChordSpaceManager');
	var CursorModel = require('modules/Cursor/src/CursorModel');

	var songModel = SongModel_CSLJson.importFromMusicCSLJSON(chordsSong);
	var viewer = new LSChordSequenceViewer($("#canvas_container")[0], {displayTitle:false, displayComposer:false, saveChords:true, interactiveCanvasLayer: false});
	var chordsCursor = new CursorModel(songModel.getComponent('chords'));

	OnWindowResizer(songModel);

	var audio = new AudioModule(songModel);
	audio.load('/tests/audio/Solar_120_bpm.335.mp3', 120, 0, function(){
		//audio.play();	
	});

	new ChordSpaceManager(songModel, chordsCursor, viewer, true, null, 'ONLY_CHORDS');
	viewer.draw(songModel);

	// console.log(LJS);


	/*var viewerHTML = $("#canvas_container")[0];
	var playerHTML = $('#player_test')[0];

	var historyHTML = $('#rightPanel');
	

	var viewerOptions = {
		HTMLElement: viewerHTML,
		viewOptions: {
			//displayTitle: true,
			//displayComposer: true,
			layer: true,
			detectEventOnAllDocument: true
			//typeResize: "fluid", // "scale" | "fluid"
			//heightOverflow: "auto", // "scroll" | "auto"
		}
	};

	var playerOptions = {
		HTMLElement: playerHTML,
		imgUrl: '/modules/MidiCSL/img',
		viewOptions: {
			displayMetronome: true,
			displayLoop: true,
			displayTempo: true,
			changeInstrument: false,
			autoload: false,
			progressBar: true
		},
		audio:{
			audioFile: '/tests/audio/solar.wav',
			tempo: 120
		}
	};

	
	var params = {
		viewer: viewerOptions,
		player: playerOptions
		
	
	};

;
	var myLeadsheet = LJS.init(afoxeSong, params);
	//console.log(myLeadsheet);
	/*if (typeof myLeadsheet.audioComments !== "undefined") {
		addComments(myLeadsheet.audioComments);
	}
	if (typeof myLeadsheet.audioPlayer !== "undefined") {
		myLeadsheet.audioPlayer.load('/tests/audio/solar.wav', 170, true);
	}

	function addComments(audioComments) {
		audioComments.addComment({
			userName: 'Dani Martin Martinez',
			id: '1234e',
			userId: '323324422',
			img: '/tests/img/dani-profile.jpg',
			text: 'This is an audio comment',
			timeInterval: [1.5891220809932014, 2.668046112917529],
			date: '1 min ago'
		});

		audioComments.addComment({
			userName: 'Dani',
			id: '1234',
			img: '/tests/img/avatar.png',
			text: 'lorem ipsum cumulum largo texto asolo en caso de que tal cual pascual ande vas con la moto que thas comprado, vaya tela',
			timeInterval: [3.3, 10.1],

		});
	}*/

});
