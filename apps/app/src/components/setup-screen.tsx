"use client";

import { useState } from "react";
import { useAgentConfig } from "@/lib/agent-config-context";

interface SetupFormProps {
  onConnect: () => void;
  initialValues?: {
    deploymentUrl: string;
    langsmithApiKey: string;
    graphId: string;
  };
}

export function SetupForm({ onConnect, initialValues }: SetupFormProps) {
  const { setConfig } = useAgentConfig();
  const [deploymentUrl, setDeploymentUrl] = useState(
    initialValues?.deploymentUrl || ""
  );
  const [langsmithApiKey, setLangsmithApiKey] = useState(
    initialValues?.langsmithApiKey || ""
  );
  const [graphId, setGraphId] = useState(
    initialValues?.graphId || "sample_agent"
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!deploymentUrl.trim()) {
      setError("Deployment URL is required");
      return;
    }
    if (!langsmithApiKey.trim()) {
      setError("LangSmith API Key is required");
      return;
    }

    try {
      new URL(deploymentUrl.trim());
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    setConfig({
      deploymentUrl: deploymentUrl.trim(),
      langsmithApiKey: langsmithApiKey.trim(),
      graphId: graphId.trim() || "sample_agent",
    });

    onConnect();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1.5">
          Deployment URL
        </label>
        <input
          type="url"
          value={deploymentUrl}
          onChange={(e) => setDeploymentUrl(e.target.value)}
          placeholder="https://your-deployment.us.langgraph.app"
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-gray-900 dark:text-zinc-100 focus:ring-1 focus:ring-gray-300 dark:focus:ring-zinc-600 focus:outline-none placeholder-gray-300 dark:placeholder-zinc-600 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1.5">
          LangSmith API Key
        </label>
        <input
          type="password"
          value={langsmithApiKey}
          onChange={(e) => setLangsmithApiKey(e.target.value)}
          placeholder="lsv2_pt_..."
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-gray-900 dark:text-zinc-100 focus:ring-1 focus:ring-gray-300 dark:focus:ring-zinc-600 focus:outline-none placeholder-gray-300 dark:placeholder-zinc-600 font-mono transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-zinc-400 mb-1.5">
          Graph ID
          <span className="text-gray-300 dark:text-zinc-600 font-normal ml-1">
            optional
          </span>
        </label>
        <input
          type="text"
          value={graphId}
          onChange={(e) => setGraphId(e.target.value)}
          placeholder="sample_agent"
          className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50 text-gray-900 dark:text-zinc-100 focus:ring-1 focus:ring-gray-300 dark:focus:ring-zinc-600 focus:outline-none placeholder-gray-300 dark:placeholder-zinc-600 font-mono transition-colors"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-md hover:bg-gray-800 dark:hover:bg-white transition-colors cursor-pointer"
      >
        Connect
      </button>
    </form>
  );
}

export function SetupScreen() {
  return (
    <div className="h-full flex items-center justify-center bg-white dark:bg-zinc-950">
      <div className="w-full max-w-sm px-6">
        <div className="mb-6">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
            Connect to your agent
          </h1>
          <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">
            Enter your LangGraph deployment details.
          </p>
        </div>
        <SetupForm onConnect={() => {}} />
      </div>
    </div>
  );
}
