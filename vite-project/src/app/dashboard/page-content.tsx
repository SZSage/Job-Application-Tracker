import Dashboard from "@/features/dashboard";
import Applications from "@/features/applications";
import Settings from "@/features/settings";

export function PageContent({ activePage }: { activePage: string }) {
  return (
    <div className="mx-auto max-w-[90%]">
      {activePage === "Dashboard" && <Dashboard />}
      {activePage === "Job Applications" && <Applications />}
      {activePage === "Settings" && <Settings />}
    </div>
  )
}
