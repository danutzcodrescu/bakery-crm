import "jest";
import instace from "../helpers/baseUrl";
const faker = require("faker");
const times = require("lodash/times");

describe("Purchases api", () => {
	test("insert purchase", () => {
		let id;
		const obj = {
			fName: "danut",
			lName: "invoice",
			address: "Belgium"
		};
		instace
			.post("customers", obj)
			.then(resp => {
				id = resp.data.id;

				return instace.post(`customers/${id}/purchases`, {
					value: Math.random() * 100
				});
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				expect(resp.data.customer_id).toBe(id);
			});
	});

	test("retrive multiple purchases", () => {
		let id;
		const limit = 10;
		const obj = { fName: "danut", lName: "invoices", address: "Belgium" };
		instace
			.post("customers", obj)
			.then(resp => {
				id = resp.data.id;
				return Promise.all(
					times(limit + 1, () =>
						instace.post(`customers/${id}/purchases`, {
							value: Math.random() * 100
						})
					)
				);
			})
			.then(resp => {
				return instace.get(`customers/${id}/purchases`, {
					params: {
						limit
					}
				});
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				expect(resp.data.length).toBe(limit);
			});
	});
});
