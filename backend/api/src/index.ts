import { app } from "./server";
import dotenv from "dotenv";

dotenv.config({
	path: "../../../.env",
	quiet: true,
});

const startServer = () => {
	const port = process.env.BACKEND_PORT || 3000;

	app.listen({ port: Number(port), host: "0.0.0.0" }, (err, address) => {
		if (err) {
			app.log.error(err);
			process.exit(1);
		}

		console.log(`Server running at ${address}`);
		console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
	});
};

startServer();
