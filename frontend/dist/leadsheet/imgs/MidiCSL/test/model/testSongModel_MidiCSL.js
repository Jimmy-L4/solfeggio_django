define(['modules/MidiCSL/src/model/SongModel_MidiCSL', 'modules/MidiCSL/src/model/NoteModel_MidiCSL'],
	function(SongModel_MidiCSL, NoteModel_MidiCSL) {
		return {
			run: function() {

				test("SongModel_MidiCSL", function(assert) {
					function testGetLastNote() {
						var midiSong;
						var lastNote = new NoteModel_MidiCSL({
							currentTime: 2,
							duration: 1,
							midiNote: [60],
							type: 'melody'
						});
						midiSong = new SongModel_MidiCSL({
							song: [
								new NoteModel_MidiCSL({
									currentTime: 0,
									duration: 1,
									midiNote: [45],
									type: 'melody'
								}),
								new NoteModel_MidiCSL({
									currentTime: 1,
									duration: 1,
									midiNote: [60],
									type: 'melody'
								}),
								lastNote,
								new NoteModel_MidiCSL({
									currentTime: 0,
									duration: 3,
									midiNote: [60, 65, 67],
									type: 'chords'
								})
							]
						});
						assert.deepEqual(midiSong.getLastNote(), lastNote, 'When chord and note have same end time, but note starts after, note should be considered as lastNote');

						var lastChord = new NoteModel_MidiCSL({
							currentTime: 2,
							duration: 1,
							midiNote: [60, 65, 67],
							type: 'chords'
						});

						midiSong = new SongModel_MidiCSL({
							song: [
								new NoteModel_MidiCSL({
									currentTime: 0,
									duration: 1,
									midiNote: [45],
									type: 'melody'
								}),
								new NoteModel_MidiCSL({
									currentTime: 1,
									duration: 1,
									midiNote: [60],
									type: 'melody'
								}),
								NoteModel_MidiCSL({
									currentTime: 0,
									duration: 2,
									midiNote: [60, 65, 67],
									type: 'chords'
								}),
								lastChord
							]
						});
						assert.deepEqual(midiSong.getLastNote(), lastChord, 'When chord starts after last melody note, we consider chord as lastNote');
					}


					var msm = new SongModel_MidiCSL();
					assert.deepEqual(msm.getSong(), []);

					var n1 = new NoteModel_MidiCSL({
							currentTime: 0,
							duration: 1,
							midiNote: [45],
							type: 'melody'
						}),
						n2 = new NoteModel_MidiCSL({
							currentTime: 1,
							duration: 1,
							midiNote: [60],
							type: 'melody'
						}),
						c1 = new NoteModel_MidiCSL({
							currentTime: 0,
							duration: 1,
							midiNote: [60, 65, 67],
							type: 'chords'
						});

					msm = new SongModel_MidiCSL({
						song: [n1, n2, c1]
					});

					var msm2 = new SongModel_MidiCSL();

					msm2.setSong([n1, n2, c1]);

					assert.deepEqual(msm.getSong(), msm2.getSong(), 'Set and getSong');

					// testing get from types
					assert.deepEqual(msm.getFromType('chords'), [c1], 'get from type chords');
					assert.deepEqual(msm.getFromType('melody'), [n1, n2], 'get from type melody');
					assert.deepEqual(msm.getLastNote(), n2, 'get last note');

					msm.removeFromType('melody');
					assert.deepEqual(msm.getSong(), [c1], 'Remove melody');

					msm.setSong(n1);
					assert.deepEqual(msm.getSong(), [c1, n1], 'Set without replace');

					msm.setSong(n1, true);
					assert.deepEqual(msm.getSong(), n1, 'Set with replace');

					var clone = msm.clone();
					assert.deepEqual(msm, clone, "Clone test");
					testGetLastNote();
				});
			}
		};
	});