# queue-callbacks

Execute callbacks in sequence.

Useful if you are accessing some shared state (eg. a database), and want to make sure
that operations are performed in the right order (ie. you can _read your own writes_).

```
npm install queue-callbacks
```

## Usage

```js
const queue = new Queue()
queue.push(done => {
  db.put('example', 'first value', done)
})
queue.push(done => {
  db.get('example', done)
}, (err, value) => {
  console.log(value) // will print 'first value'
})
queue.push(done => {
  db.put('example', 'second value', done)
})
queue.push(done => {
  db.get('example', done)
}, (err, value) => {
  console.log(value) // will print 'second value'
})
```

Every job `push`ed to the queue will only be executed once all previous jobs
have finished.

If the queue is empty, the job will be executed immediately.

A job is a function that accepts a Node-style callback as its only argument.

You can optionally pass a callback as a second argument that will be executed
once the corresponding job has finished.

## API

```typescript
queue = new Queue()
queue.push(job: (done: Callback) => any, callback?: Callback)

// all callbacks should be Node-style callbacks.
type Callback = (err: Error, val: any) => any
```

## Why?

There are loads of modules that do similar things, but they either do too much
or have weird APIs, so I wrote this. Why not?

## Contribute

PRs accepted.

## License

MIT © 2018 harry lachenmayer
