"use client";

import { ExampleLayout } from "@/components/example-layout";
import { Canvas } from "@/components/canvas";
import { useGenerativeUIExamples, useExampleSuggestions } from "@/hooks";
import { SetupScreen } from "@/components/setup-screen";
import { SettingsButton } from "@/components/settings-button";
import { useAgentConfig } from "@/lib/agent-config-context";

import { CopilotChat } from "@copilotkit/react-core/v2";
// import { HeadlessChat } from "@/components/headless-chat";

export default function HomePage() {
  const { isConfigured } = useAgentConfig();

  // 🪁 Generative UI Examples
  useGenerativeUIExamples();

  // 🪁 Example Suggestions
  useExampleSuggestions();

  if (!isConfigured) {
    return <SetupScreen />;
  }

  return (
    <>
      <SettingsButton />
      <ExampleLayout
        chatContent={<CopilotChat />}
        // chatContent={<HeadlessChat />}
        appContent={<Canvas />}
      />
    </>
  );
}
