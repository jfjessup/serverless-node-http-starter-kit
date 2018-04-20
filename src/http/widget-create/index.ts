import { APIGatewayEvent, APIGatewayEventRequestContext, Callback } from 'aws-lambda';

import { unsupportedResponse, HTTP_VERBS } from '../../common/http/HttpUtils';

import { CreateWidgetHandler } from './CreateWidgetHandler';

const logger = require('debug')('handle');

export const handle = (event: APIGatewayEvent, context: APIGatewayEventRequestContext, callback: Callback): void => {
  logger('event %j', event);
  logger('event %j', context);

  switch (event.httpMethod) {
    case HTTP_VERBS.POST:
      new CreateWidgetHandler().handle(event, context, callback);
      break;
    default:
      callback(null, unsupportedResponse([
        HTTP_VERBS.GET,
        HTTP_VERBS.POST,
      ]));
      break;
  }
};
