define([
		'modules/core/src/SongModel',
		'modules/core/src/ChordManager',
		'modules/core/src/SongBarsIterator',
		'modules/MidiCSL/src/converters/ChordConverterMidi_MidiCSL',
		'modules/MidiCSL/src/model/NoteModel_MidiCSL'
	],
	function(SongModel, ChordManager, SongBarsIterator, ChordConverterMidi_MidiCSL, NoteModel_MidiCSL) {
		/**
		 * ChordManagerConverterMidi_MidiCSL convert chords to a list of note that can be read by midi player
		 * It creates ChordConverterMidi_MidiCSL to retrieve midi informations about every chords
		 * 
		 * Object is created by SongConverterMidi_MidiCSL
		 * @exports MidiCSL/ChordManagerConverterMidi_MidiCSL
		 */
		var ChordManagerConverterMidi_MidiCSL = {};

		/**
		 * gets MidiCSL notes for a SongModel. Concretely it works this way:
		 * for each bar takes the chords and translates it to Midi, so that notes are played at the precise time
		 * if a bar has no chord:
		 *  	- if there is no previous chord, it does nothing
		 *  	- if there is a previous chord, it repeats that previous chord
		 * 
		 */
		ChordManagerConverterMidi_MidiCSL.exportToMidiCSL = function(songModel) {

			function getChordAsMidi(time, duration, midiNotes) {
				return new NoteModel_MidiCSL({
					currentTime: time,
					duration: duration,
					midiNote: midiNotes,
					type: 'chord'
				});
			}

			if (!songModel instanceof SongModel) {
				throw 'ChordManagerConverterMidi_MidiCSL - exportToMidiCSL - songModel parameters must be an instanceof SongModel';
			}

			var chords = [];
			if (songModel.getComponent('chords') === "undefined") {
				return undefined;
			}
			var chordManager = songModel.getComponent('chords'),
				songIt = new SongBarsIterator(songModel),
				currentTime = 0,
				duration = 0.0,
				midiNotes = [],
				barDuration,
				chordsInBar = [];

			while (songIt.hasNext()) {
				chordsInBar = chordManager.getChordsByBarNumber(songIt.getBarIndex());
				barDuration = songIt.getBarTimeSignature().getQuarterBeats();
				if (chordsInBar.length === 0) {
					// case there is no chord in bar, we repeat previous one, if there is no previous one we just continue to next bar
					if (!midiNotes || midiNotes.length != 0) { //first condition will be true when there are no chords in current bar and previous bar had NC, second condition will be true on bars with one NC
						duration = songIt.getBarTimeSignature().getQuarterBeats();
						chords.push(getChordAsMidi(currentTime, duration, midiNotes));
					}
				} else {
					var nextBeatTime, chordCurrentTime,
						barUnitQuarterBeat = songIt.getBarTimeSignature().getBeatUnitQuarter();

					for (var i = 0; i < chordsInBar.length; i++) {

						chordCurrentTime = currentTime + (chordsInBar[i].getBeat() - 1) * barUnitQuarterBeat;
						nextBeatTime = (i < chordsInBar.length - 1) ? (chordsInBar[i + 1].getBeat() - 1) * barUnitQuarterBeat : barDuration;
						duration = currentTime + nextBeatTime - chordCurrentTime;
						midiNotes = ChordConverterMidi_MidiCSL.exportToMidiCSL(chordsInBar[i]);
						chords.push(getChordAsMidi(chordCurrentTime, duration, midiNotes));
					}
				}
				currentTime += barDuration;
				songIt.next();
			}
			return chords;
		};

		return ChordManagerConverterMidi_MidiCSL;
	});