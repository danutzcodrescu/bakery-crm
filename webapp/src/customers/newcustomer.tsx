import * as React from "react";
import instance from "../helpers/axiosInstance";
import { Link } from "react-router-dom";
import "./customers.css";

class NewCustomer extends React.Component {
	newCustomer = e => {
		e.preventDefault();
		const customer = {
			fName: e.target.fName.value,
			lName: e.target.lName.value,
			address: e.target.address.value,
			email: e.target.email.value
		};
		instance
			.post("customers", customer)
			.then(resp => console.log(resp))
			.catch(err => alert("insert failed"));
	};

	render() {
		return (
			<form onSubmit={this.newCustomer}>
				<label htmlFor="fName">
					First name:
					<input
						id="fName"
						type="text"
						name="fName"
						placeholder="First name"
						required
					/>
				</label>
				<label htmlFor="lName">
					Last name:
					<input
						id="lName"
						type="text"
						name="lName"
						placeholder="Last name"
						required
					/>
				</label>
				<label htmlFor="address">
					Address:
					<input
						id="address"
						type="text"
						name="address"
						placeholder="Address"
					/>
				</label>
				<label htmlFor="email">
					Email:
					<input
						id="email"
						type="email"
						name="email"
						placeholder="Email"
					/>
				</label>

				<button type="submit">Create new customer</button>
				<Link to="/">Back</Link>
			</form>
		);
	}
}

export default NewCustomer;
