// I used this website https://itnext.io/priority-queue-in-typescript-6ef23116901 to build this priority queue class

interface HeapNode<T> {
  item: T;
  priority: number;
}

export class PriorityQueue<T> {
  private heap: HeapNode<T>[] = [];

  private findParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }
  private findLeftIndex(index: number): number {
    return 2 * index + 1;
  }
  private findRightIndex(index: number): number {
    return 2 * index + 2;
  }
  private hasLeft(index: number): boolean {
    return this.findLeftIndex(index) < this.heap.length;
  }
  private hasRight(index: number): boolean {
    return this.findRightIndex(index) < this.heap.length;
  }
  private swap(a: number, b: number) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  insert(item: T, priority: number) {
    const newHeapNode: HeapNode<T> = { item: item, priority: priority };
    this.heap.push(newHeapNode);
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.findParentIndex(index);
      if (this.heap[parentIndex].priority <= this.heap[index].priority) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  pop(): T | null | undefined {
    if (this.heap.length === 0) {
      return null;
    }

    this.swap(0, this.heap.length - 1);
    const node = this.heap.pop();

    let current = 0;
    while (this.hasLeft(current)) {
      let smallerElementIndex = this.findLeftIndex(current);

      if (
        this.hasRight(current) &&
        this.heap[this.findRightIndex(current)].priority <
          this.heap[this.findLeftIndex(current)].priority
      ) {
        smallerElementIndex = this.findRightIndex(current);
      }
      if (this.heap[smallerElementIndex].priority >= this.heap[current].priority) {
        break;
      }

      this.swap(current, smallerElementIndex);
      current = smallerElementIndex;
    }

    return node?.item;
  }
}
