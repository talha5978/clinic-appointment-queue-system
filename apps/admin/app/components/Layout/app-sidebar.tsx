import * as React from "react";
import { NavMain } from "~/components/Layout/nav-main";
import { NavUser } from "~/components/Layout/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";
import {
	ChartBarIcon,
	UsersIcon,
	CommandIcon,
	LayoutPanelLeft,
	Calendar,
	Settings,
	Stethoscope,
} from "lucide-react";

const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Operations",
			url: "/",
			icon: <LayoutPanelLeft />,
		},
		{
			title: "Patient Queue",
			url: "/patient-queue",
			icon: <UsersIcon />,
		},
		{
			title: "Analytics",
			url: "/analytics",
			icon: <ChartBarIcon />,
		},
		{
			title: "Appointments",
			url: "/appointments",
			icon: <Calendar />,
		},
		{
			title: "Doctors",
			url: "/doctors",
			icon: <Stethoscope />,
		},
		{
			title: "Patients",
			url: "/patients",
			icon: <UsersIcon />,
		},
		{
			title: "Settings",
			url: "/settings",
			icon: <Settings />,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="data-[slot=sidebar-menu-button]:p-1.5!"
							render={<a href="#" />}
						>
							<CommandIcon className="size-5!" />
							<span className="text-base font-semibold">Expert Care</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
