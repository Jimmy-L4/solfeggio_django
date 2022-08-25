define([
	'jquery',
	'mustache',
	'modules/core/src/SongModel',
	'utils/UserLog',
	'utils/NoteUtils',
	'pubsub',
	'text!modules/MainMenu/src/MenuTabTemplate.html'
], function($, Mustache, SongModel, UserLog, NoteUtils, pubsub, MenuTabTemplate) {
	/**
	 * NoteEditionView creates notes edition template and link event from html to controller
	 * @exports NoteEdition/NoteEditionView
	 */
	function NoteEditionView(imgPath) {
		this.el = undefined;
		this.imgPath = imgPath;
		this.initKeyboard();
		this.render();
	}

	NoteEditionView.prototype.render = function() {
		this.el = Mustache.render(MenuTabTemplate, {
			parts: [{
				name: 'Pitch',
				items: [{
					id: 'aug-note',
					title: 'Add 1 ton (+)',
					text: '+'
				}, {
					id: 'sub-note',
					title: 'Substract 1 ton (-)',
					text: '-'
				}]
			}, {
				name: 'Alteration',
				items: [{
					id: 'double_flat',
					title: 'Double Flat (Shift+V)',
					img: 'double_flat.png'
				}, {
					id: 'flat',
					title: 'Flat (V)',
					text: '<span class="alteration">&#9837;</span>'
				}, {
					id: 'natural',
					title: 'Natural (N)',
					text: '<span class="alteration">&#9838;</span>'
				}, {
					id: 'sharp',
					title: 'Sharp (S)',
					text: '<span class="alteration">&#9839;</span>'
				}, {
					id: 'double_sharp',
					title: 'Double Sharp (Shitf+S)',
					img: 'double_sharp.png'
				}, ]
			}, {
				name: 'Rhythm',
				items: [{
					id: 'sixty-four-note',
					title: 'Sixty-four note (1)',
					img: 'sixty-four-note.png',
					alt: '1/6'
				}, {
					id: 'thirty-second-note',
					title: 'Thirty-second note (2)',
					img: 'thirty-second-note.png',
					alt: '1/3'
				}, {
					id: "sixteenth-note",
					title: "Sixteenth note (3)",
					img: "sixteenth-note.png",
					alt: "1/16"
				}, {
					id: "eight-note",
					title: "Eight note (4)",
					img: "eight-note.png",
					alt: "1/8"
				}, {
					id: "quarter-note",
					title: "Quarter note (5)",
					img: "quarter-note.png",
					alt: "1/4"
				}, {
					id: "half-note",
					title: "Half note (6)",
					img: "half-note.png",
					alt: "1/2"
				}, {
					id: "whole-note",
					title: "Whole note (7)",
					img: "whole-note.png",
					alt: "1"
				}, {
					id: "dot",
					title: "dot (.)",
					text: '.'
				}, {
					id: "double-dot",
					title: "Double dot (..)",
					text: '..'
				}]
			}, {
				name: 'Symbol',
				items: [{
						id: "tie-note",
						title: "Tie note (T)",
						img: "tie-note.png",
						alt: "tie"
					}, {
						id: "tuplet",
						title: "Tuplet (Shift+T)",
						img: "tuplet.png",
						alt: "tuplet"
					}

				]
			}, {
				name: 'Note',
				items: [
				{
					id:'regular-note',
					title:'Regular mode (D)',
					img:'quarter-note.png',
					alt:'regular'
				},{
					id:'silent-note',
					title:'Silent mode (R)',
					img:'silent.png',
					alt:'silent'
				},{
						id:'delete-note',
						title:'Remove note (Del)',
						img:'remove.png',
						alt:'delete'
				},{
						id:'add-note',
						title:'Add note (Space)',
						img:'add.png',
						alt:'add'
				}]
			},{
				name:'Selection',
				items:[
				 {
					id:'copy-note',
					title:'Copy (Ctrl+C)',
					img:'copy.png',
					alt:'copy'
				 },
				 {
					id:'paste-note',
					title:'Paste (Ctrl+V)',
					img:'paste.png',
					alt:'paste'
				 }]
			}
			],
			'imgPath': this.imgPath + "/"
		});
	};

	/**
	 * manages events that come from the keyboard
	 */
	NoteEditionView.prototype.initKeyboard = function() {
		var self = this;
		$.subscribe('updown-arrows', function(el, inc, evt) {
			fn = 'setPitch';
			$.publish('NoteEditionView', [fn, inc, evt.shiftKey]);
		});
		$.subscribe('pitch-letter-key', function(el, key) {
			fn = 'setPitch';
			$.publish('NoteEditionView', [fn, key]);
		});
		$.subscribe('accidental-key', function(el, acc) {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, acc]);
		});
		$.subscribe('shift-accidental-key', function(el, acc) {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, acc + acc]);
		});
		$.subscribe('number-key', function(el, key) {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, key]);
		});
		$.subscribe('dot-key', function(el) {
			fn = 'setDot';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('colon-key', function(el) {
			fn = 'setDoubleDot';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('shift-t-key', function(el) {
			fn = 'setTuplet';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('t-key', function(el) {
			fn = 'setTie';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('R-key', function(el) {
			fn = 'setSilence';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('supr-key', function(el) {
			fn = 'setSilence';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('enter-key', function(el) {
			fn = 'addNote';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('ctrl-c-key', function(el) {
			fn = 'copyNotes';
			$.publish('NoteEditionView', fn);
		});
		$.subscribe('pasteJSONData', function(el, jsonData) {
			fn = 'pasteNotes';
			if (jsonData && jsonData.notes) {
				$.publish('NoteEditionView', [fn, jsonData.notes]);
			}
		});

	};
	/**
	 * Manages events clicked from the menu
	 * this function is called by MainMenuView
	 */
	NoteEditionView.prototype.initController = function() {
		// pitch
		var fn;
		$('#aug-note').click(function() {
			fn = 'setPitch';
			$.publish('NoteEditionView', [fn, 1]);
		});
		$('#sub-note').click(function() {
			fn = 'setPitch';
			$.publish('NoteEditionView', [fn, -1]);
		});

		// Alteration
		$('#double_flat').click(function() {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, 'bb']);
		});
		$('#flat').click(function() {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, 'b']);
		});
		$('#natural').click(function() {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, 'n']);
		});
		$('#sharp').click(function() {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, '#']);
		});
		$('#double_sharp').click(function() {
			fn = 'addAccidental';
			$.publish('NoteEditionView', [fn, '##']);
		});
		// Rhythm
		$('#whole-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 7]);
		});
		$('#half-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 6]);
		});
		$('#quarter-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 5]);
		});
		$('#eight-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 4]);
		});
		$('#sixteenth-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 3]);
		});
		$('#thirty-second-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 2]);
		});
		$('#sixty-four-note').click(function() {
			fn = 'setCurrDuration';
			$.publish('NoteEditionView', [fn, 1]);
		});
		$('#dot').click(function() {
			fn = 'setDot';
			$.publish('NoteEditionView', fn);
		});
		$('#double-dot').click(function() {
			fn = 'setDoubleDot';
			$.publish('NoteEditionView', fn);
		});


		// Symbol
		$('#tie-note').click(function() {
			fn = 'setTie';
			$.publish('NoteEditionView', fn);
		});
		$('#tuplet').click(function() {
			fn = 'setTuplet';
			$.publish('NoteEditionView', fn);
		});

		// Note
		$('#silent-note').click(function() {
			fn = 'setSilence';
			$.publish('NoteEditionView', fn);
		});
		$('#regular-note').click(function() {
			fn = 'setPitch';
			$.publish('NoteEditionView', [fn, 0]);
		});
		$('#delete-note').click(function() {
			// in our editor we want to replace note by silence and not delete note
			fn = 'setSilence';
			$.publish('NoteEditionView', fn);
		});
		$('#add-note').click(function() {
			fn = 'addNote';
			$.publish('NoteEditionView', fn);
		});

		// Selection
		$('#copy-note').click(function() {
			fn = 'copyNotes';
			$.publish('ctrl-c-key');
		});
		$('#paste-note').click(function() {
			$(document).trigger('paste');
		});
	};
	return NoteEditionView;
});