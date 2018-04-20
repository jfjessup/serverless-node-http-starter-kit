import { APIGatewayEvent, APIGatewayEventRequestContext, Callback } from 'aws-lambda';

import { IGetWidgetResponseBody } from './http';

import { HttpResponseMessages } from '../../common/http/HttpResponseMessages';

import { IWidgetPO } from "../../model/widget/IWidget";
import { WidgetMapper } from '../../mapper/widget/WidgetMapper';

import { response } from '../../common/http/HttpUtils';

import { DynamoDBConnector } from '../../common/storage/DynamoDBConnector';

const logger = require('debug')('handler');

export class GetWidgetHandler {
  private widgetConnector: DynamoDBConnector;

  constructor() {
    this.widgetConnector = new DynamoDBConnector(process.env.WIDGETS_TABLE_NAME);
  }

  handle(event: APIGatewayEvent, context: APIGatewayEventRequestContext, callback: Callback): void {
    const widgetId: string = event.pathParameters.widgetId;
    if (!widgetId || widgetId.length < 1) {
      callback(null, response(400, { message: 'Missing widget id.' }));
      return;
    }

    this.widgetConnector.getDB().get({
      TableName: this.widgetConnector.getTableName(),
      Key: { uuid: widgetId }
    })
      .promise()
      .then((data) => {
        const httpResponseBody: IGetWidgetResponseBody = {
          message: HttpResponseMessages.NOT_FOUND,
          data: undefined,
          mUtc: undefined,
        };

        if (data && data.Item && data.Item.uuid) {
          httpResponseBody.message = HttpResponseMessages.SUCCESS;
          const widget = new WidgetMapper().mapDynamoItemToEntity(<IWidgetPO>data.Item);
          httpResponseBody.data = widget;
          httpResponseBody.mUtc = widget.modified;
        }

        callback(null, response(200, httpResponseBody));
      })
      .catch((error) => {
        logger('error %j', error);
        callback(null, response(200, error.message));
      });
  }
}
