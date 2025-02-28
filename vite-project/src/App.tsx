import { useEffect, useState } from "react";
import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#263238] to-[#162632] bg-noise text-white">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
      <Page />
      </SidebarProvider>
    </ThemeProvider>
    </div>
  );
}

export default App;
