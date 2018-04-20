import { IRequestBody, IResponseBody } from "../../common/http/CommonHttp";

import { IWidget } from "../../model/widget/IWidget";

export interface IGetWidgetRequestBody extends IRequestBody {}

export interface IGetWidgetResponseBody extends IResponseBody {
  data: IWidget;
}
