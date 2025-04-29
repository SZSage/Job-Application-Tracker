import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/register.tsx"
import Login from "./pages/login.tsx"

export default function App() {
  return (
    <div className="font-roboto min-h-screen h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={
            <SidebarProvider>
              <Page />
            </SidebarProvider>
            }/>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

