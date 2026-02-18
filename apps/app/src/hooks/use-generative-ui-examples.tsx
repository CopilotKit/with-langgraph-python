import { useFrontendTool, useHumanInTheLoop } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { useDefaultTool } from "@copilotkit/react-core";
import { PieChart } from "@/components/generative-ui/charts/pie-chart";
import { BarChart } from "@/components/generative-ui/charts/bar-chart";
import { MeetingTimePicker } from "@/components/generative-ui/meeting-time-picker";
import { ToolReasoning } from "@/components/tool-rendering";

export const useGenerativeUIExamples = () => {
  // ------------------
  // 🪁 Frontend Tools: https://docs.copilotkit.ai/langgraph/frontend-actions
  // ------------------
  useFrontendTool({
    name: "toggleTheme",
    description:
      "Toggle between light and dark mode for the app. This is a great example of a frontend tool.",
    parameters: z.object({
      theme: z.enum(["light", "dark"]).describe("The theme to switch to"),
    }),
    handler: async ({ theme }) => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return `Switched to ${theme} mode!`;
    },
  });

  // --------------------------
  // 🪁 Backend Tool Rendering: https://docs.copilotkit.ai/langgraph/generative-ui/backend-tools
  // --------------------------
  useDefaultTool({
    render: ({ name, status, args }) => (
      <ToolReasoning name={name} status={status} args={args} />
    ),
  });

  // ----------------------------------
  // 🪁 Frontend Tools - Generative UI: https://docs.copilotkit.ai/langgraph/generative-ui/frontend-tools
  // ----------------------------------
  useFrontendTool({
    name: "show_pie_chart",
    description: `
      Displays data as a pie chart or bar chart.
      This is a great example of controlled generative UI.
    `,
    parameters: z.object({
      title: z.string().describe("Chart title"),
      description: z.string().describe("Brief description or subtitle"),
      data: z
        .array(
          z.object({
            label: z.string(),
            value: z.number(),
          }),
        )
        .describe("Array of {label: string, value: number}"),
    }),
    render: ({ args }) => {
      const { title, description, data } = args;

      // Provide defaults for required fields
      const chartTitle = title || "Chart";
      const chartDescription = description || "";
      const chartData = (data as Array<{ label: string; value: number }>) || [];

      return (
        <PieChart
          title={chartTitle}
          description={chartDescription}
          data={chartData}
        />
      );
    },
  });

  useFrontendTool({
    name: "show_bar_chart",
    description: `
      Displays data as a pie chart or bar chart.
      This is a great example of controlled generative UI.
    `,
    parameters: z.object({
      title: z.string().describe("Chart title"),
      description: z.string().describe("Brief description or subtitle"),
      data: z
        .array(
          z.object({
            label: z.string(),
            value: z.number(),
          }),
        )
        .describe("Array of {label: string, value: number}"),
    }),
    render: ({ args }) => {
      const { title, description, data } = args;

      // Provide defaults for required fields
      const chartTitle = title || "Chart";
      const chartDescription = description || "";
      const chartData = (data as Array<{ label: string; value: number }>) || [];

      return (
        <BarChart
          title={chartTitle}
          description={chartDescription}
          data={chartData}
        />
      );
    },
  });

  // -------------------------------------
  // 🪁 Frontend-tools - Human-in-the-loop: https://docs.copilotkit.ai/langgraph/human-in-the-loop/frontend-tool-based
  // -------------------------------------
  useHumanInTheLoop({
    name: "demonstrateHumanInTheLoop",
    description:
      "Demonstrate human-in-the-loop by proposing meeting times and asking the user to select one.",
    render: ({ respond, status }) => {
      return <MeetingTimePicker status={status} respond={respond} />;
    },
  });
};
