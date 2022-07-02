interface ConnectionFactory {
  createConnection(): Connection;
}
class MySqlConnectionFactory implements ConnectionFactory {
  createConnection(): Connection {
    return new MySqlConnection();
  }
}
class OracleConnectionFactory implements ConnectionFactory {
  createConnection(): Connection {
    return new OracleConnection();
  }
}
abstract class Statement {
  abstract execute(sql: string): void;
}
class MysqlStatement extends Statement {
  execute(sql: string): void {
    console.log(`Mysql execute: ${sql}`);
  };
}
class OracleStatement extends Statement {
  execute(sql: string): void {
    console.log(`Oracle execute: ${sql}`);
  };
}
abstract class Connection {
  statement!: Statement;
  abstract connect(): void;
}
class MySqlConnection extends Connection {
  constructor() {
    super();
    this.statement = new MysqlStatement();
  }
  connect(): void {
    console.log("mysql connection");
  }
}
class OracleConnection extends Connection {
  constructor() {
    super();
    this.statement = new OracleStatement();
  }
  connect(): void {
    console.log("oracle connection");
  }
}
function client(type: string): void {
  let connectionFactory: ConnectionFactory;
  connectionFactory = new MySqlConnectionFactory();
  if (type === "mysql") {
    connectionFactory = new MySqlConnectionFactory();
  } else if (type === "oracle") {
    connectionFactory = new OracleConnectionFactory();
  }
  const connection = connectionFactory.createConnection();
  connection.connect();
  connection.statement.execute("select * from user");
}
client("mysql");