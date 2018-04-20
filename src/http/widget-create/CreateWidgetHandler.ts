// Type(s) & Enum(s)
import { APIGatewayEvent, APIGatewayEventRequestContext, Callback } from 'aws-lambda';
import { ICreateWidgetRequestBody, ICreateWidgetResponseBody } from './http';

// HTTP Helper(s)
import { HttpResponseMessages } from '../../common/http/HttpResponseMessages';
import { response } from '../../common/http/HttpUtils';

// Database Helper(s)
import { DynamoDBConnector } from '../../common/storage/DynamoDBConnector';

// Model(s) & Mapper(s)
import { Widget } from "../../model/widget/Widget";
import { WidgetMapper } from "../../mapper/widget/WidgetMapper";

const logger = require('debug')('handler');

export class CreateWidgetHandler {
  private widgetsConnector: DynamoDBConnector;

  constructor() {
    this.widgetsConnector = new DynamoDBConnector(process.env.WIDGETS_TABLE_NAME);
  }

  handle(event: APIGatewayEvent, context: APIGatewayEventRequestContext, callback: Callback): void {
    const httpBody: ICreateWidgetRequestBody = JSON.parse(event.body);

    const widgetName = httpBody.data.name;
    if (!widgetName || widgetName.length < 1) {
      callback(null, response(400, { message: 'New widgets require a name' }));
      return;
    }

    const newWidget = new Widget(widgetName);

    this.widgetsConnector.getDB().put({
      TableName: this.widgetsConnector.getTableName(),
      Item: new WidgetMapper().mapEntityToDynamoItem(newWidget),
    })
      .promise()
      .then(() => {
        const httpResponseBody: ICreateWidgetResponseBody = {
          message: HttpResponseMessages.SUCCESS,
          mUtc: newWidget.modified,
          data: newWidget,
        };
        callback(null, response(200, httpResponseBody));
      })
      .catch((error) => {
        logger('error %j', error);
        callback(null, response(400, { message: error.message }));
      });
  }
}
