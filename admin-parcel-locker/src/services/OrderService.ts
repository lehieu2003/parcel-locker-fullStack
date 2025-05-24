import { Order } from "../models/order.ts";
import { getCookie } from "../utilities/cookies.ts";
import request from "../utilities/request.ts";
const token = getCookie("_auth");

const CreateOrder = (order: Order) => {
	return request({
		url: "/v1/order/",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
		data: JSON.stringify(order),
	});
};

const getOrderPage = async (page: number, perPage: number): Promise<{
	total_pages: number;
	data: Order[];
  }> => {
	const url = `/v1/order/`;
	const [response, error] = await request({
	  url: url,
	  method: "GET",
	  headers: {
		"content-type": "application/json",
		Authorization: `Bearer ${token}`,
		Accept: "application/json",
	  },
	  params: {
		page: page,
		per_page: perPage,
	  },
	});
	if (error) {
	  throw error;
	}
	return response as { total_pages: number; data: Order[] };
};
  

const getOrder = (order_id: string) => {
	const url = `/v1/order/${order_id}`;
	return request<any>({
		url: url,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
	});
};



const OrderService = {
	CreateOrder,
	getOrderPage,
	getOrder,
};

export default OrderService;
