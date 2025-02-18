"use client";

import { createContext, useContext, useState } from "react";

const GraphModeContext = createContext();

export function GraphModeProvider({ children }) {
  const [graphMode, setGraphMode] = useState("explore");
  return (
    <GraphModeContext.Provider value={{ graphMode, setGraphMode }}>
      {children}
    </GraphModeContext.Provider>
  );
}

export function useGraphMode() {
  const context = useContext(GraphModeContext);
  if (context === undefined) {
    throw new Error("useGraphMode must be used within a GraphModeProvider");
  }
  return context;
}
