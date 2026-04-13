const schema = {
	type: "object",
	required: ["DATABASE_URL", "NODE_ENV", "BACKEND_PORT"],
	properties: {
		DATABASE_URL: { type: "string" },
		BACKEND_PORT: { type: "number", default: 3000 },
		NODE_ENV: { type: "string", default: "development" },
	},
};

export const options = (path: any, __dirname: string) => {
	return {
		confKey: "config",
		schema: schema,
		dotenv: {
			path: path.resolve(__dirname, "../../../.env"),
			debug: true,
		},
	};
};
