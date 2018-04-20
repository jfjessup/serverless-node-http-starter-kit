const merge = require('lodash.merge');

export const cors = {
  headers: {
    // Required for CORS support to work
    'Access-Control-Allow-Origin': '*',
    // Required for cookies, authorization headers with HTTPS
    'Access-Control-Allow-Credentials': true,
  },
};

export const maxAge0 = {
  headers: {
    'Cache-Control': 'max-age=0',
  },
};

export const HTTP_VERBS = {
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
  GET: 'GET',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
};

export const allowedMethods = (...verbs) => ({
  headers: {
    Allow: verbs.concat(HTTP_VERBS.OPTIONS, HTTP_VERBS.HEAD).join(', '),
  },
});

export const response = (code: number, body: any) => (
  merge({ statusCode: code }, cors, maxAge0, { body: JSON.stringify(body) })
);

export const errorResponse = (code: number, body: any) => (
  { statusCode: code, body: JSON.stringify(body) }
);

export const unsupportedResponse = (...verbs) => (
  merge(
    { statusCode: 405 },
    cors,
    maxAge0,
    allowedMethods(verbs),
    { body: JSON.stringify('UnsupportedMethod') },
  )
);
