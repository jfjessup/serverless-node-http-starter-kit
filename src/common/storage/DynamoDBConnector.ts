import { config, DynamoDB } from 'aws-sdk';
import * as Promise from 'bluebird';

const debug = require('debug')('connector');

config.setPromisesDependency(Promise);
config.update({
  region: process.env.SERVERLESS_REGION,
  dynamoDbCrc32: false,
});

export class DynamoDBConnector {
  private tableName: string;
  private db: DynamoDB.DocumentClient;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = new DynamoDB.DocumentClient({
      httpOptions: { timeout: 3000 },
      // logger: { log: /* istanbul ignore next */ msg => debug(msg) },
      convertEmptyValues: true,
    });
  }

  getTableName() {
    return this.tableName;
  }

  getDB() {
    return this.db;
  }
}
