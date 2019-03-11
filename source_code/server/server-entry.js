require('babel-core/register')({
  'presets': [
    "flow",
    ['env', {
      'targets': {
        'node': true
      }
    }]
  ],
  "plugins": [
    // "typecheck"
  ]
})
require('./src/server.js')