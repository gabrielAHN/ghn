"use client";

import { DuckDBProvider } from "./provider/DuckDBProvider";
import { GraphModeProvider } from "./provider/GraphModeContext";

export default function Layout({ children }) {
    return (
        <DuckDBProvider>
            <GraphModeProvider>
                {children}
            </GraphModeProvider>
        </DuckDBProvider>
    );
}