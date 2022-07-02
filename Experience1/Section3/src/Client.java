//某web性能测试软件中包含一个虚拟用户生成器（Virtual User Generator）。
//为了避免生成的虚拟用户数量不一致，该测试软件在工作时只允许启动唯一一个虚拟用户生成器。
//采用单例模式设计该虚拟用户生成器，绘制类图并分别使用饿汉式单例、双重检测锁和IoDH三种方式编程模拟实现。
public class Client {

  //饿汉式单例
  public static class SingletonHungry {

    private static SingletonHungry instance = new SingletonHungry();

    private SingletonHungry() {}

    public static SingletonHungry getInstance() {
      System.out.println("SingletonHungry getInstance");
      return instance;
    }
  }

  //双重检测锁
  public static class SingletonDoubleCheck {

    private static SingletonDoubleCheck instance;

    private SingletonDoubleCheck() {}

    public static SingletonDoubleCheck getInstance() {
      if (instance == null) { //先验证对象是否创建
        synchronized (SingletonDoubleCheck.class) { //只有当对象未创建的时候才上锁
          if (instance == null) {
            instance = new SingletonDoubleCheck();
          }
          System.out.println("SingletonDoubleCheck getInstance");
        }
      }
      return instance;
    }
  }

  //Initialization on Demand Holder
  public static class SingletonIoDH {

    private SingletonIoDH() {}

    private static class HolderClass {

      private static final SingletonIoDH instance = new SingletonIoDH();
    }

    public static SingletonIoDH getInstance() {
      System.out.println("SingletonIoDH getInstance");
      return HolderClass.instance;
    }
  }

  public static void main(String[] args) {
    //饿汉式单例
    SingletonHungry.getInstance();
    //双重检测锁
    SingletonDoubleCheck.getInstance();
    //IoDH
    SingletonIoDH.getInstance();
  }
}
