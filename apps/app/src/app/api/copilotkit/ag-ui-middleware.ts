import { MCPAppsMiddleware } from "@ag-ui/mcp-apps-middleware";

export const aguiMiddleware = [
  new MCPAppsMiddleware({
    mcpServers: [
      {
        type: "http",
        url:
          process.env.MCP_SERVER_URL ||
          "https://excalidraw-mcp-app.vercel.app/mcp",
        serverId: "example_mcp_app",
      },
    ],
  }),
];
