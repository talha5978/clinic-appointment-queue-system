import type { ReactNode } from "react";
import { AppSidebar } from "~/components/Layout/app-sidebar";
import { SiteHeader } from "~/components/Layout/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export default function SideBarLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 70)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="sidebar" />
			<SidebarInset>
				<SiteHeader />
				<section className="flex flex-1 flex-col @container/main p-4">{children}</section>
			</SidebarInset>
		</SidebarProvider>
	);
}
