import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import { Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/register.tsx"
import Login from "./pages/login.tsx"

export default function App() {
  return (
    <div className="kont-roboto min-h-screen h-full">
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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

