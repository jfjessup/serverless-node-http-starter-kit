import { IWidget, IWidgetPO } from "./IWidget";

import { TimeUtils } from "../../common/time/TimeUtils";
const uuidV4 = require('uuid/v4');

export class Widget implements IWidget {
  id: string;
  name: string;
  created: string;
  modified: string;

  constructor(name: string) {
    const currentUtc = TimeUtils.getCurrentISOString();

    this.id = uuidV4();
    this.name = name;
    this.created = currentUtc;
    this.modified = currentUtc;
  }
}

export class WidgetPO implements IWidgetPO {
  uuid: string;
  name: string;
  created: string;
  modified: string;

  constructor(id: string, name: string, created: string, modified: string) {
    this.uuid = id;
    this.name = name;
    this.created = created;
    this.modified = modified;
  }
}
