import { Parcel } from "./parcel";

export interface senderInformation {
	name: string;
	phone: string;
	address: string;
}
export interface sendingAddress {
	addressName: string;
	longtitude: number;
	latitude: number;	
}

export interface receivingAddress {
	addressName: string;
	longtitude: number;
	latitude: number;	
}

export enum OrderStatus {
	Packaging = "Packaging",
	Ongoing = "Ongoing",
	Waiting = "Waiting",
	Delivered = "Delivered",
	Completed = "Completed"
}
export interface Order {
	sending_address: sendingAddress;
	receiving_address: receivingAddress;
	ordering_date: string;
	sending_date: string | null;
	receiving_date: string | null;
	order_status: OrderStatus; 
	order_id: number;
	sender_id: number;
	sender_information: senderInformation;
	recipient_id: number;
	parcel: Parcel;
}


  