public class App {

  interface Strategy {
    void doAlgorithm();
  }

  static class PreCopy implements Strategy {

    public void doAlgorithm() {
      System.out.println("使用PreCopy（预拷贝）算法");
    }
  }

  static class Post_Copy implements Strategy {

    public void doAlgorithm() {
      System.out.println("使用Post - Copy（后拷贝）算法");
    }
  }

  static class CR_RT_Motion implements Strategy {

    public void doAlgorithm() {
      System.out.println("使用CR / RT - Motion算法");
    }
  }

  static class Context {

    private Strategy strategy;

    Context(Strategy strategy) {
      this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy) {
      this.strategy = strategy;
    }

    public void doSomeBusinessLogic() {
      this.strategy.doAlgorithm();
    }
  }

  public static void main(String[] args) throws Exception {
    Context context = new Context(new PreCopy());
    context.doSomeBusinessLogic();
    context.setStrategy(new Post_Copy());
    context.doSomeBusinessLogic();
    context.setStrategy(new CR_RT_Motion());
    context.doSomeBusinessLogic();
  }
}
