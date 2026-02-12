import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { LangGraphAgent } from "@copilotkit/runtime/langgraph";
import { NextRequest } from "next/server";
import { aguiMiddleware } from "@/app/api/copilotkit/ag-ui-middleware";

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const deploymentUrl =
    searchParams.get("deploymentUrl") ||
    process.env.LANGGRAPH_DEPLOYMENT_URL ||
    "http://localhost:8123";
  const langsmithApiKey =
    searchParams.get("langsmithApiKey") ||
    process.env.LANGSMITH_API_KEY ||
    "";
  const graphId = searchParams.get("graphId") || "sample_agent";

  const agent = new LangGraphAgent({
    deploymentUrl,
    langsmithApiKey,
    graphId,
  });

  agent.use(...aguiMiddleware);

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    serviceAdapter: new ExperimentalEmptyAdapter(),
    runtime: new CopilotRuntime({
      agents: {
        default: agent,
      },
    }),
  });

  return handleRequest(req);
};
