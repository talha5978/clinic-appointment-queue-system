import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(__dirname, "../../.env"), "");
	console.log(env);
	process.loadEnvFile(path.resolve(__dirname, "../../.env"));

	return {
		plugins: [
			tailwindcss(),
			reactRouter(),
			viteCompression({
				verbose: true,
				disable: false,
				algorithm: "brotliCompress",
				ext: ".br",
			}),
		],
		resolve: {
			tsconfigPaths: true,
			alias: {
				"~": path.resolve(__dirname, "./app"),
				"@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
			},
		},
		optimizeDeps: {
			include: ["@tabler/icons-react", "lucide-react"],
		},
		define: {
			"process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
			"process.env.VITE_ENV": JSON.stringify(env.VITE_ENV),
		},
		server: {
			port: 5174,
		},
	};
});
