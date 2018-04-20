export abstract class AbstractEntityMapper<Entity,DynamoItem> {
  public abstract mapEntityToDynamoItem(entity: Entity): DynamoItem;

  public abstract mapDynamoItemToEntity(dynamoItem: DynamoItem): Entity;
}
