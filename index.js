const Fifo = require('fifo')

module.exports = class Queue {
  constructor() {
    this.queue = new Fifo()
    this.running = false
  }

  push(job, callback) {
    if (this.running) {
      this.queue.push({ job, callback })
    } else {
      this.running = true
      this._run(job, callback)
    }
  }

  _run(job, callback = function() {}) {
    job((err, val) => {
      callback(err, val)
      if (this.queue.length === 0) {
        this.running = false
      } else {
        const { job, callback } = this.queue.shift()
        this._run(job, callback)
      }
    })
  }
}
