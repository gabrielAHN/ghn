"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as duckdb from "@duckdb/duckdb-wasm";
import duckdb_wasm from "@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm";
import duckdb_wasm_eh from "@duckdb/duckdb-wasm/dist/duckdb-eh.wasm";

const MANUAL_BUNDLES = {
  mvp: {
    mainModule: duckdb_wasm,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js",
      import.meta.url
    ).toString(),
  },
  eh: {
    mainModule: duckdb_wasm_eh,
    mainWorker: new URL(
      "@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js",
      import.meta.url
    ).toString(),
  },
};


const DuckDBContext = createContext < DuckDBContextType | undefined > (undefined);


export const DuckDBProvider = ({ children }) => {
  const [db, setDb] = useState < duckdb.AsyncDuckDB | null > (null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDuckDB = async () => {
      try {
        const bundle = await duckdb.selectBundle(MANUAL_BUNDLES);
        const worker = new Worker(bundle.mainWorker!);
        const logger = new duckdb.VoidLogger();
        const dbInstance = new duckdb.AsyncDuckDB(logger, worker);

        await dbInstance.instantiate(bundle.mainModule, bundle.pthreadWorker);
        const connection = await dbInstance.connect();

        await connection.query(`
          ATTACH '${process.env.NEXT_PUBLIC_S3_FILE}';
        `);

        setDb(dbInstance);
      } catch (error) {
        console.error("Error initializing DuckDB:", error);
      } finally {
        setLoading(false);
      }
    };

    initDuckDB();
  }, []);

  return (
    <DuckDBContext.Provider value={{ db, loading }}>
      {children}
    </DuckDBContext.Provider>
  );
};


export const useDuckDB = () => {
  const context = useContext(DuckDBContext);
  if (!context) {
    throw new Error("useDuckDB must be used within a DuckDBProvider");
  }
  return context;
};
