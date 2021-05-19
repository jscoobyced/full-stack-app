import { IngredientTypes } from './ingredients';

type ServiceType = void | number | string | IngredientTypes;

export type ErrorData = { code?: number; message?: string } | undefined;

export type ServiceResponse = { data: ServiceType; error?: ErrorData };

export type ControllerResponse = { data?: unknown; error?: ErrorData };
