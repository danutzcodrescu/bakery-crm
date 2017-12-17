import * as React from "react";
import * as ReactDOM from "react-dom";
import Customers from "./customers/cutomers";
import NewCustomer from "./customers/newcustomer";
import ViewCustomer from "./customers/viewcustomer";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
	<Router>
		<div>
			{/* <ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/topics">Topics</Link>
				</li>
			</ul>

			<hr /> */}

			<Route exact path="/" component={Customers} />
			<Route path="/newcustomer" component={NewCustomer} />
			<Route path="/customer/:id" component={ViewCustomer} />
		</div>
	</Router>,
	document.getElementById("root") as HTMLElement
);
