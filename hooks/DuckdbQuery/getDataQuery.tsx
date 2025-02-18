export const fetchJsonTableData = async (props) => {
  const { db, query_table, json_col } = props;
  const conn = await db.connect();
  const result = await conn.query(query_table);
  return result
    .toArray()
    .map((row) => ({
      ...row,
      json_col: JSON.parse(row[json_col])
    }));
};


export const fetchTableData = async (props) => {
    const { db, TableName } = props;
    const conn = await db.connect();
    const result = await conn.query(`SELECT * FROM ${TableName};`);
    return result .toArray()
  };

  export const fetchQueryData = async (props) => {
    const { db, query } = props;
    const conn = await db.connect();
    const result = await conn.query(query);
    return result .toArray()
  };
