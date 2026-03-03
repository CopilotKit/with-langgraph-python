"use client";

import "./globals.css";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-core/v2/styles.css";
import { ThemeProvider } from "@/hooks/use-theme";

import { createA2UIMessageRenderer } from "@copilotkit/a2ui-renderer";
import { theme } from "@/lib/a2ui-theme.css";

const A2UIMessageRenderer = createA2UIMessageRenderer({ theme });
const activityRenderers = [A2UIMessageRenderer];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <CopilotKit runtimeUrl="/api/copilotkit" renderActivityMessages={activityRenderers}>{children}</CopilotKit>
        </ThemeProvider>
      </body>
    </html>
  );
}
