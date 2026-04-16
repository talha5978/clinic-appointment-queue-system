import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
	layout("routes/layout.tsx", [index("routes/home.tsx"), route("doctors", "routes/Doctors/doctors.tsx")]),
] satisfies RouteConfig;
