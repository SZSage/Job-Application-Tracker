import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle"

export default function Page() {
  const { state } = useSidebar();
  const { theme } = useTheme();

  return (
    <div className="flex h-screen flex-auto bg-background text-foreground transition-colors">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 flex-1 ${
          state === "collapsed" ? "ml-[4rem]" : "ml-[16rem]"
        }`}
      >
        {/* Page header resize when sidebar is collapsed */}
        <header className="sticky top-0 z-1000 flex h-16 items-center gap-2 transition-all ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background border-b border-border p-4 bg-background/50 backdrop-blur-lg">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 border-border" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>

        <div className="p-4">
          <p>Main Content Goes Here</p>
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
            <div className="aspect-video rounded-xl bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
