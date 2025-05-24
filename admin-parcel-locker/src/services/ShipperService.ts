import { Shipper } from "../models/shipper.ts";
import request from "../utilities/request.ts";
import { getCookie } from "../utilities/cookies.ts";
const token = getCookie('_auth');




const get = (id: number) => {
  return request<Shipper>({
    url: `/v1/profile/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });
}

const getShipperDetails = (token: string) => {
  return request<Shipper>({
    url: `/v1/account/me`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });
}

const getShipperPage = (page: number, perPage: number) => {
  return request<any>({
    url: `/v1/shipper/?page=${page}&per_page=${perPage}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};



const put = (id: number, data: Partial<Shipper>) => {
  return request<Shipper>({
    url: `/v1/profile/${id}/update_profile`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      'shipper_id': data.shipper_id,
      'name': data.name,
      'gender': data.gender,
      'age': data.age,
      'phone': data.phone,
      'address': data.address,
    }
  });
}
const createShipper = (data: { username: string; email: string; password: string; confirm_password: string; role: number }) => {
  return request<Shipper>({
    url: `/v1/shipper/create`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      role: 2
    }
  });
}
const ShipperService = {
  createShipper,
  getShipperDetails,
  get,
  getShipperPage,
  put
};

export default ShipperService;


