define([], function() {
	/**
	 * NoteModel_MidiCSL represent a note that is ready to be readed by midi player
	 * @exports MidiCSL/NoteModel_MidiCSL
	 */
	function NoteModel_MidiCSL(option) {
		this.currentTime = (typeof option !== "undefined" && typeof(option.currentTime) !== "undefined") ? option.currentTime : 0.0; // currentTime in beat
		this.duration = (typeof option !== "undefined" && typeof(option.duration) !== "undefined") ? option.duration : 0.0; // duration in beat
		this.type = (typeof option !== "undefined" && typeof(option.type) !== "undefined") ? option.type : undefined; // type is melody or chord
		this.midiNote = (typeof option !== "undefined" && typeof(option.midiNote) !== "undefined") ? option.midiNote : [];
		this.noteIndex = (typeof option !== "undefined" && typeof(option.noteIndex) !== "undefined") ? option.noteIndex : undefined;
	}

	NoteModel_MidiCSL.prototype.getCurrentTime = function() {
		return this.currentTime;
	};

	NoteModel_MidiCSL.prototype.setCurrentTime = function(currentTime) {
		if (typeof currentTime === "undefined" || isNaN(currentTime) || currentTime < 0) {
			throw 'NoteModel_MidiCSL - setCurrentTime - currentTime must be a positive float ' + currentTime;
		}
		this.currentTime = currentTime;
	};

	NoteModel_MidiCSL.prototype.getDuration = function() {
		return this.duration;
	};

	NoteModel_MidiCSL.prototype.setDuration = function(duration) {
		if (typeof duration === "undefined" || isNaN(duration) || duration < 0) {
			throw 'NoteModel_MidiCSL - setCurrentTime - duration must be a positive float ' + duration;
		}
		this.duration = duration;
	};

	NoteModel_MidiCSL.prototype.getType = function() {
		return this.type;
	};

	NoteModel_MidiCSL.prototype.setType = function(type) {
		if (typeof type === "undefined") {
			throw 'NoteModel_MidiCSL - setType - type is undefined ' + type;
		}
		this.type = type;
	};

	NoteModel_MidiCSL.prototype.getMidiNote = function() {
		return this.midiNote;
	};

	NoteModel_MidiCSL.prototype.setMidiNote = function(midiNote) {
		if (typeof midiNote === "undefined") {
			throw 'NoteModel_MidiCSL - setType - midiNote is undefined ' + midiNote;
		}
		this.midiNote = midiNote;
	};

	NoteModel_MidiCSL.prototype.getNoteIndex = function() {
		return this.noteIndex;
	};

	NoteModel_MidiCSL.prototype.getTransposeMidiNote = function(semi_tons) {
		var midiNote = [];
		var computedMidiNote;
		if (this.midiNote !== "undefined") {
			for (var i = 0, c = this.midiNote.length; i < c; i++) {
				computedMidiNote = this.midiNote[i] + semi_tons;
				if (computedMidiNote >= 21 && computedMidiNote <= 108) {
					midiNote[i] = computedMidiNote;
				}
			}
		}
		return midiNote;
	};

	NoteModel_MidiCSL.prototype.serialize = function() {
		//return JSON.stringify(this.currentTime + this.duration + this.type + this.midiNote);
		var noteModel_midiCSL = {};
		noteModel_midiCSL.currentTime = this.currentTime;
		noteModel_midiCSL.duration = this.duration;
		noteModel_midiCSL.type = this.type;
		noteModel_midiCSL.midiNote = this.midiNote;
		return noteModel_midiCSL;
	};

	NoteModel_MidiCSL.prototype.clone = function() {
		return new NoteModel_MidiCSL(this.serialize());
	};

	return NoteModel_MidiCSL;
});