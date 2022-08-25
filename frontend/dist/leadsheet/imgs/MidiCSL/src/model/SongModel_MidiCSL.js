define(['modules/MidiCSL/src/model/NoteModel_MidiCSL'], function(NoteModel_MidiCSL) {

	/**
	 * SongModel_MidiCSL represent a song that is ready to be readed by midi player
	 * @exports MidiCSL/SongModel_MidiCSL
	 */
	function SongModel_MidiCSL(option) {
		this.song = (typeof(option) !== "undefined" && typeof(option.song) !== "undefined") ? option.song : [];
	}

	SongModel_MidiCSL.prototype.getSong = function() {
		return this.song;
	};

	SongModel_MidiCSL.prototype.setSong = function(song, replaceBool) {
		if (typeof replaceBool !== "undefined" && replaceBool) {
			this.song = song;
		} else {
			this.song = this.song.concat(song);
		}
	};

	SongModel_MidiCSL.prototype.setFromType = function(song, type) {
		if (typeof type === "undefined") {
			return;
		}
		for (var i = this.song.length - 1; i >= 0; i--) {
			if (this.song[i].getType() === type) {
				this.song.splice(i, 1);
			}
		}
		this.song = this.song.concat(song);
		/*console.log(this.song);*/
	};

	SongModel_MidiCSL.prototype.getFromType = function(type) {
		var elements = [];
		if (typeof type !== "undefined") {
			for (var i = 0, c = this.song.length; i < c; i++) {
				if (this.song[i].getType() === type) {
					elements.push(this.song[i]);
				}
			}
		}
		return elements;
	};

	SongModel_MidiCSL.prototype.removeFromType = function(type) {
		if (typeof type === "undefined") {
			return;
		}
		for (var i = this.song.length - 1; i >= 0; i--) {
			if (this.song[i].getType() === type) {
				this.song.splice(i, 1);
			}
		}
	};

	SongModel_MidiCSL.prototype.getLastNote = function() {
		// Looking for last note
		var lastNote = this.song[0];
		var lastNoteEndTime = lastNote.getCurrentTime() + lastNote.getDuration();
		var lastNoteType = lastNote.getType();
		var currentNote, currentEndTime;
		for (var i = 0, c = this.song.length; i < c; i++) {
			currentNote = this.song[i];
			if (currentNote && currentNote.getType() !== "metronome") {
				currentEndTime = currentNote.getCurrentTime() + currentNote.getDuration();
				var lastNoteTime  = (currentNote.getType() !== "chord" && lastNoteType === "chord") ? lastNote.getCurrentTime() : lastNoteEndTime;
				if (lastNoteTime < currentEndTime ) {
					lastNoteEndTime = currentEndTime;
					lastNoteType = currentNote.getType();
					lastNote = currentNote;
				}
			}
		}
		return lastNote;
	};

	SongModel_MidiCSL.prototype.getMidiSoundModelIndex = function(midiSoundModel) {
		if (typeof midiSoundModel !== "undefined" && midiSoundModel instanceof SongModel_MidiCSL) {
			var comp = midiSoundModel.serialize();
			for (var i = 0, c = this.song.length; i < c; i++) {
				if (this.song[i].serialize() === comp) {
					return i;
				}
			}
		}
		return -1;
	};

	SongModel_MidiCSL.prototype.getMelodySoundModelFromIndex = function(index) {
		if (!isNaN(index) && index >= 0) {
			for (var i = 0, c = this.song.length; i < c; i++) {
				if (this.song[i].getNoteIndex() === index && this.song[i].getType() === 'melody') {
					return this.song[i];
				}
			}
		}
		return undefined;
	};

	SongModel_MidiCSL.prototype.serialize = function() {
		var songModel_midiCSL = {};
		songModel_midiCSL.song = this.song;
		return songModel_midiCSL;
	};

	SongModel_MidiCSL.prototype.clone = function() {
		return new SongModel_MidiCSL(this.serialize());
	};

	SongModel_MidiCSL.prototype.generateMetronome = function(songModel) {
		var note, duration;
		var noteObject = {};
		var metronome = [];
		var currentTime = 0;
		var notes = [];
		var beatUnit = 4;
		timeSig = 4;
		if (typeof songModel !== "undefined") {
			timeSig = songModel.timeSignature.getBeats();
			beatUnit = songModel.timeSignature.getBeatUnitQuarter();
		}
		for (var i = 0, c = 200; i < c; i++) {
			if (i % timeSig === 0) {
				notes = [105]; // A7
			} else {
				notes = [93]; // A6
			}
			duration = 0.5;
			noteObject = new NoteModel_MidiCSL({
				'midiNote': notes,
				'type': 'metronome',
				'currentTime': currentTime,
				'duration': duration,
			});
			currentTime += beatUnit;
			metronome.push(noteObject);
		}
		return metronome;
	};

	return SongModel_MidiCSL;
});