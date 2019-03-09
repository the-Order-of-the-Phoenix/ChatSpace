require('babel-core/register')({
  'presets': [
    "flow",
    ['env', {
      'targets': {
        'node': true
      }
    }]
  ]
})
require('./src/server.js')