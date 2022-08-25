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
    midi: {
      soundfontUrl: soundfontUrl,
    },
  }

  var params = {
    viewer: viewerOptions,
  }

  var solar = require(JSON.parse('http://localhost:8000/media/json/20220819/401000000000000020301-1.json'))
  var myLeadsheet = LJS.init(solar, params)
  //we need to draw again to take into account the new comments module.

  $.publish('ToViewer-draw', myLeadsheet.songModel)
})
