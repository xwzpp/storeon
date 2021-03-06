var createStore = require('../')
var logger = require('../logger.browser')

var STYLE = 'color: #008100'
var BOLD = 'color: #008100; font-weight: bold'

function counter (store) {
  store.on('@init', function () {
    return { count: 0, started: true }
  })
  store.on('inc', function (state, value) {
    return { count: state.count + value }
  })
}

it('prints dispatches', function () {
  jest.spyOn(console, 'log').mockImplementation(function () { })
  var store = createStore([counter, logger])
  store.dispatch('inc', 2)
  expect(console.log.mock.calls).toEqual([
    ['%caction %c@init', STYLE, BOLD],
    ['%cchanged %ccount, started', STYLE, BOLD, { count: 0, started: true }],
    ['%caction %cinc', STYLE, BOLD, 2],
    ['%cchanged %ccount', STYLE, BOLD, { count: 2, started: true }]
  ])
})
