import { Sidebar, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Settings, LayoutDashboardIcon, User2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const items = [
  { title: "Dashboard", url: "#", icon: LayoutDashboardIcon },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar(); // Detect expanded/collapsed state
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className={`transition-all duration-300 ease-in-out ${
        state === "collapsed" ? "w-[4rem]" : "w-[16rem]"
      }`}
    >
      <SidebarContent className="p-4">
        <SidebarGroup>
          {/* Use SidebarMenuItem for User to match animations */}
          <SidebarMenu>
        {/* Page header resize when sidebar is collapsed */}
        <header className="sticky top-0 flex h-16 items-center gap-2 transition-all ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-backgroundp-4">
            <SidebarMenuItem key="user">
              <SidebarMenuButton asChild>
                <button
                  className={`flex items-center gap-2 transition-all ${
                    activeItem === "User"
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveItem("User")}
                >
                  <User2/>
                  {/* Hide text when collapsed */}
                  {state === "expanded" && <span>User</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </header>
          </SidebarMenu>

          {/* Separator */}
          <Separator
            orientation="horizontal"
            className={`h-0.5 border-border transition-all duration-300 ${
              state === "collapsed" ? "min-w-8 mx-auto mb-4" : "w-full"
            }`}
          />

          <SidebarGroupLabel>Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 transition-all ${
                        activeItem === item.title
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setActiveItem(item.title)}
                    >
                      <item.icon />
                      {state === "expanded" && <span>{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
