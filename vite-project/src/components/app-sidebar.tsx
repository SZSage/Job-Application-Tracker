import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Home, Settings } from "lucide-react";

const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Settings", url: "#", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar(); // Detect expanded/collapsed state

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
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      {/* Hide text when collapsed */}
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
