import { Router, Request, Response, NextFunction } from "express";
import Customer from "../models/customer";
import CustomerData from "../data/customersData";

export class CustomersRouter {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public getAll(req: Request, res: Response, next: NextFunction) {
		res.json(CustomerData);
	}

	public insert(req: Request, res: Response, next: NextFunction) {
		if (!req.body.fName || !req.body.lName)
			throw new Error("No name defined");
		const customer = new Customer(
			req.body.fName,
			req.body.lName,
			req.body.address,
			req.body.email
		);
		CustomerData.push(customer);
		res.json(customer);
	}
	public updateOne(req: Request, res: Response, next: NextFunction) {
		const index = CustomerData.findIndex(elem => elem.id === req.params.id);
		CustomerData[index].update(req.body);
		res.json(CustomerData[index]);
	}

	public getOne(req: Request, res: Response, next: NextFunction) {
		const index = CustomerData.findIndex(elem => elem.id === req.params.id);
		res.json(CustomerData[index]);
	}

	init() {
		this.router.get("/", this.getAll);
		this.router.post("/", this.insert);
		this.router.patch("/:id", this.updateOne);
		this.router.get("/:id", this.getOne);
	}
}

const customersRoute = new CustomersRouter();
customersRoute.init();

export default customersRoute.router;
