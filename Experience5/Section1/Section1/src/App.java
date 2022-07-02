import java.util.ArrayList;

public class App {

  public interface Subject {
    // 在被观察者上添加一个观察者
    void attach(Observer observer);

    // 将观察者与被观察者分离。
    void detach(Observer observer);

    // 事件通知
    void notifyObs();
  }

  public interface Observer {
    String name = "";

    void accept(Subject subject);
  }

  static class Administrator implements Subject {

    private ArrayList<Observer> MeetingList;

    Administrator() {
      MeetingList = new ArrayList<Observer>();
    }

    /**
     * 订阅管理方法
     */
    public void attach(Observer observer) {
      int isExist = this.MeetingList.indexOf(observer);
      if (isExist != -1) {
        System.out.println("订阅者已经存在");
        return;
      }

      System.out.println("添加一个订阅者");
      this.MeetingList.add(observer);
    }

    public void detach(Observer observer) {
      int observerIndex = this.MeetingList.indexOf(observer);
      if (observerIndex != -1) {
        System.out.println("不存在该订阅者");
        return;
      }

      this.MeetingList.remove(observer);
      System.out.println("分离了一个订阅者");
    }

    /**
     * 在每个订阅用户中触发更新。
     */
    public void notifyObs() {
      System.out.println("通知订阅者");
      this.MeetingList.forEach(action -> action.accept(this));
    }

    /**
     * 在指定用户中触发更新。
     */
    public void notifyUser(Observer observer) {
      observer.accept(this);
    }
  }

  static class Department implements Observer {

    private String name;
    private ArrayList<Observer> EmployeeList;

    Department(String name) {
      this.name = name;
      this.EmployeeList = new ArrayList<>();
    }

    public void add(Observer observer) {
      this.EmployeeList.add(observer);
    }

    public void remove(Observer observer) {
      this.EmployeeList.remove(observer);
    }

    public void accept(Subject subject) {
      System.out.println("部门：" + this.name + "收到通知");
      this.EmployeeList.forEach(item -> item.accept(subject));
    }
  }

  static class Employee implements Observer {

    private String name;

    Employee(String name) {
      this.name = name;
    }

    public void accept(Subject subject) {
      System.out.println(this.name + "收到会议通知");
    }
  }

  public static void main(String[] args) throws Exception {
    Administrator admin = new Administrator();
    Department department = new Department("人事部");
    Employee employee1 = new Employee("张三");
    Employee employee2 = new Employee("李四");
    Employee employee3 = new Employee("王五");

    admin.attach(employee1);
    admin.attach(employee2);

    department.add(employee2);
    department.add(employee3);

    admin.notifyUser(department);
    admin.notifyObs();
  }
}
