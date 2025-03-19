import { useEffect, useState } from "react";
import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <div className="font-roboto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <Page />
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}

