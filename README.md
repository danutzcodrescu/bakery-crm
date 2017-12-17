### Prerequisites

There are two global dependencies needed in order to run the server-side code: typescript and ts-node;.

Make sure to have these dependencies installed by running:

```
	npm i -g typescript ts-node
```

### Backend api

The backend api is found inside the server folder.
In order to run the backend code make sure to `cd server`, run `npm install` and then run `npm run dev`.

The server will run on port **3001**.

In order to run the tests simply run `npm test`. If you would like to run a single test case you can run the following command `npm test -- -u -t="name of the test"`

Test cases scenarios:

* insert customer
* fail insert customer if certain parameters are not provided
* retrieve all customers
* create and update one customer
* create a customer and insert a purchase
* create a customer and insert multiple purchases in order to test the limit functionality

### Frontend app

The frontend application is found inside the webapp folder.
In order to run the webapp `cd webapp`, run `` npm install` and then ``npm start```. Your default browser will open a new tab on **http://localhost:3000**

There are no tests for the frontend app.
