//在某电子商务系统中，为了提高查询性能，需要将一些频繁查询的数据保存到内存的辅助存储对象中（提示：可使用Map实现）。
//用户在执行查询操作时，先判断辅助存储对象中是否存在待查询的数据，如果不存在，则通过数据操作对象查询并返回数据，然后将数据保存到辅助存储对象中，
//否则直接返回存储在辅助存储对象中的数据。先采用代理模式中的缓冲代理实现该功能，要求绘制对应的类图并编程模拟实现。
interface ServiceInterface {
  query(key: string): string;
}
class Service implements ServiceInterface {
  query(key: string) {
    return `query result for ${key}`;
  }
}
class ProxyService implements ServiceInterface {
  constructor(service: Service) {
    this.data = new Map();
    this.service = service;
  }
  query(key: string) {
    if (this.data.has(key)) {
      return "query from cache: " + this.data.get(key);
    } else {
      let result = this.service.query(key);
      this.data.set(key, result);
      return "query from service: " + result;
    }
  }
  data: Map<string, any>;
  service: Service;
}
function client2() {
  let service = new ProxyService(new Service());
  console.log(service.query("key1"));
  console.log(service.query("key1"));
  console.log(service.query("key2"));
  console.log(service.query("key2"));
}
client2();