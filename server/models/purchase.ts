import { v4 as uuid } from "uuid";

class Purchase {
	id: string;
	customer_id: string;
	date: Date;
	value: number;

	constructor(customer_id: string, value: number, date: Date) {
		this.id = uuid();
		this.customer_id = customer_id;
		this.date = date ? date : new Date();
		this.value = value;
	}
}

export default Purchase;
