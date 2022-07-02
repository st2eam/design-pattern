// 会议管理系统的“会议通知发送”模块说明如下:
// A.	行政管理人员可以给某个或某些员工Employee）发送会议通知，也可以给某个部门（Department）发送通知，如果给某个部门发送通知，将逐个给该部门每个员工发送会议通知。
// B.	如果员工或者部门希望能够收到会议通知，必须先注册到一个会议列表（MeetingList）中，在发送通知时，系统将遍历会议列表，逐个将会议通知发送给注册用户 （User）
// 根据以上说明，选择两种组合的设计模式设计该“会议通知发送”模块，请给出设计模式的名称和定义，分析选择该模式的理由。并结合实例绘制解决方案的结构图。

/**
 * Subject接口声明了一组用于管理订阅者的方法。
 */
interface Subject {
  // 在被观察者上添加一个观察者
  attach(observer: Observer): void;

  // 将观察者与被观察者分离。
  detach(observer: Observer): void;

  // 事件通知
  notifyObs(): void;
}

/**
 * 行政管理人员可以发送会议通知，并在状态发生变化时通知观察者。
 */
class Administrator implements Subject {
  private MeetingList: Observer[] = [];

  /**
   * 订阅管理方法
   */
  public attach(observer: Observer): void {
    const isExist = this.MeetingList.includes(observer);
    if (isExist) {
      return console.log("订阅者已经存在");
    }

    console.log("添加一个订阅者");
    this.MeetingList.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.MeetingList.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("不存在该订阅者");
    }

    this.MeetingList.splice(observerIndex, 1);
    console.log("分离了一个订阅者");
  }

  /**
   * 在每个订阅用户中触发更新。
   */
  public notifyObs(): void {
    console.log("通知订阅者");
    for (const observer of this.MeetingList) {
      observer.accept(this);
    }
  }

  /**
   * 在指定用户中触发更新。
   */
  public notifyUser(observer: Observer): void {
    observer.accept(this);
  }
}

interface Observer {
  name: string;
  accept(subject: Subject): void;
}

class Department implements Observer {
  name: string;
  private EmployeeList: Observer[] = [];
  constructor(name: string) {
    this.name = name;
  }
  public add(observer: Observer): void {
    this.EmployeeList.push(observer);
  }
  public remove(observer: Observer): void {
    let index = this.EmployeeList.indexOf(observer);
    this.EmployeeList.splice(index, 1);
  }

  public accept(subject: Subject): void {
    for (let item of this.EmployeeList) {
      item.accept(subject);
    }
  }
}

class Employee implements Observer {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  public accept(subject: Subject): void {
    console.log(this.name + "收到会议通知");
  }
}

/**
 * The client code.
 */
const client = (function () {
  const subject = new Administrator();

  const Department1 = new Department("部门");
  const observer1 = new Employee("其他部门的员工1");
  const observer2 = new Employee("员工2");
  const observer3 = new Employee("员工3");
  subject.attach(observer1);
  Department1.add(observer2);
  Department1.add(observer3);

  subject.notifyUser(Department1);
  subject.notifyObs();
})();
