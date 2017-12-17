import { Router, Request, Response, NextFunction } from "express";
import Customer from "../models/customer";
import CustomerData from "../data/customersData";
import PurchaseData from "../data/purchasesData";

export class CustomersRouter {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public getAll(req: Request, res: Response, next: NextFunction) {
		const customers = CustomerData.map(customer => {
			const lastPurchase = PurchaseData.reverse().find(
				elem => elem.customer_id === customer.id
			);
			if (lastPurchase) {
				customer.lastPurchase = lastPurchase.date;
			}

			return customer;
		});
		res.json(customers);
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
		let lastYearDate = new Date();
		lastYearDate.setFullYear(lastYearDate.getFullYear() - 1);
		CustomerData[index].totalAmount = PurchaseData.reduce((sum, acc) => {
			if (
				acc.customer_id === req.params.id &&
				acc.date.getTime() >= lastYearDate.getTime()
			)
				return (sum += acc.value);
			return sum;
		}, 0);
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
