export type BaseEntity = { id: number; created?: Date; updated?: Date; isActive?: boolean };
export type BaseEntityWithName = BaseEntity & { name: string };
export type Category = BaseEntityWithName;
export type EntityWithCategory = BaseEntityWithName & { category: Category };

export type ErrorData = { code?: number; message?: string } | undefined;
export type ControllerResponse = { data?: unknown; error?: ErrorData };
