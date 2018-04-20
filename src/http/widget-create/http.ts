import { IRequestBody, IResponseBody } from "../../common/http/CommonHttp";

import { IWidget } from '../../model/widget/IWidget';

export interface ICreateWidgetRequestBody extends IRequestBody {
  data: {
    name: string,
  };
}

export interface ICreateWidgetResponseBody extends IResponseBody {
  data: IWidget;
}
