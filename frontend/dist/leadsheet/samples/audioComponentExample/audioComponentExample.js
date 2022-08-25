//Require and Qunit working, done following  http://www.nathandavison.com/article/17/using-qunit-and-requirejs-to-build-modular-unit-tests
require.config({
  baseUrl: "/",
  paths: {
    jquery: 'external-libs/jquery-2.1.0.min',
    qunit: 'external-libs/qunit/qunit',
    vexflow_helper: 'external-libs/qunit/vexflow_test_helpers',
    vexflow: 'external-libs/vexflow-min',
    Midijs: 'external-libs/Midijs/midijs.min',
    pubsub: 'external-libs/tiny-pubsub.min',
    mustache: 'external-libs/mustache',
    jquery_autocomplete: 'external-libs/jquery.autocomplete.min'
  },
  shim: {
    'qunit': {
      exports: 'QUnit',
      init: function() {
        QUnit.config.autoload = false;
        QUnit.config.autostart = false;
      }
    },
    'vexflow': {
      exports: 'Vex'
    },
    'Midijs': {
      exports: 'MIDI'
    }
  }
});

define(function(require) {
        var AudioModule = require('modules/Audio/src/AudioModule');
        var Cursor = require('modules/Cursor/src/Cursor');

        var LSViewer = require('modules/LSViewer/src/LSViewer'),
          OnWindowResizer = require('modules/LSViewer/src/OnWindowResizer'),
          SongModel_CSLJson = require('modules/converters/MusicCSLJson/src/SongModel_CSLJson'),
          Solar  = require('tests/songs/Solar'),
          CursorModel = require('modules/Cursor/src/CursorModel'),
          NoteEditionController = require('modules/NoteEdition/src/NoteEditionController'),
          NoteSpaceManager = require('modules/NoteEdition/src/NoteSpaceManager');
          ChordSpaceManager = require('modules/ChordEdition/src/ChordSpaceManager');
          ChordSpaceEdition = require('modules/ChordEdition/src/ChordSpaceEdition');


        var song = SongModel_CSLJson.importFromMusicCSLJSON(Solar);
        var notesCursor = new CursorModel(song.getComponent('notes'));
        var chordsCursor = new CursorModel(song.getComponent('chords'));

        var viewer = new LSViewer($("#audioExample")[0],{heightOverflow:'resizeDiv',layer:true});
        //construct noteSpaceManager
        new NoteSpaceManager(notesCursor, viewer);
        
        var chordSpaceEdition =new ChordSpaceEdition(song, viewer);
        var chordSpaceManagerType = 'ALL_CHORD_SPACES'; //ONLY_CHORDS
        new ChordSpaceManager(song, chordsCursor, viewer, true, chordSpaceEdition, chordSpaceManagerType);
        OnWindowResizer(song);
        
        var params = {
            viewer: viewer,
            audioCursor: true,
            notesCursor: notesCursor,
            chordsCursor: chordsCursor,
            chordSpaceManagerType: chordSpaceManagerType
        };
        var audio = new AudioModule(song, params);
        
        viewer.draw(song);
        //audio.load('/tests/audio/solar.wav', 170);

        //Audio Module
        $("#loadSound").click(function(e){
          $.publish('ToLayers-removeLayer');
          e.preventDefault();
          audio.load('/tests/audio/solar.wav', 170);
        });

        $("#loadAnotherSound").click(function(e){
          $.publish('ToLayers-removeLayer');
          e.preventDefault();
          audio.load('/tests/audio/Solar_120_bpm.335.mp3', 120);
        });



        $('#play').click(function(e){
            e.preventDefault();
            console.log("play");
            $.publish('ToPlayer-play');
        });
        $('#pause').click(function(e){
            e.preventDefault();
            console.log("pause");
            $.publish('ToPlayer-pause');
        });
        $('#stop').click(function(e){
            e.preventDefault();
            console.log("stop");
            $.publish('ToPlayer-stop');
        });
        $('#loopOn').click(function(e){
            e.preventDefault();
            console.log("loopOn");
            audio.loop(1,3);
        });
        $('#loopOff').click(function(e){
            e.preventDefault();
            console.log("loopOff");
            audio.disableLoop();
        });
        $('#loopOnWholeSong').click(function(e){
            e.preventDefault();
            console.log("loopOnWholeSong");
            audio.loop();
        });
        $("#disable").click(function(e){
          e.preventDefault();
          audio.disable();
          
        });
        $("#enable").click(function(e){
          e.preventDefault();
          audio.enable();
        });

        (function(){
            var active = false;
            var idSetInterval;
            $("#currentTime").click(function(e){
                e.preventDefault();
                active = !active;
                if (active){
                    console.log("console.log currentTime On");
                    idSetInterval = setInterval(function(){
                        console.log(audio.getCurrentTime());
                    },500);
                    $(this).css({fontWeight:'bold'});
                }else{
                    console.log("console.log currentTime Off");
                    clearInterval(idSetInterval);
                    $(this).css({fontWeight:'normal'});
                }
            })
        })();

        (function(){

          var audios = [
          {
            file:'/tests/audio/Solar_120_bpm.335.mp3',
            tempo: 120
          },{
            file:'/tests/audio/solar.wav',
            tempo: 170
          }];
          var indexAudio = 0;

          $("#switchAudio").click(function(){
            var currAudio = audios[indexAudio];
            audio.load(currAudio.file,currAudio.tempo, false);
            indexAudio = (indexAudio + 1) % audios.length;
          });
        })();
});