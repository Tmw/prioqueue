import { expect, test } from "@jest/globals";
import { PrioQueue, CreateIterator } from "./prioqueue";

test("initial values", () => {
  const { input, expected } = makeSequence();
  const q = new PrioQueue(input, (a, b) => a - b);

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
  const q = new PrioQueue(input, (a, b) => a - b);

  const it = CreateIterator(q);
  let output = Array.from(it);

  expect(output).toEqual(expected);
});

test("duplicate priorities", () => {
  const { input, expected } = makeSequence();
  const q = new PrioQueue(input, (a, b) => a - b);

  const it = CreateIterator(q);
  let output = Array.from(it);

  expect(output).toEqual(expected);
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
