define([
		'modules/core/src/SongModel',
		'modules/MidiCSL/src/model/NoteModel_MidiCSL',
		'modules/MidiCSL/src/converters/ChordManagerConverterMidi_MidiCSL',
		'modules/MidiCSL/utils/MidiHelper',
		'modules/core/src/NotesIterator',
		'modules/core/src/SongBarsIterator',
		'modules/converters/MusicCSLJson/src/SongModel_CSLJson',
		'utils/AjaxUtils'
	],
	function(
		SongModel,
		NoteModel_MidiCSL,
		ChordManagerConverterMidi_MidiCSL,
		MidiHelper,
		NotesIterator,
		SongBarsIterator,
		SongModel_CSLJson,
		AjaxUtils
	) {
		var SongConverterMidi_MidiCSL = {};
		/**
		 * SongConverterMidi_MidiCSL convert a song to a list of note that can be read by midi player
		 * It creates ChordConverterMidi_MidiCSL to retrieve midi informations about every chords and directly do the jobs for notes
		 * @exports MidiCSL/SongConverterMidi_MidiCSL
		 */
		SongConverterMidi_MidiCSL.exportToMidiCSL = function(songModel, unfold, callback) {
			if (!(songModel instanceof SongModel)) {
				throw 'SongConverterMidi_MidiCSL - exportToMusicCSLJSON - songModel parameters must be an instanceof SongModel';
			}
			var songToExport = unfold ? this.getUnfoldedClone(songModel) : songModel;
			var song = SongConverterMidi_MidiCSL.exportElementsToMidiCSL(songToExport);
			if (callback) {
				callback(song, songToExport);
			}
			return song;
		};

		SongConverterMidi_MidiCSL.getUnfoldedClone = function(songModel) {
			var newSongModel = songModel.clone();
			newSongModel.unfold();
			return newSongModel;
		};

		SongConverterMidi_MidiCSL.exportElementsToMidiCSL = function(songModel) {
			var song = [];
			
			song = ChordManagerConverterMidi_MidiCSL.exportToMidiCSL(songModel);
			var nm = songModel.getComponent('notes');
			
			var melodySong = SongConverterMidi_MidiCSL.exportNotesToMidiCSL(songModel);
			song = song.concat(melodySong);
			return song;
		};

		SongConverterMidi_MidiCSL.exportNotesToMidiCSL = function(songModel) {
			
			function getNote(midiNote, currentTime, duration, index){
				return new NoteModel_MidiCSL({
					midiNote: 	midiNote,
					type: 		'melody',
					currentTime:currentTime,
					duration: 	duration,
					noteIndex: 	index
				});
			}
			function getMidiPitch(note) {
				if (note.isRest) 
					return [false];
				
				var midiNote = [];
				for (var k = 0; k < note.getNumPitches(); k++) {
					midiNote[k] = MidiHelper.getKeyToNote(note.getPitch(k, true));
				}
				return midiNote;
			}
			function differentPitchFromPrevious(note) {
				return note.getPitch() !== playingNotes.getNote(notesIt.index - 1).getPitch();
			}
			var song = [];
			if (songModel === undefined || typeof MidiHelper === "undefined") {
				return song;
			}

			var note, duration, noteKey, 
				currentTime = 0,
				tieNotesObject = {},
				tieNotesNumber = 0,
				globalIndex = 0,
				prevNote;

			var playingNotes = songModel.getComponent('notes').score2play(songModel);
			var notesIt = new NotesIterator(new SongBarsIterator(songModel), playingNotes);
			
			while (notesIt.hasNext()){
				note = playingNotes.getNote(notesIt.index);
				duration = note.getDuration();
				var midiNote = getMidiPitch(note);
				if (!note.isTie()){
					if (tieNotesNumber === 0) {
						//basic case (no tied notes)
						song.push(getNote(midiNote, currentTime, duration, globalIndex));	
					} else {
						// case previous note started a tie but it is not indicated in current note
						if (note.isRest || differentPitchFromPrevious(note)) {
							// starting tie against note not tieable (we do not tie)
							song.push(getNote(midiNote, currentTime, duration, globalIndex));	
						} else {
							//we tie
							tieNotesObject.setDuration(tieNotesObject.getDuration() + duration);
						}
						//add tied note (does not matter order in which we add notes)
						song.push(tieNotesObject);
						tieNotesNumber = 0;
					}
				} else { //for tied notes
					if (note.getTie() === "start") {
						tieNotesNumber = 2;
						tieNotesObject = getNote(midiNote, currentTime, duration, globalIndex);
					}
					else if (note.getTie() === "stop_start") {
						tieNotesNumber++;
						tieNotesObject.setDuration(tieNotesObject.getDuration() + duration);
					}
					else { // note.getTie() === "stop" || note.getTie() === undefined
						if (tieNotesObject.getDuration === undefined) {
							// case the tieNotes have not been yet created (it's a particular case where tie note is tie with nothing)
							// It happens when we take a chunk of a melody
							tieNotesObject = getNote(midiNote, currentTime, duration, globalIndex);
						} else {
							// usual case
							tieNotesObject.setDuration(tieNotesObject.getDuration() + duration);
						}
						tieNotesObject.tieNotesNumber = tieNotesNumber;
						song.push(tieNotesObject);
						tieNotesNumber = 0;
					}
				}
				currentTime += duration;
				globalIndex++;
				notesIt.next();
			}
			return song;
		};

		return SongConverterMidi_MidiCSL;
	});