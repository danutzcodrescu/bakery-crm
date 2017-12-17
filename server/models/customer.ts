import { v4 as uuid } from "uuid";
class Customer {
	id: string;
	fName: string;
	lName: string;
	address: string;
	email: string;

	constructor(fName: string, lName: string, address: string, email: string) {
		this.id = uuid();
		this.fName = fName;
		this.lName = lName;
		this.address = address;
		this.email = email;
	}

	update(updates) {
		for (const arg in updates) {
			if (arg === "id") continue;
			if (updates[arg] !== this[arg]) this[arg] = updates[arg];
		}
	}
}

export default Customer;
