import { IngredientTypes } from './ingredients';

export type BaseEntity = { id: number; name: string; created?: Date; updated?: Date; isActive?: boolean };
export type Category = BaseEntity;
export type EntityWithCategory = BaseEntity & { category: Category };

type ServiceType = void | number | string | IngredientTypes;

export type ErrorData = { code?: number; message?: string } | undefined;

export type ServiceResponse = { data: ServiceType; error?: ErrorData };

export type ControllerResponse = { data?: unknown; error?: ErrorData };
