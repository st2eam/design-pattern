// 在某云计算模拟平台中提供了多种虚拟机迁移算法，
// 例如动态迁移算法中的PreCopy（预拷贝）算法、Post - Copy（后拷贝）算法、CR / RT - Motion算法等，
// 用户可以灵活地选择所需的虚拟机迁移算法，也可以方便地增加新算法。
// 现采用策略模式进行设计，绘制对应的类图并编程模拟实现。

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public doSomeBusinessLogic(): void {
    const result = this.strategy.doAlgorithm();
  }
}

interface Strategy {
  doAlgorithm(): void;
}

class PreCopy implements Strategy {
  public doAlgorithm(): void {
    console.log("使用PreCopy（预拷贝）算法");
  }
}

class Post_Copy implements Strategy {
  public doAlgorithm(): void {
    console.log("使用Post - Copy（后拷贝）算法");
  }
}

class CR_RT_Motion implements Strategy {
  public doAlgorithm(): void {
    console.log("使用CR / RT - Motion算法");
  }
}

const client2 = (function () {
  const context = new Context(new PreCopy());
  context.doSomeBusinessLogic();

  console.log("");

  context.setStrategy(new Post_Copy());
  context.doSomeBusinessLogic();

  console.log("");

  context.setStrategy(new CR_RT_Motion());
  context.doSomeBusinessLogic();
})();
