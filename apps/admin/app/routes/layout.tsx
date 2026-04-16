import { Outlet } from "react-router";
import SideBarLayout from "~/components/Layout/layout";

export default function LayoutRoute() {
	return (
		<SideBarLayout>
			<Outlet />
		</SideBarLayout>
	);
}
