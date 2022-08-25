define(['modules/core/src/SongModel', 'modules/MidiCSL/src/model/PlayerModel_MidiCSL', 'modules/MidiCSL/src/model/SongModel_MidiCSL', 'modules/MidiCSL/src/model/NoteModel_MidiCSL', 'modules/MidiCSL/src/converters/SongConverterMidi_MidiCSL', 'modules/converters/MusicCSLJson/src/SongModel_CSLJson', 'tests/test-songs', 'pubsub'],
	function(SongModel, PlayerModel_MidiCSL, SongModel_MidiCSL, NoteModel_MidiCSL, SongConverterMidi_MidiCSL, SongModel_CSLJson, testSongs, pubsub) {
		return {
			run: function() {
				test("PlayerModel_MidiCSL", function(assert) {
					
					var emptyPlayer = new PlayerModel_MidiCSL(null, '/external-libs/Midijs/soundfont/');
					assert.ok(!emptyPlayer.getReady());
					assert.ok(!emptyPlayer.doLoop());
					
					// // Create a song from testSong
					var songModel = SongModel_CSLJson.importFromMusicCSLJSON(testSongs.simpleLeadSheet, new SongModel());
					//Convert songmodel to a readable model that we can insert in SongModel_MidiCSL
					var midiSong = SongConverterMidi_MidiCSL.exportToMidiCSL(songModel, false);
					var midiSongModel = new SongModel_MidiCSL({
						'song': midiSong
					});

					var songWithNoChords = {
						composer: "Random Composer",
						title: "No Chords",
						time: "4/4",
						changes: [{
							id: 0,
							name: "A",
							bars: [
							{
								melody: [{
									keys: ["B/4"],
									duration: "wr"
								}]
							}]
						}]
					};
					new SongModel_MidiCSL({
						'song': SongConverterMidi_MidiCSL.exportToMidiCSL(SongModel_CSLJson.importFromMusicCSLJSON(songWithNoChords, new SongModel()), false)
					});
				});
			}
		};
	}
);