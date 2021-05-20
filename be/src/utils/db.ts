import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2';

type RowData = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

export const dbRows = (data: RowData): RowDataPacket[] => {
  if (!data) {
    return [];
  }
  const dimension: unknown[] = data as unknown[];
  if (dimension.length < 1) {
    return [];
  }
  return dimension[0] as RowDataPacket[];
};
