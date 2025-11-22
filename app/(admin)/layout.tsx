import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getShopSettings } from "@/lib/database/setting";
export const revalidate = 60;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const setting = await getShopSettings()
  return (
    <SidebarProvider>
      <AppSidebar logo={setting?.logo ?? ""} />

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
