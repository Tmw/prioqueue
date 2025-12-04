import { expect, test } from "@jest/globals";
import { PrioQueue, CreateIterator } from "./prioqueue";

test("initial values", () => {
  const { input, expected } = makeSequence();
  const q = new PrioQueue({
    compareFn: (a, b) => a - b,
    initialValues: input,
  });

  let output = [];
  for (let i = 0; i < input.length; i++) {
    const item = q.dequeue();
    if (item === null) break;
    output.push(item);
  }

  expect(output).toEqual(expected);
});

test("PrioQueueIterator", () => {
  const { input, expected } = makeSequence();
  const q = new PrioQueue({
    compareFn: (a, b) => a - b,
    initialValues: input,
  });

  const it = CreateIterator(q);
  let output = Array.from(it);

  expect(output).toEqual(expected);
});

test("duplicate priorities", () => {
  const { input, expected } = makeSequence();
  const q = new PrioQueue({
    compareFn: (a, b) => a - b,
    initialValues: input,
  });

  const it = CreateIterator(q);
  let output = Array.from(it);

  expect(output).toEqual(expected);
});

test("enqueueing item", () => {
  const q = new PrioQueue({
    compareFn: (a, b) => a - b,
    initialValues: [6, 12, 3, 7],
  });

  q.enqueue(2);
  q.enqueue(4);
  q.enqueue(18);

  const it = CreateIterator(q);
  let output = Array.from(it);

  expect(output).toEqual([2, 3, 4, 6, 7, 12, 18]);
});

test("dequeueing items", () => {
  const q = new PrioQueue({
    compareFn: (a, b) => a - b,
    initialValues: [6, 12, 3, 7],
  });

  expect(q.dequeue()).toEqual(3);
  expect(q.dequeue()).toEqual(6);
  expect(q.dequeue()).toEqual(7);
  expect(q.dequeue()).toEqual(12);
});

test("dequeueing on empty queue returns null", () => {
  const q = new PrioQueue<number>({
    compareFn: (a: number, b: number) => a - b,
    initialValues: [],
  });

  expect(q.dequeue()).toBeNull;
});

test("with objects", () => {
  type Node = {
    prio: number;
    val: string;
  };

  const q = new PrioQueue<Node>({
    initialValues: [
      { prio: 1, val: "red" },
      { prio: 4, val: "orange" },
      { prio: 8, val: "green" },
    ],
    compareFn: (a, b) => a.prio - b.prio,
  });

  expect(q.dequeue()).toMatchObject({ prio: 1, val: "red" });
  expect(q.dequeue()).toMatchObject({ prio: 4, val: "orange" });
  expect(q.dequeue()).toMatchObject({ prio: 8, val: "green" });
});

type TestSet = {
  input: number[];
  expected: number[];
};

// Return a random sequence of given length containing random numbers
const makeSequence = (length: number = Math.random() * 10): TestSet => {
  const set = Array.from({ length }, () => Math.floor(Math.random() * 100));

  return {
    input: set,
    expected: set.sort((a, b) => a - b),
  };
};
