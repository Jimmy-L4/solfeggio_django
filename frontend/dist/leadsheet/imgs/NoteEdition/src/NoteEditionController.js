define([
	'mustache',
	'modules/Edition/src/EditionControllerInterface',
	'modules/core/src/NoteManager',
	'modules/core/src/NoteModel',
	'utils/NoteUtils',
	'utils/UserLog',
	'jquery',
	'underscore'
], function(Mustache, EditionControllerInterface, NoteManager, NoteModel, NoteUtils, UserLog, $, _) {
	/**
	 * NoteEditionController manages all notes edition function
	 * @exports NoteEdition/NoteEditionController
	 */
	function NoteEditionController(songModel, cursor, noteSpaceMng) {
		if (!songModel || !cursor) {
			throw "NoteEditionController params are wrong";
		}
		$.extend(this, new EditionControllerInterface());
		this.songModel = songModel;
		this.cursor = cursor;
		this.noteSpaceMng = noteSpaceMng; // in tests we don't pass noteSpaceMng, it will be undefined
		this.initSubscribe();
		this._lastCursorIndexHistory = -1; // we add an entry in history only when cursor is changed (it adds only one entry in histo)
	}

	/**
	 * Subscribe to view events
	 */
	NoteEditionController.prototype.initSubscribe = function() {
		var self = this;

		function getHistoryName(fn) {
			var name;
			switch (fn) {
				case 'setPitch':
					name = 'Change pitch';
					break;
				case 'addAccidental':
					name = 'Change note accidental';
					break;
				case 'setCurrDuration':
				case 'setDot':
				case 'setDoubleDot':
					name = 'Change note duration';
					break;
				case 'setTie':
					name = 'Add tie';
					break;
				case 'setTuplet':
					name = 'Add tuplets';
					break;
				case 'setSilence':
					name = 'Change note';
					break;
				case 'addNote':
					name = 'Add note';
					break;
				case 'pasteNotes':
					name = 'Paste notes';
					break;
			}
			return name;
		}

		function addToHistory(fn) {
			var updateLastEntry = self._lastCursorIndexHistory === self.cursor.getPos();
			$.publish('ToHistory-add', [getHistoryName(fn), updateLastEntry, self.cursor.getPos()]);
			self._lastCursorIndexHistory = self.cursor.getPos();
		}

		// cursor view subscribe
		$.subscribe('Cursor-moveCursorByElement-notes', function(el, inc) {
			if (self.cursor.getEditable()) {
				self.moveCursorByBar(inc);
				$.publish('CanvasLayer-refresh');
			}
		});
		// All functions related with note edition go here
		$.subscribe('NoteEditionView', function(el, fn, param, shiftKey) {
			if (self.noteSpaceMng.isEnabled() && (self.isEditable() || fn === 'copyNotes')) {
				var modifications = self[fn].call(self, param, shiftKey);
				if (fn == 'addNote') { // we increment cursor if we added a note
					self.cursor.increment();
				}
				if (modifications !== false) { //if the fn didn't do any modifiations, then no history to store 
					addToHistory(fn);
				}
				$.publish('ToLayers-removeLayer');
				$.publish('ToAudioPlayer-disable');
				$.publish('ToViewer-draw', self.songModel);
			}
		});
	};
	//Private functions
	/**
	 * if a duration function is applied to a tuplet note, we expand cursor to include the other tuplet notes (to avoid strange durations
	 */
	NoteEditionController.prototype._ifTupletExpandCursor = function() {
		var noteManager = this.songModel.getComponent('notes');
		var notes = noteManager.getNotes();
		var c = this.cursor.getStart();
		if (notes[c].isTuplet()) {
			c--;
			while (c >= 0 && notes[c].isTuplet() && !notes[c].isTuplet('stop')) {
				this.cursor.setPos([c, this.cursor.getEnd()]);
				c--;
			}
		}
		c = this.cursor.getEnd();
		if (notes[c].isTuplet()) {
			c++;
			while (c < notes.length && notes[c].isTuplet() && !notes[c].isTuplet('start')) {
				this.cursor.setPos([this.cursor.getStart(), c]);
				c++;
			}
		}
	};

	/**
	 * Return a boolean that indicates is the whole tuplet is selected by the cursor from a note Index
	 */
	NoteEditionController.prototype._isWholeTupletSelected = function(noteIndex) {
		if (isNaN(noteIndex)) {
			throw 'NoteEditionController - _isWholeTupletSelected - You should send a noteIndex to get a valid answer ' + noteIndex;
		}
		var notes = this.songModel.getComponent('notes').getNotes();
		var cursorStart = this.cursor.getStart();
		var cursorEnd = this.cursor.getEnd();
		if (noteIndex < cursorStart || cursorEnd < noteIndex) {
			return false;
		}
		var cursorTmp = noteIndex;
		if (!notes[cursorTmp].isTuplet('start')) {
			// If selected note is not the start, then we search for tuplet start backward in the cursor selection
			cursorTmp--;
			while (cursorTmp > cursorStart && !notes[cursorStart].isTuplet('start')) {
				cursorTmp--;
			}
			if (cursorTmp < cursorStart) {
				return false;
			}
		}
		cursorTmp = noteIndex;
		if (!notes[cursorTmp].isTuplet('stop')) {
			// If selected note is not the stop, then we search for tuplet stop forward in the cursor selection
			cursorTmp++;
			while (cursorTmp <= cursorEnd && !notes[cursorTmp].isTuplet('stop')) {
				cursorTmp++;
			}
			if (cursorEnd < cursorTmp) {
				return false;
			}
		}
		return true;
	};

	/**
	 * for duration functions we will check always if change does not exceeds a bar duration
	 * @param  {NoteManager} tmpNm
	 * @return {Boolean}
	 */
	NoteEditionController.prototype._fitsInBar = function(tmpNm) {
		var noteManager = this.songModel.getComponent('notes');
		var initIndex = this.cursor.getStart();
		var initBeat = noteManager.getNoteBeat(initIndex);
		var numBar = noteManager.getNoteBarNumber(initIndex, this.songModel);
		var barBeatDuration = this.songModel.getTimeSignatureAt(numBar).getQuarterBeats();
		var barRelativeBeat = initBeat - this.songModel.getStartBeatFromBarNumber(numBar);

		var notesNew = tmpNm.getNotes();
		var duration;
		for (var i = 0; i < notesNew.length; i++) {
			duration = notesNew[i].getDuration();
			if (NoteUtils.roundBeat(barRelativeBeat) < barBeatDuration &&
				NoteUtils.roundBeat(barRelativeBeat + duration) > barBeatDuration) {
				return false;
			}
			barRelativeBeat += duration;
		}
		return true;
	};
	/**
	 * used usuarlly by pitch functions
	 * @return {Array} Array of NoteModel
	 */
	NoteEditionController.prototype._getSelectedNotes = function() {
		var noteManager = this.songModel.getComponent('notes');
		return noteManager.getNotes(this.cursor.getStart(), this.cursor.getEnd() + 1);
	};

	/**
	 * Function clones selectedNotes and inserts it in a new NoteManager
	 * @return {NoteManager} return a cloned notemanager that contain as many notes as the cursor selection
	 */
	NoteEditionController.prototype._cloneSelectedNotes = function() {
		/*we run it in a temporal NoteManager, and then we check if there are duration differences to fill with silences or not*/
		var nm = this.songModel.getComponent('notes');
		var selectedNotes = nm.cloneElems(this.cursor.getStart(), this.cursor.getEnd() + 1);
		var tmpNm = new NoteManager();
		tmpNm.setNotes(selectedNotes);
		return tmpNm;
	};
	/**
	 * checks if after doing the required operation the duration of the changes is longer than what was selected or not
	 * if it is shorter it adds silences,
	 * if it is longer but the duration finishes inside the duration of a note, it deletes the note and replaces the remaining time with silence too
	 * @param  {NoteManager} noteMng   manager of the original notes
	 * @param  {NoteManager} tmpNm     manager of the selected notes after being modified (e.g. if we are adding a dot to a quarter note, tmpNm will contain that note already dotted)
	 * @param  {Integer} durBefore duration before the changes (.e.g 1 beats,  for a quarter note)
	 * @param  {Integer} durAfter  duration after the chagnes (e.g. 1.5 beats, for a dotted quarter note)
	 * @return {tmpNm}           returns tmpNm with added rests if necessary, ready for being pasted to original note manager
	 */
	NoteEditionController.prototype._checkDuration = function(noteMng, tmpNm, durBefore, durAfter) {
		function checkIfBreaksTuplet(initBeat, endBeat, nm) {
			/**
			 * means that is a 0.33333 or something like that
			 * @return {Boolean}
			 */
			function isTupletBeat(beat) {
				beat = beat * 16;
				return Math.round(beat) != beat;
			}
			var iPrevNote = nm.getNextIndexNoteByBeat(initBeat);
			var iNextNote = nm.getNextIndexNoteByBeat(endBeat);
			return isTupletBeat(nm.getNoteBeat(iPrevNote)) || iNextNote < nm.getTotal() && isTupletBeat(nm.getNoteBeat(iNextNote));
		}

		var initBeat = noteMng.getNoteBeat(this.cursor.getStart());
		var endBeat = initBeat + durAfter;
		var divisions;

		if (durAfter < durBefore) {
			divisions = this.songModel.getBarDivisionsBetweenBeats(initBeat + durAfter, initBeat + durBefore);
			tmpNm.fillGapWithRests(divisions);
		} else if (durAfter > durBefore) {
			if (checkIfBreaksTuplet(initBeat, endBeat, noteMng)) {
				//TODO: return object
				var msg = "Can't break tuplet";
				UserLog.logAutoFade('error', msg);
				console.warn(msg);
				return;
			}
			var endIndex = noteMng.getNextIndexNoteByBeat(endBeat);
			// after having copied notes sometimes there can be a gap to old duration, if so, we add silences 
			// (e.g. last not copied is an 8th note that starts at the same point a half note started, 
			//	so overwriting it, there are 1.5 beats missing to be filled by silences)

			var beatEndNote;
			// when dealing with changes in last note we make sure index does not exceed total notes
			if (!endIndex || endIndex >= noteMng.getTotal()) {
				var indexLastNote = noteMng.getTotal() - 1;
				var beatStartLastNote = noteMng.getNoteBeat(indexLastNote);
				var durLastNote = noteMng.getNotes()[indexLastNote].getDuration();
				beatEndNote = beatStartLastNote + durLastNote;

			} else {
				beatEndNote = noteMng.getNoteBeat(endIndex);

			}

			if (endBeat < beatEndNote) {
				tmpNm.fillGapWithRests(beatEndNote - endBeat);
			}

			//important, to keep consistency in noteSpaceMng
			this.cursor.setPos([this.cursor.getStart(), endIndex - 1]);
		}

		return tmpNm;
	};
	/**
	 * after duration funcion, we merge rests that concern changed area
	 */
	NoteEditionController.prototype.mergeRests = function() {
		var noteMng = this.songModel.getComponent('notes');
		var restAreas = noteMng.findRestAreas(this.cursor.getPos());
		var area, beats, divisions, tmpNm;

		if (restAreas) {
			for (var i = 0; i < restAreas.length; i++) {
				tmpNm = new NoteManager();
				area = restAreas[i];
				beats = noteMng.getBeatIntervalByIndexes(area[0], area[1]);
				divisions = this.songModel.getBarDivisionsBetweenBeats(beats[0], beats[1]);
				tmpNm.fillGapWithRests(divisions);
				area[1] - 1;
				noteMng.notesSplice(area, tmpNm.getNotes());
			}
		}
	};

	/**
	 * wrapper for all duration functions
	 * @param  {Function} fn function to be called
	 */
	NoteEditionController.prototype._runDurationFn = function(fn) {

		var noteMng = this.songModel.getComponent('notes');
		var tmpNm = this._cloneSelectedNotes();
		var onlyRestsBefore = tmpNm.onlyRests();
		var tmpCursorPos = this.cursor.getPos();
		//saving beat interval, to put again cursor later, regardless of changed notes
		var tmpBeatInterval = noteMng.getBeatIntervalByIndexes(tmpCursorPos[0], tmpCursorPos[1]);
		var durBefore = tmpNm.getTotalDuration();

		//Here we run the actual function
		var res = fn(tmpNm);
		if (res && res.error) {
			UserLog.logAutoFade('error', res.error);
			return;
		}

		var durAfter = tmpNm.getTotalDuration();
		//check if durations fit in the bar duration
		if (!this._fitsInBar(tmpNm)) {
			var msg = "Duration doesn't fit the bar";
			UserLog.logAutoFade('error', msg);
			console.warn(msg);
			return;
		}

		tmpNm = this._checkDuration(noteMng, tmpNm, durBefore, durAfter, this.songModel);
		noteMng.notesSplice(this.cursor.getPos(), tmpNm.getNotes());
		noteMng.reviseNotes();

		//we merge only of we are not changing duration of rests
		if (!(onlyRestsBefore && tmpNm.onlyRests())) {
			this.mergeRests();
		}

		// tmpCursorPos = noteMng.getIndexesStartingBetweenBeatInterval(tmpBeatInterval[0], tmpBeatInterval[1], true);
		// if we wanted cursor comprise whole previously selected space we whould have use previous line, 
		// otherwise, next line (cursor comprises first position)
		tmpCursorPos = noteMng.getPrevIndexNoteByBeat(tmpBeatInterval[0]);
		this.cursor.setPos(tmpCursorPos);
	};

	//Public functions:
	//
	//Pitch functions
	/**
	 * Set selected notes to a key
	 * @param {int|letter} If decal is a int, than it will be a decal between current note and wanted note in semi tons, if decal is a letter then current note is the letter
	 */
	NoteEditionController.prototype.setPitch = function(decalOrNote, chromatic) {
		var self = this,
			note,
			type = NoteUtils.getValidPitch(decalOrNote) !== -1 ? 'pitch' : 'decal';

		if (chromatic && type == 'decal'  ){
			setPitchChromatically();
		}else{
			setPitchNormally();
		}

		function setPitchChromatically(){
			var newKey;
			var noteMng = self.songModel.getComponent('notes');
			var start = self.cursor.getStart(),
			 	end = self.cursor.getEnd() + 1;
			var tmpNoteMng = noteMng.score2play(self.songModel, start, end);
			
			for (var i = 0; i < tmpNoteMng.getTotal(); i++) {
				note = tmpNoteMng.getNote(i);
				if (!note.isRest){
					newKey = NoteUtils.getNextChromaticKey(note.getPitch(), decalOrNote);
					note.setNoteFromString(newKey);
				}
			}
			noteMng.notesSplice([start, end -1], tmpNoteMng.getNotes());
			var tmpNoteMng = noteMng.play2score(self.songModel, start, end);
			noteMng.notesSplice([start, end - 1], tmpNoteMng.getNotes());
		}

		function setPitchNormally(){
			var newKey;		
			var selNotes = self._getSelectedNotes();
			var convertRestToNote = (selNotes.length == 1);
			for (var i = 0; i < selNotes.length; i++) {
				note = selNotes[i];
				if (note.isRest && convertRestToNote) {
					note.setRest(false);
				}
				if (type == 'pitch') {
					//find closest key
					newKey = NoteUtils.getClosestKey(note.getPitch(), decalOrNote);
					note.setNoteFromString(newKey);
				} else if (!note.isRest) {
					newKey = NoteUtils.getNextKey(note.getPitch(), decalOrNote); // decalOrNote is 1 or -1
					note.setNoteFromString(newKey);
				}
			}
		}
	};

	NoteEditionController.prototype.transposeBy = function(interval, direction) {
		var selNotes = this._getSelectedNotes();
		
	};

	NoteEditionController.prototype.addAccidental = function(accidental) {
		var selNotes = this._getSelectedNotes();
		var note;
		if (typeof doubleAccidental !== "undefined" && doubleAccidental === true && accidental !== "n") {
			accidental += accidental;
		}
		for (var i = 0; i < selNotes.length; i++) {
			note = selNotes[i];
			if (note.isRest) continue;
			if (note.getAccidental() == accidental) {
				note.removeAccidental();
			} else {
				note.setAccidental(accidental);
			}
		}
	};

	//Duration functions
	/**
	 * setCurrDuration("4")
	 * @param {String} duration	represents the duration
	 */
	NoteEditionController.prototype.setCurrDuration = function(duration) {
		this._ifTupletExpandCursor();
		this._runDurationFn(function(tmpNm) {

			var arrDurs = {
				"1": "64",
				"2": "32",
				"3": "16",
				"4": "8",
				"5": "q",
				"6": "h",
				"7": "w",
				"8": "w" //should be double whole but not supported yet
			};
			var notes = tmpNm.getNotes();
			var newDur = arrDurs[duration];
			if (typeof newDur === "undefined") {
				throw 'NoteEditionController - setCurrDuration not accepted duration ' + duration;
			}

			for (var i = 0; i < notes.length; i++) {
				notes[i].setDuration(newDur);
			}
		});
	};

	NoteEditionController.prototype.setDot = function() {
		this._runDurationFn(function(tmpNm) {
			var notes = tmpNm.getNotes();
			var numberOfDots = 0;
			for (var i = 0, c = notes.length; i < c; i++) {
				numberOfDots = notes[i].getDot();
				if (numberOfDots === 1) {
					numberOfDots = 0;
				} else {
					numberOfDots = 1;
				}
				notes[i].setDot(numberOfDots);
			}
			return notes;
		});
	};
	NoteEditionController.prototype.setDoubleDot = function() {
		this._runDurationFn(function(tmpNm) {
			var notes = tmpNm.getNotes();
			var numberOfDots = 0;
			for (var i = 0, c = notes.length; i < c; i++) {
				numberOfDots = notes[i].getDot();
				if (numberOfDots === 2) {
					numberOfDots = 0;
				} else {
					numberOfDots = 2;
				}
				notes[i].setDot(numberOfDots);
			}
			return notes;
		});
	};

	NoteEditionController.prototype.setTie = function() {
		var selNotes = this._getSelectedNotes();
		var note;
		if (selNotes.length == 2) {
			for (var i = 0; i < selNotes.length; i++) {
				note = selNotes[i];
				if (i === 0) {
					if (note.isTie("start"))
						note.removeTie("start");
					else
						note.setTie("start");
				} else {
					if (note.isTie("stop"))
						note.removeTie("stop");
					else
						note.setTie("stop");
				}
			}
		}
	};

	NoteEditionController.prototype.setTuplet = function() {
		var self = this;
		this._runDurationFn(function(tmpNm) {

			function validDur(notes) {
				//get total duration
				var dur = 0,
					i;
				for (i = 0; i < notes.length; i++) {
					dur += notes[i].getDuration();
				}
				//check if valid
				var initDur = 4;
				for (i = 0; i < 6; i++) {
					if (initDur == dur) return true;
					initDur /= 2;
				}
				return false;
			}

			function createTupletFromNotes(arrNotes, timeModif) {
				var firstNote = arrNotes[0],
					tmpNote,
					newDuration = (arrNotes.length == 1) ? firstNote.getDuration() / 2 : firstNote.getDuration();
				tupletsNote = [];

				for (var i = 0; i < 3; i++) {
					tmpNote = firstNote.clone();
					tmpNote.setDurationByBeats(newDuration);

					if (i === 0) tmpNote.setTuplet("start", timeModif);
					else if (i === 1) tmpNote.setTuplet("middle", timeModif);
					else tmpNote.setTuplet("stop", timeModif);

					tupletsNote.push(tmpNote);
				}
				return tupletsNote;
			}
			var selNotes = tmpNm.getNotes();
			var note;
			var timeModif = "3/2";
			if (selNotes.length > 3) {
				return {
					'error': 'You must select 3 notes or less'
				};
			}
			//check all notes have same dur
			for (var i = 0; i < selNotes.length - 1; i++) {
				if (selNotes[i].getDuration() != selNotes[i + 1].getDuration()) {
					return {
						'error': 'Notes do not have the same duration'
					};
				}
			}
			if (selNotes.length < 3) {
				if (!validDur(selNotes)) {
					return {
						'error': 'Select notes with a simple duration (not dotted or tuplet notes)'
					};
				}
			}
			if (selNotes.length == 1 || selNotes.length == 2) {
				var tupletsNote = createTupletFromNotes(selNotes, timeModif);
				tmpNm.setNotes(tupletsNote);
			} else if (selNotes.length == 3) {
				for (var i = 0; i < selNotes.length; i++) {
					note = selNotes[i];
					if (note.isTuplet()) {
						note.removeTuplet();
					} else {
						if (i === 0) note.setTuplet("start", timeModif);
						else if (i == selNotes.length - 1) note.setTuplet("stop", timeModif);
						else note.setTuplet("middle", timeModif);
					}
				}
			}
		});
	};

	NoteEditionController.prototype.setSilence = function() {
		//this._ifTupletExpandCursor();
		var self = this;
		var deleteNoteTupletCount = 0;
		var deleteNoteTupletToDo = 0;
		var noteToDelete = [];
		var tupletToDelete = [];
		this._runDurationFn(function(tmpNm) {
			var selNotes = tmpNm.getNotes();
			var note;
			for (var i = 0; i < selNotes.length; i++) {
				note = selNotes[i];
				if (note.isTie()) {
					note.removeTie();
				}
				if (self._isWholeTupletSelected(self.cursor.getStart() + i) && note.isTuplet()) { // get realIndex and not the cursor dependent index
					// in case it's a new tuplet
					if (note.isTuplet('start')) {
						// case we have a 3/2 tuplet, we do 3-2 = 1 so we need to remove 1 note
						deleteNoteTupletToDo = note.getTimeModification().split('/')[0] - note.getTimeModification().split('/')[1];
						deleteNoteTupletCount = 0;
					}
					tupletToDelete.push(i);
					if (deleteNoteTupletCount < deleteNoteTupletToDo) {
						// delete the note we don't need
						noteToDelete.push(i);
						deleteNoteTupletCount++;
					}
				}
				if (!note.isRest) note.setRest(true);
			}
			for (var j = 0; j < tupletToDelete.length; j++) {
				selNotes[tupletToDelete[j]].removeTuplet();
			}
			for (var k = 0; k < noteToDelete.length; k++) {
				tmpNm.deleteNote(noteToDelete[k]);
			}
		});
		//self.cursor.setIndexPos(1, self.cursor.getEnd() - noteToDelete.length);
	};


	NoteEditionController.prototype.addNote = function() {
		var self = this;
		this._runDurationFn(function(tmpNm) {
			var cloned = tmpNm.getNotes()[0].clone(false);
			tmpNm.addNote(cloned, 0);
		});
	};
	/**
	 * @return false we don't want to add anything to history so we return always false
	 */
	NoteEditionController.prototype.copyNotes = function() {
		this._ifTupletExpandCursor();
		var noteManager = this.songModel.getComponent('notes');
		var notesToCopy = noteManager.cloneElems(this.cursor.getStart(), this.cursor.getEnd() + 1);
		var serializedNotes = [];
		for (var i = 0; i < notesToCopy.length; i++) {
			serializedNotes.push(notesToCopy[i].serialize());
		}
		$.publish('ClipboardManager-addToClipboardHolder', {notes: serializedNotes});
		return false;
	};


	NoteEditionController.prototype.pasteNotes = function(notesToPaste) {
		if (!notesToPaste) {
			return false;
		}
		// var positions = [this.cursor.getStart(), this.cursor.getEnd()];
		var notesModelsToPaste = [];
		this._runDurationFn(function(tmpNm) {
			var durationToPaste = tmpNm.getTotalDuration();
			var duration = 0;
			for (var i = 0; i < notesToPaste.length; i++) {
				if (duration >= durationToPaste) {
					break;
				}
				notesModelsToPaste.push(new NoteModel(notesToPaste[i]));
				duration += _.last(notesModelsToPaste).getDuration();
			}
			tmpNm.setNotes(notesModelsToPaste);
		});
		if (this._lastCursorIndexHistory !== this.cursor.getPos()) {
			$.publish('ToHistory-add', 'Paste notes');
			this._lastCursorIndexHistory = this.cursor.getPos();
		} else {
			$.publish('ToHistory-updateLastEntry');
		}
	};

	/**
	 * This is the only function not called by 'NoteEditionView' event, (see NoteEditionController.initSubscribe)
	 * @param  {Integer} inc is a number that will be added to current barNumber, it can be negative, usually it's 1 or -1
	 */
	NoteEditionController.prototype.moveCursorByBar = function(inc) {
		if (this.cursor.getEditable() === false) {
			return;
		}
		var noteManager = this.songModel.getComponent('notes');
		var barNum = noteManager.getNoteBarNumber(this.cursor.getPos()[0], this.songModel);

		if (barNum === 0 && inc === -1) {
			this.cursor.setPos(0);
			$.publish('ToViewer-draw', this.songModel);
			return;
		}

		var startBeat = this.songModel.getStartBeatFromBarNumber(barNum + inc);
		var indexFirstNoteInNewBar = noteManager.getNextIndexNoteByBeat(startBeat);

		this.cursor.setPos(indexFirstNoteInNewBar);
		$.publish('ToViewer-draw', this.songModel);
	};

	return NoteEditionController;
});