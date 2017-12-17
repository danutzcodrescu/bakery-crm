import * as React from "react";
import instance from "../helpers/axiosInstance";
import "./customers.css";
import CustomerModel from "../models/customerModel";
import { Link } from "react-router-dom";
import { format } from "date-fns";

type CustomerState = {
	loading: boolean;
	customers: CustomerModel[];
};

class Customers extends React.Component<any, CustomerState> {
	state = {
		loading: true,
		customers: []
	};
	componentDidMount() {
		instance
			.get("customers")
			.then(resp =>
				this.setState({ customers: resp.data, loading: false })
			)
			.catch(err => alert("error"));
	}
	render() {
		const customers = this.state.customers.map(
			(elem: CustomerModel, index: number) => (
				<li key={elem.id} className="customer">
					<p>{index + 1}.</p>
					<p>
						Name: {elem.fName} {elem.lName}
					</p>
					{elem.address && <p>Address: {elem.address}</p>}
					{elem.email && <p>Email: {elem.email}</p>}
					{elem.lastPurchase && (
						<p>
							Last purchase:{" "}
							{format(elem.lastPurchase, "DD/MM/YYYY")}
						</p>
					)}
					<p>
						<Link to={`/customer/${elem.id}`}>Edit</Link>
					</p>
				</li>
			)
		);
		return (
			<div className="container">
				{this.state.loading && <span>Loading</span>}
				{!this.state.loading && (
					<div>
						<Link to="/newcustomer">New customer </Link>
						<ul>{customers}</ul>
					</div>
				)}
			</div>
		);
	}
}

export default Customers;
