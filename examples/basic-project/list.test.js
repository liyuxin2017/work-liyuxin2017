const test = require('tape');
const list = require('./list');

test('Code test runs on this system', t => {
  t.pass('okay so far');
  t.ok(list, 'module loaded');
  t.ok(Array.isArray(list), 'array enough for me');
  t.ok(list.length, 'array has values');
  t.end();
});
