define([
	'modules/core/src/SongModel', 
	'modules/MidiCSL/src/converters/ChordManagerConverterMidi_MidiCSL', 
	'modules/MidiCSL/src/model/SongModel_MidiCSL', 'modules/MidiCSL/src/model/NoteModel_MidiCSL', 
	'tests/test-songs', 
	'modules/converters/MusicCSLJson/src/SongModel_CSLJson'],
	function(SongModel, ChordManagerConverterMidi_MidiCSL, SongModel_MidiCSL, NoteModel_MidiCSL, testSongs, SongModel_CSLJson) {
	return {
		run: function() {
			test("ChordManagerConverterMidi_MidiCSL", function(assert) {

				var msm = new SongModel_MidiCSL();
				

				// Create a song from testSong
				
			var midiSong = ChordManagerConverterMidi_MidiCSL.exportToMidiCSL(
					SongModel_CSLJson.importFromMusicCSLJSON(
						{
							title: "song",
							time: "4/4",
							changes: [{
								id: 0,
								name: "A",
								bars: [{
									chords: [{
										p: "A",
										ch: "M7",
										beat: 1
									}]
								}]

							}]
						}
					)
				);
				assert.equal(midiSong[0].currentTime, 0, 'song with one chord');
				assert.equal(midiSong[0].duration, 4);

				midiSong = ChordManagerConverterMidi_MidiCSL.exportToMidiCSL(
					SongModel_CSLJson.importFromMusicCSLJSON(
						{
							title: "song",
							time: "4/4",
							changes: [{
								id: 0,
								name: "A",
								bars: [{
									melody:[{
										keys: ["a/4"],
										duration: "q"
									}]
								}]
							}]
						}
					)
				);
				
				midiSong = ChordManagerConverterMidi_MidiCSL.exportToMidiCSL(
					SongModel_CSLJson.importFromMusicCSLJSON(
						{
							title: "song",
							time: "4/4",
							changes: [{
								id: 0,
								name: "A",
								bars: [
									//bar 0
									//currentTime 0
									{
										melody:[{
											keys: ["a/4"],
											duration: "w"
										}]
									},
									//bar 1
									//currentTime 4
									{
										melody:[{
											keys: ["g/4"],
											duration: "w"
										}]
									},{
										//bar 2
										//currentTime 8
										//chord 0
										chords: [{
											p: "F",
											ch: "m7",
											beat: 1
										}],
										melody:[{
											keys: ["a/4"],
											duration: "w"
										}]
									},{
										//bar 3
										//currentTime 12
										//chord 1
										chords: [{
											p: "A",
											ch: "m7",
											beat: 1
										}],
										melody:[{
											keys: ["b/4"],
											duration: "w"
										}]
									},{
										//bar 4
										//currentTime 16
										//chord 2
										chords: [{
											p: "A",
											ch: "m7",
											beat: 3
										}],
										melody:[{
											keys: ["b/4"],
											duration: "w"
										}]
									},{
										//bar 5
										//currentTime 20
										// (chord 3), previous chord is added automatically as there is no chord in bar
										melody:[{
											keys: ["b/4"],
											duration: "w"
										}]
									},{
										//bar 6
										//currentTime 24
										chords: [
										//chord 4
										{
											p: "A",
											ch: "m7",
											beat: 2
										},
										//chord 5
										{
											p: "A",
											ch: "m7",
											beat: 4
										}]
									},

								],
							}]
						}
					)
				);

				assert.equal(midiSong[0].currentTime, 8, 'song with chord 0 in second bar');
				assert.equal(midiSong[1].currentTime, 12, 'chord 1 is in 3rd bar');
				assert.equal(midiSong[2].currentTime, 18, 'testing when chord does not start in first beat, starts in beat 3 (beat 1 -> 16, beat 2 -> 17, beat 3 -> 18)');
				assert.equal(midiSong[3].currentTime, 20 , 'chord 3 is added automatically');
				assert.equal(midiSong[4].currentTime, 25, 'when chord does not start in first and there are more than one chord');
				assert.equal(midiSong[5].currentTime, 27, 'the other chord in the bar is in 4th beat of bar 6');

			});
		}
	};
});

