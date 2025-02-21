import { AppSidebar} from "@/components/app-sidebar";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const { state } = useSidebar(); // Track sidebar state

  return (
    <div className="flex h-screen flex-auto">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main content - Adjusts based on sidebar state */}
      <div
        className={`transition-all duration-300 flex-1 ${
          state === "collapsed" ? "ml-[4rem]" : "ml-[16rem]"
        }`}
      >
        <header className="flex h-16 items-center gap-2 bg-gray-100 p-4 transition-all">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <div className="p-4">
          <p>Main Content Goes Here</p>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
