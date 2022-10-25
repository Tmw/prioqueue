export type Optional<T> = T | null;
export type CompareFn<T> = (a: T, b: T) => Number;

export class PrioQueue<T> {
  private values: Array<T> = [];
  private compareFn: CompareFn<T>;

  constructor(values: Array<T>, compareFn: CompareFn<T>) {
    this.compareFn = compareFn;
    values.forEach((val) => this.enqueue(val));
  }

  enqueue(value: T) {
    this.values.push(value);
    this.bubbleUp();
  }

  dequeue(): Optional<T> {
    if (this.values.length === 0) {
      return null;
    }

    const value = this.values[0];

    this.values[0] = this.values[this.values.length - 1];
    this.values.length--;

    this.bubbleDown();
    return value;
  }

  private bubbleUp() {
    let index = this.values.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compareFn(this.values[index], this.values[parent]) < 0) {
        this.swap(index, parent);
        index = parent;
        continue;
      }
      break;
    }
  }

  getSwapCandidate(parent: number): number {
    const leftChild = parent * 2 + 1;
    const rightChild = parent * 2 + 2;
    let candidate = parent;

    if (
      leftChild <= this.values.length &&
      this.compareFn(this.values[candidate], this.values[leftChild]) > 0
    ) {
      candidate = leftChild;
    }

    if (
      rightChild <= this.values.length &&
      this.compareFn(this.values[candidate], this.values[rightChild]) > 0
    ) {
      candidate = rightChild;
    }

    return candidate;
  }

  private bubbleDown(startIndex: number = 0) {
    if (startIndex >= this.values.length) {
      return;
    }

    const candidate = this.getSwapCandidate(startIndex);

    if (candidate !== startIndex) {
      this.swap(startIndex, candidate);
      this.bubbleDown(candidate);
    }
  }

  private swap(indexA: number, indexB: number) {
    const temp = this.values[indexA];
    this.values[indexA] = this.values[indexB];
    this.values[indexB] = temp;
  }
}

export function* CreateIterator<T>(queue: PrioQueue<T>) {
  let item;
  while ((item = queue.dequeue()) !== null) {
    yield item;
  }
}
