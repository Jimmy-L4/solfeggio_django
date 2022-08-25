define(['modules/MidiCSL/src/model/NoteModel_MidiCSL'], function(NoteModel_MidiCSL) {
	return {
		run: function() {
			test("NoteModel_MidiCSL", function(assert) {
				var mnm = new NoteModel_MidiCSL();

				// test empty object
				assert.equal(mnm.getCurrentTime(), 0);
				assert.equal(mnm.getDuration(), 0);
				assert.equal(mnm.getType(), undefined);
				assert.deepEqual(mnm.getMidiNote(), []);

				// Setters and getters
				// current time
				mnm.setCurrentTime(1.4);
				assert.throws(function() {
					mnm.setCurrentTime(-1);
				});
				assert.equal(mnm.getCurrentTime(), 1.4);

				// duration
				mnm.setDuration(4.2);
				assert.throws(function() {
					mnm.setDuration("a");
				});
				assert.equal(mnm.getDuration(), 4.2);

				// type
				mnm.setType("melody");
				assert.throws(function() {
					mnm.setType();
				}, 'type');
				assert.equal(mnm.getType(), "melody");

				// midi note
				mnm.setMidiNote([30, 45, 64]);
				assert.throws(function() {
					mnm.setMidiNote();
				}, 'midi note');
				assert.deepEqual(mnm.getMidiNote(), [30, 45, 64]);

				assert.deepEqual(mnm.getTransposeMidiNote(-4), [26, 41, 60], '-4');
				assert.deepEqual(mnm.getTransposeMidiNote(6), [36, 51, 70], '6');

				var clone = mnm.clone();
				assert.deepEqual(mnm, clone, "Clone test");

			});
		}
	}
});