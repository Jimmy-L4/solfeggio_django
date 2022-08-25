define([], function() {
	var MidiHelper = {}; // Namespaces

	MidiHelper.convertNotesToMidi = function(allNotes) {
		var allMidiNotes = [];
		if (typeof allNotes !== "undefined") {
			var currentNote;
			for (var i = 0, c = allNotes.length; i < c; i++) {
				currentNote = allNotes[i];
				currentNote = MidiHelper.convertSharp2Flat(currentNote);
				currentNote = MidiHelper.detectImpossibleFlat(currentNote);
				currentNote = MidiHelper.convertDoubleAccidental(currentNote);
				allMidiNotes[i] = MidiHelper.keyToNote[currentNote];
				/*		if(!MIDI.keyToNote[ currentNote ]){
				console.log(this.allNotes[ i ], currentNote);
			}*/
			}
		}
		return allMidiNotes;
	}

	/*
	 * This function convert double accident sharp or flat
	 * @argument noteKey is a String Containing [note + (sharp/flat) + (sharp/flat) + scaleNumber] , e.g C##4
	 * return a string noteKey containing for e.g. D4
	 */
	MidiHelper.convertDoubleAccidental = function(noteKey) {
		if (typeof noteKey === "undefined") {
			return;
		}
		if (noteKey[1] === "#" && noteKey[2] === "#") {
			if (noteKey[0] === "G") {
				noteKey = "A" + noteKey.substring(3);
			} else if (noteKey[0] === "B") {
				noteKey = "C" + (parseInt(noteKey[3]) + 1); // Change to upper scale
			} else {
				noteKey = String.fromCharCode(noteKey.charCodeAt(0) + 1) + noteKey.substring(3);
			}
		} else if (noteKey[1] === "b" && noteKey[2] === "b") {
			if (noteKey[0] === "A") {
				noteKey = "G" + noteKey.substring(3);
			} else if (noteKey[0] === "C") {
				noteKey = "B" + (parseInt(noteKey[3]) - 1); // Change to upper scale
			} else {
				noteKey = String.fromCharCode(noteKey.charCodeAt(0) - 1) + noteKey.substring(3);
			}
		}
		return noteKey;
	}

	/*
	 * This function transform sharp to flat for soundfont use
	 * @argument noteKey is a String Containing [note + (sharp) + scaleNumber] , e.g C#4
	 * return a string noteKey containing for e.g. Db4
	 */
	MidiHelper.convertSharp2Flat = function(noteKey) {
		if (typeof noteKey === "undefined") {
			return;
		}
		if (noteKey[1] === "#") {
			if (noteKey[0] === "G") {
				noteKey = "Ab" + noteKey.substring(2);
			} else if (noteKey[0] === "B") {
				noteKey = "C" + (parseInt(noteKey[2]) + 1); // Change to upper scale
			} else if (noteKey[0] === "E") {
				noteKey = "F" + noteKey.substring(2);
			} else {
				noteKey = String.fromCharCode(noteKey.charCodeAt(0) + 1) + 'b' + noteKey.substring(2);
			}
		}
		return noteKey;
	}

	/*
	 * This function detects non obvious flat (Cb and Fb) and transform them to note
	 * @argument noteKey is a String Containing [note + (sharp) + scaleNumber] , e.g Cb4
	 * returns a string noteKey containing for e.g. B4
	 */
	MidiHelper.detectImpossibleFlat = function(noteKey) {
		if (typeof noteKey === "undefined") {
			return;
		}
		if (noteKey[1] === "b") {
			if (noteKey[0] === "C") {
				noteKey = "B" + (parseInt(noteKey[2]) - 1); // Change to lower scale
			} else if (noteKey[0] === "F") {
				noteKey = "E" + noteKey.substring(2);
			}
		}
		return noteKey;
	}

	/*
	 * This function transpose midi notes array, the number of transposition is midiDecal
	 * @argument midiNotes array of int that contain series of midiNotes
	 * @argument midiDecal desired transposition decal (put -x to go lower, +x for higher note)
	 * return the transposed midinotes array
	 */
	MidiHelper.transposeMidiNotes = function(midiNotes, midiDecal) {
		if (typeof midiNotes !== "undefined" && !isNaN(midiDecal)) {
			for (var i = 0, c = midiNotes.length; i < c; i++) {
				midiNotes[i] += midiDecal;
			}
			return midiNotes;
		}
		return undefined;
	};

	MidiHelper.getKeyToNote = function(noteKey){
		noteKey = MidiHelper.convertDoubleAccidental(noteKey);
		noteKey = MidiHelper.convertSharp2Flat(noteKey);
		noteKey = MidiHelper.detectImpossibleFlat(noteKey);
		return this.keyToNote[noteKey];
	}

	//code taken from MidiJS lib
	// note conversions
	MidiHelper.keyToNote = {}; // C8  == 108
	MidiHelper.noteToKey = {}; // 108 ==  C8
	(function () {
		var A0 = 0x15; // first note
		var C8 = 0x6C; // last note
		var number2key = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
		for (var n = A0; n <= C8; n++) {
			var octave = (n - 12) / 12 >> 0;
			var name = number2key[n % 12] + octave;
			MidiHelper.keyToNote[name] = n;
			MidiHelper.noteToKey[n] = name;
		}
	})();

	return MidiHelper;
});