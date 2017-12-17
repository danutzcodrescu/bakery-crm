import * as express from "express";
import { Application } from "express";
import * as http from "http";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import customersRoute from "./controllers/customersController";
import purchasesRoute from "./controllers/purchasesController";

const app: Application = express();

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cors

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PATCH, POST, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/api/customers", customersRoute);
app.use("/api/customers/:id/purchases", purchasesRoute);

const httpServer = app.listen(3001, () => {
	console.log(
		"HTTP Server running at https://localhost:" + httpServer.address().port
	);
});
