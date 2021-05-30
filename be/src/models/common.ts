export type BaseEntity = { id: number; created?: Date; updated?: Date; isActive?: boolean };
export type BaseEntityWithName = BaseEntity & { name: string };
export type Category = BaseEntityWithName;
export type EntityWithCategory = BaseEntityWithName & { category: Category };
