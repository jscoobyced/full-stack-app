import { dbRows } from './db';
import { RowDataPacket } from 'mysql2';

const data: RowDataPacket[][] = [
  [
    {
      constructor: {
        name: 'RowDataPacket',
      },
      id: 1,
      name: 'john',
    },
  ],
];

describe('DB Utils', () => {
  it('can retrieve data rows', () => {
    const rows = dbRows(data);
    expect(rows).toBeDefined();
    expect(rows.length).toEqual(1);
  });

  it('returns empty rows when no data', () => {
    const empty = { ...data };
    empty[0].pop();
    const rows = dbRows(empty);
    expect(rows).toBeDefined();
    expect(rows.length).toEqual(0);
  });

  it('returns empty rows when data is undefined', () => {
    const rows = dbRows(undefined as unknown as RowDataPacket[][]);
    expect(rows).toBeDefined();
    expect(rows.length).toEqual(0);
  });
});
