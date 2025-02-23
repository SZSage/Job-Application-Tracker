import { Sidebar, SidebarHeader,SidebarRail, SidebarTrigger, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Settings, LayoutDashboardIcon, User2, FileUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const items = [
  { title: "Dashboard", url: "#", icon: LayoutDashboardIcon },
  { title: "Applications", url: "#", icon: FileUser },
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
      <SidebarContent className="p-2 pt-0">
        <SidebarGroup>
          <SidebarHeader className="flex flex-row h-15 items-center gap-2 px-2 transition-all duration-300 ease-linearborder-b border-border group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <User2 className="size-5 shrink-0" />
            {state === "expanded" && <span className="text-sm font-medium whitespace-nowrap">User</span>}
          </SidebarHeader>

          <Separator
            orientation="horizontal"
            className={` transition-all duration-300 mx-2 ${
              state === "collapsed" ? "w-10 mx-auto" : "w-full"
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
      <SidebarRail />
    </Sidebar>
  );
}
