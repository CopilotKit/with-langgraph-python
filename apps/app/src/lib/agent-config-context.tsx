"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AgentConfig {
  deploymentUrl: string;
  langsmithApiKey: string;
  graphId: string;
}

interface AgentConfigContextType {
  config: AgentConfig | null;
  setConfig: (config: AgentConfig) => void;
  clearConfig: () => void;
  isConfigured: boolean;
}

const AgentConfigContext = createContext<AgentConfigContextType | null>(null);

const STORAGE_KEY = "agent-config";

export function AgentConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<AgentConfig | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setConfigState(JSON.parse(stored));
      } catch {
        // ignore corrupt data
      }
    }
    setLoaded(true);
  }, []);

  const setConfig = (newConfig: AgentConfig) => {
    setConfigState(newConfig);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
  };

  const clearConfig = () => {
    setConfigState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!loaded) return null;

  return (
    <AgentConfigContext.Provider
      value={{ config, setConfig, clearConfig, isConfigured: config !== null }}
    >
      {children}
    </AgentConfigContext.Provider>
  );
}

export function useAgentConfig() {
  const ctx = useContext(AgentConfigContext);
  if (!ctx)
    throw new Error("useAgentConfig must be used within AgentConfigProvider");
  return ctx;
}
