//Require and Qunit working, done following  http://www.nathandavison.com/article/17/using-qunit-and-requirejs-to-build-modular-unit-tests
require.config({
	baseUrl: "../../",
	paths: {
		jquery: 'external-libs/jquery-2.1.0.min',
		vexflow_helper: 'external-libs/vexflow_test_helpers',
		vexflow: 'external-libs/vexflow-min',
		Midijs: 'external-libs/Midijs/midijs.min',
		pubsub: 'external-libs/tiny-pubsub.min',
		LeadsheetJS: 'build/LeadsheetJS-1.0.0.min',
	},
	shim: {
		'LeadsheetJS': {
			exports: 'LS'
		},
		'vexflow': {
			exports: 'Vex'
		},
		'Midijs': {
			exports: 'MIDI'
		}
	}
});

define(function(require) {

	var UserLog = require('utils/UserLog');
	var AjaxUtils = require('utils/AjaxUtils');

	var SongModel = require('modules/core/src/SongModel');
	var TimeSignatureModel = require('modules/core/src/TimeSignatureModel');

	var LSViewer = require('modules/LSViewer/src/LSViewer');
	var musicXMLParser = require('modules/converters/MusicXML/utils/musicXMLParser');
	var SongModel_MusicXML = require('modules/converters/MusicXML/src/SongModel_MusicXML');
	var MusicXMLParser = require('modules/converters/MusicXML/utils/musicXMLParser');

	var filepath = '';
	filepath = 'Faire fi de tout.xml';
	filepath = 'Ferme.xml';
	var mxlParse = new MusicXMLParser();
	var docString = mxlParse.fetch(filepath);
	var songModel = SongModel_MusicXML.importFromMusicXML(docString);
	//console.log(songModel);
	var viewer = new LSViewer($('#score')[0]);
	viewer.draw(songModel);
	songModel = SongModel_MusicXML.importFromMusicXML(mxlParse.fetch('Faire fi de tout.xml'));
	viewer.draw(songModel);
	console.log(songModel);

});