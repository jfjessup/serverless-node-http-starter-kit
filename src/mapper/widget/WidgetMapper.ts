import { IWidget, IWidgetPO } from "../../model/widget/IWidget";

import { AbstractEntityMapper } from "../../common/mapper/AbstractEntityMapper";

export class WidgetMapper extends AbstractEntityMapper<IWidget, IWidgetPO> {
  mapDynamoItemToEntity(dynamoItem: IWidgetPO): IWidget {
    return {
      id: dynamoItem.uuid,
      name: dynamoItem.name,
      modified: dynamoItem.modified,
      created: dynamoItem.created,
    };
  }

  mapEntityToDynamoItem(entity: IWidget): IWidgetPO {
    return {
      uuid: entity.id,
      name: entity.name,
      modified: entity.modified,
      created: entity.created,
    };
  }
}
