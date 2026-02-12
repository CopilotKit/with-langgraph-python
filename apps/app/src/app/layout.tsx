"use client";

import "./globals.css";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/v2/styles.css";
import { useEffect } from "react";
import {
  AgentConfigProvider,
  useAgentConfig,
} from "@/lib/agent-config-context";

function CopilotKitWrapper({ children }: { children: React.ReactNode }) {
  const { config, isConfigured } = useAgentConfig();

  const runtimeUrl =
    isConfigured && config
      ? `/api/copilotkit?${new URLSearchParams({
          deploymentUrl: config.deploymentUrl,
          langsmithApiKey: config.langsmithApiKey,
          graphId: config.graphId,
        }).toString()}`
      : "/api/copilotkit";

  return <CopilotKit runtimeUrl={runtimeUrl}>{children}</CopilotKit>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AgentConfigProvider>
          <CopilotKitWrapper>{children}</CopilotKitWrapper>
        </AgentConfigProvider>
      </body>
    </html>
  );
}
