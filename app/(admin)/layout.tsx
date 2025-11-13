import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="header-admin container">
        {/* Header bar */}
        <div className="flex-col items-center justify-between mb-4 border-b-2 py-4">
          <div className="">
            <SidebarTrigger className="max-w-3xs" />
          </div>
        </div>

        <div className="">
          {/* <Toaster position="top-right" /> */}
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
