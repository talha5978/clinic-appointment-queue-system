import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
	return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}

export const loader = () => {
	console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);

	return null;
};

export default function Home() {
	return <Welcome />;
}
