import { APIGatewayEvent, APIGatewayEventRequestContext, Callback } from 'aws-lambda';

import { unsupportedResponse, HTTP_VERBS } from '../../common/http/HttpUtils';

import { GetWidgetHandler } from './GetWidgetHandler';

const logger = require('debug')('handle');

export const handle = (event: APIGatewayEvent, context: APIGatewayEventRequestContext, callback: Callback) => {
  logger('event %j', event);
  logger('context %j', context);

  switch (event.httpMethod) {
    case HTTP_VERBS.GET:
      new GetWidgetHandler().handle(event, context, callback);
      break;
    default:
      callback(null, unsupportedResponse([
        HTTP_VERBS.GET,
        HTTP_VERBS.POST,
      ]));
      break;
  }
};
