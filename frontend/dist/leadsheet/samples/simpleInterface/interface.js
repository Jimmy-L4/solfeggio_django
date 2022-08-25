//Require and Qunit working, done following  http://www.nathandavison.com/article/17/using-qunit-and-requirejs-to-build-modular-unit-tests
require.config({
  baseUrl: '../../',
  paths: {
    LJS: 'external-libs/LeadsheetJS-0.1.0.min',
    jquery: 'external-libs/jquery-2.1.0.min',
    jquery_autocomplete: 'external-libs/jquery.autocomplete.min',
    vexflow: 'external-libs/vexflow-min',
    Midijs: 'external-libs/Midijs/midijs.min',
    pubsub: 'external-libs/tiny-pubsub.min',
    mustache: 'external-libs/mustache',
    text: 'external-libs/require-text',
    bootstrap: 'external-libs/bootstrap/bootstrap.min',
    jsPDF: 'external-libs/jspdf/jspdf.min',
    JsonDelta: 'external-libs/json_delta_1.1.3_minified',
  },
  shim: {
    vexflow: {
      exports: 'Vex',
    },
    Midijs: {
      exports: 'MIDI',
    },
    JsonDelta: {
      exports: 'JSON_delta',
    },
  },
})

define(function (require) {
  var $ = require('jquery')
  var LJS = require('LJS')

  // console.log(LJS);

  var testSongs = require('library/test-songs')

  // var popIn = new LJS.PopIn.PopIn('Hello', 'Test<br />ok');
  // popIn.render();

  var menuHTML = document.getElementById('menu-container')
  var viewerHTML = $('#canvas_container')[0]
  var playerHTML = $('#player_test')[0]

  var historyHTML = $('#rightPanel')
  var soundfontUrl = '../../external-libs/Midijs/soundfont/'

  var viewerOptions = {
    HTMLElement: viewerHTML,
    viewOptions: {
      //displayTitle: true,
      //displayComposer: true,
      layer: true,
      detectEventOnAllDocument: true,
      typeResize: 'fluid', // "scale" | "fluid"
      heightOverflow: 'auto', // "scroll" | "auto"
    },
  }

  var playerOptions = {
    HTMLElement: playerHTML,
    imgUrl: '../../imgs/MidiCSL/img',
    interactive: true,
    viewOptions: {
      displayMetronome: true,
      displayLoop: true,
      displayTempo: true,
      changeInstrument: false,
      autoload: false,
      progressBar: true,
    },
    // audio: {
    //   audioFile: '/tests/audio/solar.wav',
    //   tempo: 170
    //   audioFile: '/tests/audio/Solar_120_bpm.335',
    //   tempo: 120,
    // },
    midi: {
      soundfontUrl: soundfontUrl,
    },
  }

  var params = {
    viewer: viewerOptions,
    player: playerOptions,
    edition: {
      notes: true,
      imgUrl: {
        notes: '../../imgs/NoteEdition/img',
        chords: '../../imgs/NoteEdition/img',
        structure: '../../imgs/NoteEdition/img',
      },
      chords: true,
      structure: true,
      history: {
        enable: false,
        HTMLElement: historyHTML, // if not precised, then it doesn't display history but keyboard ctrl+z and y are working
      },
      menu: {
        HTMLElement: menuHTML,
      },
      composerSuggestions: ['Miles Davis', 'John Coltrane', 'Bill Evans', 'Charlie Parker', 'Thelonious Monk'],
      saveButton: true,
      saveAsButton: true,
      import: false,
      saveFunction: saveFunction,
    },
  }

  // var myLeadsheet1 = LJS.easyBuild('viewer', testSongs.simpleLeadSheet, viewerHTML, viewerOptions);
  // var myLeadsheet2 = LJS.easyBuild('player', testSongs.simpleLeadSheet, playerHTML, playerOptions);
  var solar = require('library/songs/empty')
  var myLeadsheet = LJS.init(solar, params)
  //we need to draw again to take into account the new comments module.

  $.publish('ToViewer-draw', myLeadsheet.songModel)
  function fnChild(arg) {
    console.log(arg)
  }
  function saveFunction(JSONSong, songId, derivedId, callback) {
    console.log(window.parent)
    // 调用父类的方法
    window.parent.updateModel(JSONSong, '')
    // 向父vue页面发送信息
    window.parent.postMessage(
      {
        cmd: 'submitWork',
        params: {
          JSONSong,
          songId,
          derivedId,
        },
      },
      '*'
    )
    // 接受父页面发来的信息
    window.addEventListener('message', function (event) {
      var data = event.data
      switch (data.cmd) {
        case 'getFormJson':
          // 处理业务逻辑
          break
      }
    })
    callback({ id: songId, error: false })
    // console.log(JSONSong)
  }
})
