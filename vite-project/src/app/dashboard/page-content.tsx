import Dashboard from "@/features/dashboard";
import Applications from "@/features/applications/applications";
import Settings from "@/features/settings";

export function PageContent({ activePage }: { activePage: string }) {
  return (
    <div className="mx-auto lg:max-w-[80%] md:max-w-[80%]">
      {activePage === "Dashboard" && <Dashboard />}
      {activePage === "Job Applications" && <Applications />}
      {activePage === "Settings" && <Settings />}
    </div>
  )
}
