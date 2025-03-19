import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle"
import { useState, useEffect } from "react";
import { PageContent } from "@/app/dashboard/page-content"

export default function Page() {
  const { state, toggleSidebar } = useSidebar();
  const { theme } = useTheme();

  // Initialize state from localStorage immediately
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "Dashboard";
  });

  // Update localStorage whenever activePage changes
  useEffect(() => {
      localStorage.setItem("activePage", activePage);
  }, [activePage]);

  return (
    <div className="flex h-screen flex-auto border-b text-foreground bg-noise ">
      {/* Sidebar */}
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 ${
           state === "collapsed" ? "ml-[3.5rem]" : "ml-[16rem]"
        }`}
      >
        {/* Page header resize when sidebar is collapsed */}
        <header className="sticky top-0 z-1000 flex h-12 items-center gap-2 transition-all ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 border-b border-border p-4 bg-sidebar/20 backdrop-blur-xs">
          <button onClick={toggleSidebar} className="p-2">
            <SidebarTrigger className="-ml-1" />
          </button>
          <Separator orientation="vertical" className="mr-2 h-4 border-border" />
          <h1 className="text-lg font-semibold">{activePage}</h1>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>

        { /* Dynamic page content */}
        <PageContent activePage={activePage} />
      </div>
    </div>
  );
}
