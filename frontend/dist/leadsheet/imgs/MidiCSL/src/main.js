define([
		"modules/MidiCSL/src/converters/ChordConverterMidi_MidiCSL",
		"modules/MidiCSL/src/converters/ChordManagerConverterMidi_MidiCSL",
		"modules/MidiCSL/src/converters/SongConverterMidi_MidiCSL",
		"modules/MidiCSL/src/model/NoteModel_MidiCSL",
		"modules/MidiCSL/src/model/PlayerModel_MidiCSL",
		"modules/MidiCSL/src/model/SongModel_MidiCSL",
		"modules/MidiCSL/src/PlayerController_MidiCSL"
	],
	function(
		ChordConverterMidi_MidiCSL,
		ChordManagerConverterMidi_MidiCSL,
		SongConverterMidi_MidiCSL,
		NoteModel_MidiCSL,
		PlayerModel_MidiCSL,
		SongModel_MidiCSL,
		PlayerController
	) {
		return {
			"ChordConverterMidi_MidiCSL": ChordConverterMidi_MidiCSL,
			"ChordManagerConverterMidi_MidiCSL": ChordManagerConverterMidi_MidiCSL,
			"SongConverterMidi_MidiCSL": SongConverterMidi_MidiCSL,
			"NoteModel_MidiCSL": NoteModel_MidiCSL,
			"PlayerModel_MidiCSL": PlayerModel_MidiCSL,
			"SongModel_MidiCSL": SongModel_MidiCSL,
			"PlayerController": PlayerController
		};
	}
);