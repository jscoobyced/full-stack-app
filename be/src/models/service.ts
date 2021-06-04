import { IngredientResponse } from './ingredients';

type ServiceType = void | number | string | boolean | IngredientResponse;
export type ErrorData = { code?: number; message?: string } | undefined;
export type ServiceResponse = { data: ServiceType; error?: ErrorData };
export type ControllerResponse = { data?: unknown; error?: ErrorData };
