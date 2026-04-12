import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import path from "path";
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, "../../"));
	return {
		plugins: [tailwindcss(), reactRouter()],
		resolve: {
			tsconfigPaths: true,
			alias: {
				"~": path.resolve(__dirname, "./app"),
				// "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
			},
		},
		define: {
			"process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
		},
		server: {},
	};
});
