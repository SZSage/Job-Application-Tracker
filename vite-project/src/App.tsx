import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/register.tsx"

export default function App() {
  return (
    <div className="font-roboto min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-900">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={
            <SidebarProvider>
              <Page />
            </SidebarProvider>
            }/>
          <Route path="/" element={<Navigate to="/register" />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

