import { Parcel } from "../models/parcel";
import { getCookie } from "../utilities/cookies";
import request from "../utilities/request";
const token = getCookie('_auth');
const post = (parcel: Partial<Parcel> & {order_id: number}) => {
  return request({
    url: "/v1/parcel/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      order_id: parcel.order_id,
      width: parcel.width,
      length: parcel.length,
      height: parcel.height,
      weight: parcel.weight,
      size: parcel.parcel_size
    }
  })
};

const get = (parcel_id: number) => {
  return request<Parcel>({
    url: `/v1/parcel/${parcel_id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  })
};

const getAll = (page: number, perPage: number) => {
	return request<Parcel>({
		url: `/v1/parcel/`,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			Accept: "application/json",
		},
    params: {
      'page': page,
      'per_page': perPage
    }
	});
};

const put = (parcel: Partial<Parcel> & {order_id: number}) => {
  return request<Parcel>({
    url: `/v1/parcel/${parcel.parcel_id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      order_id: parcel.order_id,
      width: parcel.width,
      length: parcel.length,
      height: parcel.height,
      weight: parcel.weight,
      size: parcel.parcel_size
    }
  })
};

const deleteMethod = (parcel_id: number) => {
  return request({
    url: `/v1/parcel/${parcel_id}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  })
}

const postType = (name: string) => {
  return request({
    url: "/v1/parcel/type",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      name: name
    }
  })
};

export const ParcelService = {
  post,
  get,
  getAll,
  put,
  delete: deleteMethod,
  postType
}