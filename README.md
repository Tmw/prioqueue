## Prioqueuejs

Priority Queue implementation in typescript.

## Getting started

```console
npm install prioqueuejs
```

## Usage

```typescript
import { PrioQueue, CreateIterator } from "prioqueue";

// initializing with new values
const initialValues = [3, 4, 5];
const queue = new PrioQueue({
  compareFn: (a, b) => a - b,
  initialValues,
});

// Enqueueing new items
queue.enqueue(12);
queue.enqueue(1);
queue.enqueue(34);

queue.dequeue(); // returns 1
queue.dequeue(); // returns 3

// Using the Iterator
const iterator = CreateIterator(queue);
iterator.next(); // {value: 3, done: false}

// that also means you could use it in a loop
// which will exhaust the iterator and dequeue all
// items from the priority queue

for (const item of iterator) {
  console.log(item);
}

// Prints:
// 5
// 12
// 34
```

## License

[MIT](./LICENSE)
