import { NavLink } from "react-router";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: React.ReactNode;
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu className="w-full">
					{items.map((item) => (
						<NavLink
							to={item.url}
							key={item.title}
							className={({ isActive }) => (isActive ? "bg-accent" : "hover:bg-accent")}
							prefetch="intent"
						>
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</NavLink>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
