"use client";

import "./globals.css";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-core/v2/styles.css";
import { ThemeProvider } from "@/hooks/use-theme";

import { theme } from "@/lib/a2ui-theme.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <CopilotKit runtimeUrl="/api/copilotkit" a2ui={{ theme }}>{children}</CopilotKit>
        </ThemeProvider>
      </body>
    </html>
  );
}
