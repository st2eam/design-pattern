//某商品管理系统的商品名称存储在一个字符串数组中，
//现需要自定义一个双向迭代器（MyIterator）实现对该商品名称数组的双向（向前和向后）遍历。
//绘制类图并编程实现。
interface iterator<T> {
  // Return the current element.
  current(): T;

  // Return the current element and move forward to next element.
  next(): T;

  // Checks if current position is valid.
  valid(): boolean;
}

interface Aggregator {
  getIterator(): iterator<string>;
}

class MyIterator implements iterator<string> {
  private collection: GoodsCollection;

  private position: number = 0;

  private reverse: boolean = false;

  constructor(collection: GoodsCollection, reverse: boolean = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public current(): string {
    return this.collection.getItems()[this.position];
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  public valid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

class GoodsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): iterator<string> {
    return new MyIterator(this);
  }

  public getReverseIterator(): iterator<string> {
    return new MyIterator(this, true);
  }
}

const client2 = function () {
  const collection = new GoodsCollection();
  collection.addItem('item1');
  collection.addItem('item2');
  collection.addItem('item3');
  collection.addItem('item4');
  collection.addItem('item5');
  collection.addItem('item6');

  console.log('Straight traversal:');
  const iterator = collection.getIterator();
  while (iterator.valid()) {
    console.log(iterator.next());
  }

  console.log('');

  console.log('Reverse traversal:');
  const reverseIterator = collection.getReverseIterator();
  while (reverseIterator.valid()) {
    console.log(reverseIterator.next());
  }
}()