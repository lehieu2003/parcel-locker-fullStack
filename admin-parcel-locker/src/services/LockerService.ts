import { Locker, Cell } from "../models/locker.ts";
import { Size } from "../models/parcel.ts";
import { getCookie } from "../utilities/cookies.ts";
import request from "../utilities/request.ts";
const token = getCookie('_auth');

const get = (locker_id: number, order_id: number = -1) => {
  const url = order_id === -1 ? `/v1/locker/${locker_id}` : `/v1/locker/${locker_id}/${order_id}`;
  return request<Locker>({
    url: url,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });
}


const getPaging = async (page: number, perPage: number): Promise<{
  total_pages: number;
  data: Locker[];
}> => {
  const url = `/v1/lockers`;
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
  return response as { total_pages: number; data: Locker[] };
};
//huu hoai la mot con cho vi no de toi sua het cai dong nay
const put = (id: number, cell: Partial<Cell>) => {
  return request({
    url: `/v1/locker/${id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      size: cell.size,
    }
  });
}

const post = (locker: {
  address: string,
  latitude: number,
  longitude: number,
  cells: [
    {
      size: Size,
      quantity: number,
    }]

}) => {
  return request<number>({
    url: "/v1/lockers/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      address: locker.address,
      latitude: locker.latitude,
      longitude: locker.longitude,
      cells: [{
        size: 'S',
        quantity: 1,
      }]
    }
  });
}

const postCell = (locker_id: number, cell_size: Size, quantity: number) => {
  return request<string>({
    url: `/v1/lockers/${locker_id}/cells`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      size: cell_size.toString(),
      quantity: quantity,
    }
  });
}

const LockerService = {
  get,
  getPaging,
  post,
  postCell,
  put
};

export default LockerService;