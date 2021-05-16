import { UserTypes } from './user';

type ServiceType = void | number | string | UserTypes;

export type ErrorData = { code?: number; message?: string } | undefined;

export type ServiceResponse = { data: ServiceType; error?: ErrorData };

export type ControllerResponse = { data?: unknown; error?: ErrorData };
