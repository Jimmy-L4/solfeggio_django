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

  var menuHTML = document.getElementById('menu-container')
  var viewerHTML = $('#canvas_container')[0]
  var playerHTML = $('#player_test')[0]

  var historyHTML = $('')
  var soundfontUrl = '../../external-libs/Midijs/soundfont/'

  var viewerOptions = {
    HTMLElement: viewerHTML,
    viewOptions: {
      // displayTitle: true,
      //displayComposer: true,
      layer: true,
      detectEventOnAllDocument: true,
      typeResize: 'fluid', // "scale" | "fluid"
      heightOverflow: 'auto', // "scroll" | "auto"
    },
  }

  var playerOptions = {
    HTMLElement: playerHTML,
    imgUrl: '/modules/MidiCSL/img',
    interactive: true,
    viewOptions: {
      displayMetronome: true,
      displayLoop: true,
      displayTempo: true,
      changeInstrument: false,
      autoload: false,
      progressBar: true,
    },
    audio: {
      //audioFile: '/tests/audio/solar.wav',
      //tempo: 170
      audioFile: '/tests/audio/Solar_120_bpm.335',
      tempo: 120,
    },
    midi: {
      soundfontUrl: soundfontUrl,
    },
  }

  // tags用来评论，可以高亮音符
  // var tags = [
  //   {
  //     startBeat: 1,
  //     endBeat: 4,
  //     name: 'First bar',
  //     color: '#559',
  //   },
  // ]
  var tags = []

  var params = {
    viewer: viewerOptions,
    tags: tags,
    // player: playerOptions, //取消播放功能
    edition: {
      notes: true,
      imgUrl: {
        notes: '../../tests/img',
        chords: '../../tests/img',
        structure: '../../tests/img',
      },
      chords: false, //关闭和弦功能
      structure: false, //关闭结构定义功能
      history: {
        enable: true,
        HTMLElement: historyHTML, // if not precised, then it doesn't display history but keyboard ctrl+z and y are working
      },
      menu: {
        HTMLElement: menuHTML,
      },
    },
  }

  var solar = require('tests/songs/Empty')
  var myLeadsheet = LJS.init(solar, params)
})
