# callback-queue


Execute callbacks in sequence. (`await` but without promises)

## Install

```
npm install callback-queue
```

## Usage

```

```

## API

```typescript
type Callback = (err: Error, val: any) => any
var queue = new Queue()
queue.push(job: (callback: Callback) => any, callback?: Callback)
```

## Contribute

PRs accepted.

## License

MIT © 2018 harry lachenmayer
