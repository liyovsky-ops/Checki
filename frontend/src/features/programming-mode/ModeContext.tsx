"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ProgrammingMode = "eco" | "comfort" | "sport" | "enterprise" | "security" | null;

interface ModeContextValue {
  mode: ProgrammingMode;
  setMode: (mode: ProgrammingMode) => void;
}

const ModeContext = createContext<ModeContextValue>({
  mode: null,
  setMode: () => {},
});

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ProgrammingMode>(null);

  useEffect(() => {
    const saved = localStorage.getItem("programmingMode") as ProgrammingMode;
    if (saved) setModeState(saved);
  }, []);

  useEffect(() => {
    if (mode) {
      document.documentElement.setAttribute("data-mode", mode);
      localStorage.setItem("programmingMode", mode);
    } else {
      document.documentElement.removeAttribute("data-mode");
      localStorage.removeItem("programmingMode");
    }
  }, [mode]);

  function setMode(m: ProgrammingMode) {
    setModeState(m);
  }

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function useMode() {
  return useContext(ModeContext);
}
