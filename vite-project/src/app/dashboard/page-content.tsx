import Dashboard from "@/features/dashboard";
import Applications from "@/features/applications";
import Settings from "@/features/settings";

export function PageContent({ activePage }: { activePage: string }) {
  switch (activePage) {
    case "Dashboard":
      return <Dashboard />
    case "Job Applications":
      return <Applications />
    case "Settings":
      return <Settings />
  }
}
