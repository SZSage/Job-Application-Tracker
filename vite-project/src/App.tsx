import { useEffect, useState } from "react";
import { ApplicationsList } from "./features/jobs/JobList";
import { AppSidebar } from "@/components/app-sidebar";
import Layout from "@/app/layout"
import { SidebarHeader, SidebarTrigger, } from "@/components/ui/sidebar"
import Page from "@/app/dashboard/page";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider"



interface User {
  userId: string;
  email: string;
  createdAt: string;
}

const UserList = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/users/all")
    .then((response) => response.json())
    .then((data) => {
        setUsers(data);
        setLoading(false);

      })
      .catch((error) => console.error("Error fetching users: ", error));
  }, []); // empty dependency array, means the effect only runs once when the component mounts

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-2xl p-2 bg-gray-600 rounded-xl ">
      <h2>User List</h2>
      <ul>
        {users.map((users) => (
          <li key={users.userId}>
            {users.userId} -- {users.email} -- {users.createdAt}
          </li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
      <Page />
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
