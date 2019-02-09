let test = require('tape')
let plugin = require('.')

test('env', t=> {
  t.plan(1)
  t.ok(plugin, 'plugin')
})

let src = `
import foo from 'bar'
import buzz from 'buzz'
import {whatever} from 'dumb/path'
`

test('transpile', t=> {
  t.plan(1)
  let config = {
    imports: {
      bar: '/lib/bar',
      buzz: '/vendor/buzz',
      'dumb/path': '/y/u/no'
    } 
  }
  let defaults = {headers:{} , body:src}
  let result = plugin('foo.js', defaults, config)
  t.ok(result, 'result')
  console.log(result)
})
