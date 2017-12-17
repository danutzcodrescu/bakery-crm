import "jest";
import instace from "../helpers/baseUrl";
import Customer from "../models/customer";
const faker = require("faker");

describe("Customers api", () => {
	test("insert customer", () => {
		const obj = {
			fName: "danut",
			lName: "codrescu",
			address: "Belgium"
		};
		const fName = obj.fName;
		instace.post("customers", obj).then(resp => {
			expect(resp.status).toBe(200);
			expect(resp.data.id).toBeDefined();
			expect(resp.data.fName).toBe(fName);
		});
	});

	test("error on insertion", () => {
		const obj = { fName: "danut" };
		instace
			.post("customers", obj)
			.catch(err => expect(err.response.status).toBe(500));
	});

	test("get all customers", () => {
		instace.get("customers").then(resp => {
			expect(resp.status).toBe(200);
		});
	});

	test("update one", () => {
		const obj = {
			fName: faker.fake(faker.name.firstName()),
			lName: faker.fake(faker.name.lastName())
		};
		instace
			.post("customers", obj)
			.then(resp => {
				const update = Object.assign(
					{ email: faker.fake(faker.internet.email()) },
					resp.data
				);
				return instace.patch("customers/" + resp.data.id, update);
			})
			.then(resp => {
				expect(resp.status).toBe(200);
				expect(resp.data.email).toBeDefined();
			});
	});
});
