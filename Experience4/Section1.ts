// 某文字编辑软件须提供如下功能：
// 在文本编辑窗口中包含一个可编辑文本区和3个文本信息统计区，
// 用户可以在可编辑文本区对文本进行编辑操作，

/**
 * Subject接口声明了一组用于管理订阅者的方法。
 */
interface Subject {
  // 在被观察者上添加一个观察者
  attach(observer: Observer): void;

  // 将观察者与被观察者分离。
  detach(observer: Observer): void;

  // 事件通知
  notify(): void;
}

/**
 * Subject拥有一些重要的状态，并在状态发生变化时通知观察者。
 */
class ConcreteSubject implements Subject {
  public textarea: string = "";

  private observers: Observer[] = [];

  /**
   * 订阅管理方法
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("观察者已经存在");
    }

    console.log("添加一个观察者");
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("不存在该观察者");
    }

    this.observers.splice(observerIndex, 1);
    console.log("分离了一个观察者");
  }

  /**
   * 在每个订户中触发更新。
   */
  public notify(): void {
    console.log("通知观察者");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * 编辑文本并且触发更新
   */
  public edit(str: string): void {
    console.log();
    this.textarea = str;
    console.log("编辑文本: " + `Textarea has changed to: ${this.textarea}`);
    this.notify();
  }
}

/**
 * Observer接口声明了主题使用的更新方法。
 */
interface Observer {
  update(subject: Subject): void;
}

/**
 * 第一个文本信息统计区用于显示可编辑文本区中出现的单词总数量和字符总数量，
 */
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.textarea) {
      let strs = new Array();
      let str = subject.textarea;
      str = str.replace(/,/g, "");
      str = str.replace(/\./g, "");
      strs = str.split(" ");
      console.log(
        `1. 单词总数：${strs.length}` + `  字符总数：${subject.textarea.length}`
      );
    }
  }
}

/**
 * 第二个文本信息统计区用于显示可编辑文本区中出现的单词（去重后按照字典序排序）
 */
class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.textarea) {
      let strs = new Array();
      let str = subject.textarea;
      str = str.replace(/,/g, "");
      str = str.replace(/\./g, "");
      strs = str.split(" ");
      strs = strs.filter((item, index, self) => {
        return self.indexOf(item) === index;
      });
      strs.sort();
      console.log(`2. 单词（去重后按照字典序排序）：${strs}`);
    }
  }
}

/**
 * 第三个文本信息统计区用于按照出现频次降序显示可编辑文本区中出现的单词以及每个单词出现的次数（例如：hello: 5）。
 */
interface WordCount {
  [key: string]: number;
}

class ConcreteObserverC implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.textarea) {
      let strs = new Array();
      let str = subject.textarea;
      str = str.replace(/,/g, "");
      str = str.replace(/\./g, "");
      strs = str.split(" ");
      let obj: WordCount = {};
      for (const item of strs) {
        if (obj[item]) {
          obj[item]++;
        } else {
          obj[item] = 1;
        }
      }
      console.log("3. 单词（出现频次）：");
      console.log(obj);
    }
  }
}

/**
 * The client code.
 */

const client = (function () {
  const subject = new ConcreteSubject();

  const observer1 = new ConcreteObserverA();
  subject.attach(observer1);

  const observer2 = new ConcreteObserverB();
  subject.attach(observer2);

  const observer3 = new ConcreteObserverC();
  subject.attach(observer3);

  subject.edit("Whatever is worth doing is worth doing well.");
  subject.edit("Do what you say, say what you do.");
})();
