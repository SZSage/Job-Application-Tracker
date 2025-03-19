import { Settings, LayoutDashboardIcon, User2, FileUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarHeader,
  SidebarRail,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const items = [
  { title: "Dashboard", icon: LayoutDashboardIcon },
  { title: "Job Applications", icon: FileUser },
  { title: "Settings", icon: Settings },
];

export function AppSidebar({
  activePage,
  setActivePage,
  }: SidebarProps) {
  const { state, toggleSidebar } = useSidebar(); // Detect expanded/collapsed state

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className={`bg-transition-all duration-300 ease-out ${
        state === "collapsed" ? "w-[3.5em]" : "w-[16rem]"
      }`}
    >
      <SidebarContent className="p-2 pt-0 bg-sidebar/50 backdrop-blur-md">
        <SidebarGroup>
          <SidebarHeader
            className="flex flex-row h-12 items-center gap-2 px-2 transition-all duration-300 ease-linearborder-b border-border group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-15 bg-transparent"
            onClick={toggleSidebar}
            >
            <User2 className="size-5 shrink-0" />
            {state === "expanded" && (
              <span className="text-sm font-medium whitespace-nowrap">
                User
              </span>
            )}
          </SidebarHeader>

          <Separator
            orientation="horizontal"
            className={`mb-2 transition-all duration-300 ease-out ${
              state === "collapsed" ? "w-8 mx-auto" : "w-full"
            }`}
          />

          <SidebarGroupLabel>Sidebar Options</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      className={`flex items-center gap-2 transition-all${
                        activePage === item.title
                          ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => {
                        setActivePage(item.title);
                      }}
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
