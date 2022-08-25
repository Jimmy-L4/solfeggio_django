define([
	'jquery',
	'mustache',
	'modules/MidiCSL/src/model/PlayerModel_MidiCSL',
	'utils/UserLog',
	'pubsub',
], function($, Mustache, PlayerModel_MidiCSL, UserLog, pubsub) {
	/**
	 * PlayerController manages all interaction between player view and player model
	 * @exports MidiCSL/PlayerController
	 */
	function PlayerController(model, view) {
		this.model = model || new PlayerModel_MidiCSL();
		this.view = view;
		this.initView();
		this.initSubscribe();
	}

	/**
	 * Subscribe to view events
	 */
	PlayerController.prototype.initSubscribe = function() {
		var self = this;
		$.subscribe('ToPlayer-play', function(el, tempo) {
			$.publish('ToNoteSpaceManager-enable');
			
			self.play(tempo);
		});
		$.subscribe('ToPlayer-playFromPercent', function(el, obj) {
			self.playFromPercent(obj.tempo, obj.percent);
		});

		$.subscribe('ToPlayer-playPause', function(el, tempo) {
			self.playPause(tempo);
		});

		$.subscribe('ToPlayer-stop', function(el) {
			self.stop();
		});

		$.subscribe('ToPlayer-pause', function(el) {
			self.pause();
		});

		$.subscribe('ToPlayer-onToggleMute', function(el, volume) {
			self.toggleMute(volume);
		});
		$.subscribe('ToPlayer-onVolume', function(el, volume) {
			self.onVolumeChange(volume);
		});
		$.subscribe('ToPlayer-onToggleMetronome', function(el, isMetronome) {
			self.metronomeChange(isMetronome);
		});
		$.subscribe('ToPlayer-onTempo', function(el, tempo) {
			self.onTempoChange(tempo);
		});
		$.subscribe('ToPlayer-toggleLoop', function(el) {
			self.toggleLoop();
		});

		$.subscribe('ToMidiPlayer-enable', function(el) {
			self.enable();
		});
		$.subscribe('ToMidiPlayer-disable', function(el) {
			self.disable();
		});
		$.subscribe('ToPlayer-disableAll', function(el) {
			self.disable();
		});
		$.subscribe('PlayerView-render', function(el) {
			self.initView();
		});

		// Enable midi player when we remove all layers, it means that song has changed
		$.subscribe("ToLayers-removeLayer", function() {
			self.enable();
		});
	};

	/**
	 * Function playpause call play if player is in pause, and call pause if player is in play state
	 * @param  {int} tempo in BPM
	 */
	PlayerController.prototype.playPause = function(tempo) {
		if (this.model.playState) {
			this.pause();
		} else {
			this.play(tempo);
		}
	};

	PlayerController.prototype.playFromPercent = function(tempo, percent) {
		var timeSec = this.model.getSongDuration() * percent;
		this.model.play(tempo, timeSec);
	};

	PlayerController.prototype.play = function(tempo, playFrom) {
		this.model.play(tempo, playFrom);
	};

	PlayerController.prototype.stop = function() {
		this.model.stop();
	};

	PlayerController.prototype.pause = function() {
		this.model.pause();
	};

	PlayerController.prototype.tempoChange = function(tempo) {
		this.model.setTempo(tempo);
		this.model.stop();
	};

	PlayerController.prototype.toggleLoop = function() {
		this.model.toggleLoop();
	};

	PlayerController.prototype.toggleMute = function(volume) {
		if (volume === 0) {
			this.model.mute();
		} else {
			this.model.unmute();
		}
	};


	PlayerController.prototype.metronomeChange = function(isMetronome) {
		if (isMetronome) {
			this.model.unmuteMetronome();
		} else {
			this.model.muteMetronome();
		}
	};

	PlayerController.prototype.onTempoChange = function(tempo) {
		this.model.setTempo(tempo);
	};

	PlayerController.prototype.onVolumeChange = function(volume) {
		if (volume === 0) {
			this.model.mute();
		} else {
			this.model.setVolume(volume);
		}
	};

	PlayerController.prototype.onChordInstrumentChange = function(instrument) {
		this.model.setChordsInstrument(instrument);
	};
	PlayerController.prototype.onMelodyInstrumentChange = function(instrument) {
		this.model.setMelodyInstrument(instrument);
	};

	PlayerController.prototype.enable = function() {
		this.model.enable();
	};

	PlayerController.prototype.disable = function() {
		this.model.disable();
	};

	/**
	 * Function is called to load the state of the player
	 */
	PlayerController.prototype.initView = function() {
		$.publish('PlayerModel-onvolumechange', this.model.melody.volume);
	};

	return PlayerController;
});