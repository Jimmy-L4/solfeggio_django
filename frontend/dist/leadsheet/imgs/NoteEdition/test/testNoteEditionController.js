define([
	'modules/core/src/NoteModel',
	'modules/NoteEdition/src/NoteEditionController',
	'modules/NoteEdition/src/NoteEditionView',
	'modules/NoteEdition/src/NoteSpaceManager',
	'modules/converters/MusicCSLJson/src/SongModel_CSLJson',
	'modules/Cursor/src/CursorModel',
	'modules/LSViewer/src/LSViewer',
	'modules/Edition/src/ClipboardManager',
	'tests/test-songs'
], function(NoteModel, NoteEditionController, NoteEditionView, NoteSpaceManager, SongModel_CSLJson, CursorModel, LSViewer, ClipboardManager, testSongs) {
	return {
		run: function() {
			test("Notes Edition Controller", function(assert) {

				var songModel = SongModel_CSLJson.importFromMusicCSLJSON(testSongs.simpleLeadSheet);
				var cM = new CursorModel(songModel.getComponent('notes'));
				var viewer = new LSViewer($("#test")[0], {
					layer: true
				});
				var noteSpaceManager = new NoteSpaceManager(cM, viewer, 'NotesCursor', null, true, false);
				noteSpaceManager.enabled = true;
				viewer.draw(songModel);
				var notesEditionView = new NoteEditionView('');
				var nec = new NoteEditionController(songModel, cM, noteSpaceManager);
				
				nec.setPitch(1, true);
				cM.setPos([0,5]);
				nec.setPitch(2, true);



				nec.setPitch(-2);

				cM.setPos(0);
				assert.equal(nec._getSelectedNotes().toString(), "A/4-q");

				// Pitch
				nec.setPitch(1);
				assert.equal(nec._getSelectedNotes().toString(), "B/4-q");

				nec.setPitch("C");
				assert.equal(nec._getSelectedNotes().toString(), "C/5-q");

				// Wrong insert (accidental should be specified like this)
				nec.setPitch("Db");
				assert.equal(nec._getSelectedNotes().toString(), "C/5-q");

				// Accidentals
				nec.addAccidental("b");
				assert.equal(nec._getSelectedNotes().toString(), "Cb/5-q", 'accidental flat');

				nec.addAccidental("bb");
				assert.equal(nec._getSelectedNotes().toString(), "Cbb/5-q");

				nec.addAccidental("#");
				assert.equal(nec._getSelectedNotes().toString(), "C#/5-q");

				nec.addAccidental("##");
				assert.equal(nec._getSelectedNotes().toString(), "C##/5-q");

				nec.addAccidental("n");
				assert.equal(nec._getSelectedNotes().toString(), "Cn/5-q");

				// remove if same
				nec.addAccidental("n");
				assert.equal(nec._getSelectedNotes().toString(), "C/5-q", 'remove accidental');

				// Durations
				nec.cursor.setPos(0);
				nec.setCurrDuration("1");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 0.0625, 'durations 1');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("2");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 0.125, 'durations 2');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("3");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 0.25, 'durations 3');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("4");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 0.5, 'durations 4');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("5");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 1, 'durations 5');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("6");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 2, 'durations 6');
				
				nec.cursor.setPos(0);

				nec.setCurrDuration("7");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 4, 'durations 7');
				
				nec.cursor.setPos(0);
				nec.setCurrDuration("8");
				assert.equal(nec._getSelectedNotes()[0].getDuration(), 4, 'durations 8');
				assert.throws(function() {
					nec.setCurrDuration("9");
				}, 'throw error on impossible duration');

				nec.setDot();
				//Test failed as duration was 4, not 6, because time signature is 4/4, so it forbids it, 
				//it has wthorn a userLog error, but it is not visualized in the test, because it needs a user interface
				//assert.equal(nec._getSelectedNotes()[0].getDuration(), 6, 'dot');

				nec.setSilence();
				assert.ok(nec._getSelectedNotes()[0].isRest, 'rest');

				// add note
				var note = nec._getSelectedNotes().toString();
				nec.addNote();
				assert.equal(nec._getSelectedNotes().toString(), note, 'add note');

				
				// Tie notes
				nec.setTie();
				assert.equal(nec._getSelectedNotes()[0].isTie(), false, 'tie note with only one selected');

				nec.cursor.setPos([0, 1]);
				nec.setTie();
				assert.equal(nec._getSelectedNotes()[0].isTie(), true, 'tie note');
				assert.equal(nec._getSelectedNotes()[0].isTie("start"), true, 'tie note begin type');
				assert.equal(nec._getSelectedNotes()[0].isTie("start_stop"), false, 'tie note type');
				assert.equal(nec._getSelectedNotes()[0].isTie("stop"), false, 'tie note type');

				assert.equal(nec._getSelectedNotes()[1].isTie("stop"), true, 'tie note end type');

				nec.setTie();
				assert.equal(nec._getSelectedNotes()[0].isTie(), false, 'remove tie begin note');
				assert.equal(nec._getSelectedNotes()[1].isTie(), false, 'remove tie end note');

				nec.cursor.setPos([0, 1]);
				nec.setTie();
				nec.cursor.setPos([1, 2]);
				nec.setTie();
				nec.cursor.setPos([0, 2]);
				nec.setSilence();
				nec.cursor.setPos([0, 2]);
				assert.equal(nec._getSelectedNotes()[0].isTie(), false, 'remove tie start_stop begin note');
				assert.equal(nec._getSelectedNotes()[1].isTie(), false, 'remove tie start_stop note');
				assert.equal(nec._getSelectedNotes()[2].isTie(), false, 'remove tie start_stop end note');

				// Tuplets
				// nec.cursor.setPos([3, 4]);
				// nec.setTuplet();
				// assert.equal(nec._getSelectedNotes()[0].isTuplet(), false, 'tuplet with not 3 notes same length selected');
				// assert.equal(nec._getSelectedNotes()[0].getTuplet(), undefined, 'type tuplet with not 3 notes same length selected');

				nec.cursor.setPos([6, 8]);
				nec.setTuplet();
				nec.cursor.setPos([6, 8]);
				assert.equal(nec._getSelectedNotes()[0].isTuplet(), true, 'tuplet with 3 notes selected - first');
				assert.equal(nec._getSelectedNotes()[1].isTuplet(), true, 'tuplet with 3 notes selected - second');
				assert.equal(nec._getSelectedNotes()[2].isTuplet(), true, 'tuplet with 3 notes selected - third');

				assert.equal(nec._getSelectedNotes()[0].getTuplet(), "start", 'type tuplet with 3 notes selected - start');
				assert.equal(nec._getSelectedNotes()[1].getTuplet(), "middle", 'type tuplet with 3 notes selected - middle');
				assert.equal(nec._getSelectedNotes()[2].getTuplet(), "stop", 'type tuplet with 3 notes selected - stop');

				// copy/paste
				var clipBoardManager = new ClipboardManager($("#test")[0]);
				var $hiddenClipboardElement = clipBoardManager.$hiddenClipboardHolder;
				nec.cursor.setPos([3,5]);
				var selNotes = nec._getSelectedNotes();
				var serializedNotes = [];
				for (var index in selNotes) {
					serializedNotes.push(selNotes[index].serialize());
				}
				nec.copyNotes();
				var textareaVal = $hiddenClipboardElement.val();
				assert.deepEqual(JSON.parse(textareaVal).notes, serializedNotes, 'copy Notes');

				nec.cursor.setPos([9, 11]);
				$.publish('pasteJSONData', [JSON.parse(textareaVal)]);
				nec.cursor.setPos([9, 11]);
				var pastedNotes = nec._getSelectedNotes();
				var serializedPastedNotes = [];
				for (var j in pastedNotes) {
					serializedPastedNotes.push(pastedNotes[j].serialize());
				}
				assert.deepEqual(serializedNotes, serializedPastedNotes, 'paste Notes');

				

				// Editor test where delete is like silence
				var necDelete = createRhythmicMelody();
				// "F#/5-q,G/5-8.,F#/5-16,F#/5-q(3/2),G/5-q(3/2),A/5-q(3/2),Bb/5-q,Ab/5-q"  	(after each step we show value of necDelete.songModel.getComponent('notes').getNotes().toString())
				necDelete.setSilence();
				assert.equal(necDelete._getSelectedNotes().toString(), 'qr', 'delete note');
				// "qr,G/5-8.,F#/5-16,F#/5-q(3/2),G/5-q(3/2),A/5-q(3/2),Bb/5-q,Ab/5-q"

				necDelete.cursor.setPos([1, 2]);
				necDelete.setSilence();
				assert.equal(necDelete._getSelectedNotes().toString(), 'hr', 'delete note');
				// "hr,F#/5-q(3/2),G/5-q(3/2),A/5-q(3/2),Bb/5-q,Ab/5-q"

				necDelete.cursor.setPos([1, 1]);
				necDelete.setSilence();
				assert.equal(necDelete._getSelectedNotes().toString(), 'q(3/2)r', 'Delete tuplet note');
				assert.equal(necDelete._getSelectedNotes()[0].isTuplet(), true, 'tuplet after one note deletion should be a tuplet');
				// "hr,q(3/2)r,G/5-q(3/2),A/5-q(3/2),Bb/5-q,Ab/5-q"

				necDelete.cursor.setPos([1, 3]);
				necDelete.setSilence();
				assert.equal(necDelete._getSelectedNotes()[0].isTuplet(), false, 'removed whole tuple, merged with previous rest');
				// "wr,Bb/5-q,Ab/5-q"
				assert.deepEqual(necDelete.cursor.getPos(), [0, 0]);

				necDelete.cursor.setPos([2, 2]);
				necDelete.setCurrDuration("4");
				// "wr, Bb/5-q,Ab/5-8,8r"
				
				necDelete.cursor.setPos([2, 2]);
				necDelete.setDot();
				assert.deepEqual(necDelete.songModel.getComponent('notes').getNotesAsString(),["wr", "Bb/5-q", "Ab/5-8.", "16r"], 'dot in last note');

				songModel = SongModel_CSLJson.importFromMusicCSLJSON(testSongs.simpleLeadSheet);
				cM = new CursorModel(songModel.getComponent('notes'));
				nec = new NoteEditionController(songModel, cM);
				assert.equal(nec.moveCursorByBar(-1), undefined);
				nec.moveCursorByBar(1);
				assert.equal(nec._getSelectedNotes().toString(), "A/4-q");
				nec.moveCursorByBar(-1);
				nec.setCurrDuration("2");
				assert.equal(nec._getSelectedNotes().toString(), "A/4-32"); //cursor after changes gets one position

				var necLastNote = createRhythmicMelody();
				necLastNote.cursor.setPos(6);
				necLastNote.setCurrDuration("6"); //convert to half note
				assert.deepEqual(
					necLastNote.songModel.getComponent('notes').getNotesAsString(),
					["F#/5-q", "G/5-8.", "F#/5-16", "F#/5-q(3/2)", "G/5-q(3/2)", "A/5-q(3/2)", "Bb/5-h"]);
				

				// rhythm  q,8,16,16, triplet(q,q,q)
				function createRhythmicMelody() {
					var songModel = SongModel_CSLJson.importFromMusicCSLJSON(testSongs.simpleLeadSheet);
					var cM = new CursorModel(songModel.getComponent('notes'));
					var nec = new NoteEditionController(songModel, cM);
					var rhythmicMelody = [];
					rhythmicMelody.push(new NoteModel({
						pitchList: ["F#/5"],
						duration: "q"
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["G/5"],
						duration: "8",
						dot: 1
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["F#/5"],
						duration: "16"
					}));

					rhythmicMelody.push(new NoteModel({
						pitchList: ["F#/5"],
						duration: "q",
						tuplet: "start",
						timeModification: "3/2"
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["G/5"],
						duration: "q",
						timeModification: "3/2"
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["A/5"],
						duration: "q",
						tuplet: "stop",
						timeModification: "3/2"
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["Bb/5"],
						duration: "q"
					}));
					rhythmicMelody.push(new NoteModel({
						pitchList: ["Ab/5"],
						duration: "q"
					}));
					songModel.getComponent('notes').setNotes(rhythmicMelody);

					return nec;
				}

			});
		}
	};
});