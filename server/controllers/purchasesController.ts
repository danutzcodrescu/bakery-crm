import { Router, Request, Response, NextFunction } from "express";
import Purchase from "../models/purchase";
import CustomerData from "../data/customersData";
import PurchaseData from "../data/purchasesData";

export class PurchasesRouter {
	router: Router;

	constructor() {
		this.router = Router({ mergeParams: true });
	}

	public getAll(req: Request, res: Response, next: NextFunction) {
		const filtered = PurchaseData.reverse().reduce((array, elem) => {
			if (req.query.limit && array.length + 1 > req.query.limit)
				return array;
			if (elem.customer_id === req.params.id) return [...array, elem];
			return array;
		}, []);
		res.json(filtered);
	}

	public insert(req: Request, res: Response, next: NextFunction) {
		const purchase = new Purchase(
			req.params.id,
			req.body.value,
			req.body.date
		);
		PurchaseData.push(purchase);
		res.json(purchase);
	}

	init() {
		this.router.get("/", this.getAll);
		this.router.post("/", this.insert);
	}
}

const purchaseRoute = new PurchasesRouter();
purchaseRoute.init();

export default purchaseRoute.router;
