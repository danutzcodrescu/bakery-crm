type Customer = {
	id: string;
	fName: string;
	lName: string;
	address?: string;
	email?: string;
	lastPurchase?: Date;
	totalAmount?: number;
};

export default Customer;
