const test = require('tape')
const Queue = require('./')

const delay = t => cb => {
  setTimeout(() => {
    cb(null, t)
  }, t)
}

test('sync', t => {
  const queue = new Queue()
  queue.push(delay(600), end)
  queue.push(delay(200), end)
  queue.push(delay(300), end)

  const actual = []
  function end(err, value) {
    actual.push([err, value])
    if (actual.length === 3) {
      t.deepEqual(actual, [[null, 600], [null, 200], [null, 300]])
      t.end()
    }
  }
})

test('async', t => {
  let val = 0
  function get(cb) {
    delay(Math.random() * 100)(() => {
      cb(null, val)
    })
  }
  function set(newVal, cb) {
    delay(Math.random() * 100)(() => {
      val = newVal
      cb(null)
    })
  }

  const queue = new Queue()
  t.plan(10 * 2)
  for (let i = 0; i < 10; i++) {
    setThenGet(i)
  }
  function setThenGet(i) {
    queue.push(cb => set(i, cb))
    queue.push(get, (err, val) => {
      t.error(err, 'no error')
      t.deepEqual(val, i, "value hasn't been changed by any other call to set")
    })
  }
})
