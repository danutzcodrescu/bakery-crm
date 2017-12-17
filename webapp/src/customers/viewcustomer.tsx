import * as React from "react";
import "./customers.css";
import instance from "../helpers/axiosInstance";
import CustomerModel from "../models/customerModel";
import PurchaseModel from "../models/purchaseModel";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type ViewCustomerState = {
	customer: CustomerModel;
	purchases: PurchaseModel[];
	limit: number;
	edit: boolean;
};

class ViewCustomer extends React.Component<any, ViewCustomerState> {
	private form: HTMLFormElement | null;
	constructor(props) {
		super(props);
		this.state = {
			limit: 10,
			purchases: [],
			customer: { id: "initialValue", fName: "test", lName: "test" },
			edit: false
		};
	}
	componentDidMount() {
		this.retrieveData();
	}

	retrieveData() {
		const customer = instance.get(
			`customers/${this.props.match.params.id}`
		);
		const purchases = instance.get(
			`customers/${this.props.match.params.id}/purchases`,
			{ params: { limit: 10 } }
		);
		Promise.all([customer, purchases])
			.then(resp => {
				this.setState({
					...this.state,
					customer: resp[0].data,
					purchases: resp[1].data
				});
			})
			.catch(err => alert("error in retrieving"));
	}

	newPurchase = e => {
		e.preventDefault();
		instance
			.post(`customers/${this.props.match.params.id}/purchases`, {
				value: parseFloat(e.target.value.value),
				date: e.target.date.value
			})
			.then(resp => {
				this.retrieveData();
				if (this.form) this.form.reset();
			})
			.catch(err => console.log(err));
	};

	editCustomer = e => {
		e.preventDefault();
		const customer = {
			id: this.state.customer.id,
			fName: e.target.fName.value,
			lName: e.target.lName.value,
			email: e.target.email.value,
			address: e.target.address.value
		};
		instance
			.patch(`customers/${this.props.match.params.id}`, customer)
			.then(resp =>
				this.setState({
					customer: resp.data,
					edit: false
				})
			)
			.catch(err => alert("update failed"));
	};

	render() {
		return (
			<div>
				{this.state.customer.id == "initialValue" && "Loading"}
				{!this.state.edit &&
					this.state.customer.id !== "initialValue" && (
						<div className="container">
							<p>
								Name: {this.state.customer.fName}{" "}
								{this.state.customer.lName}
							</p>
							{this.state.customer.address && (
								<p>Address: {this.state.customer.address}</p>
							)}
							{this.state.customer.email && (
								<p>Email: {this.state.customer.email}</p>
							)}
							<p>
								Spent amount during the past year:{" "}
								{this.state.customer.totalAmount}
							</p>
							<br />
							<button
								onClick={() => this.setState({ edit: true })}
							>
								Edit customer data
							</button>
							<br />
							<form onSubmit={this.newPurchase}>
								<label htmlFor="value">
									Value:
									<input
										type="number"
										name="value"
										id="value"
										required
									/>
								</label>
								<label htmlFor="date">
									Date:
									<input type="date" name="date" id="date" />
								</label>
								<button type="submit">New purchase</button>
							</form>
							<br />
							{this.state.purchases.length > 0 && (
								<ol>
									{this.state.purchases.map(
										(
											elem: PurchaseModel,
											index: number
										) => (
											<li
												key={elem.id}
												className="customer"
											>
												<p>{index + 1}.</p>
												<p>
													Date:{" "}
													{format(
														elem.date,
														"DD/MM/YYYY"
													)}
												</p>
												<p>Value: {elem.value}</p>
											</li>
										)
									)}
								</ol>
							)}
							<button>
								<Link to="/">Back to customers overview</Link>
							</button>
						</div>
					)}
				{this.state.edit && (
					<form
						onSubmit={this.editCustomer}
						ref={form => (this.form = form)}
					>
						<label htmlFor="fName">
							First name:
							<input
								id="fName"
								type="text"
								name="fName"
								placeholder="First name"
								defaultValue={this.state.customer.fName}
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
								defaultValue={this.state.customer.lName}
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
								defaultValue={this.state.customer.address}
							/>
						</label>
						<label htmlFor="email">
							Email:
							<input
								id="email"
								type="email"
								name="email"
								placeholder="Email"
								defaultValue={this.state.customer.email}
							/>
						</label>

						<button type="submit">Update customer data</button>
						<button onClick={() => this.setState({ edit: false })}>
							Cancel
						</button>
					</form>
				)}
			</div>
		);
	}
}

export default ViewCustomer;
