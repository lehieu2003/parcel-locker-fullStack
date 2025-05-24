import { User, Token, Credential } from "../models/user.ts";
import request from "../utilities/request.ts";
import { getCookie } from "../utilities/cookies.ts";
const token = getCookie('_auth');
const login = (creds: Credential) => {
  const data = new URLSearchParams();
  data.append('grant_type', '');
  data.append('username', creds.username);
  data.append('password', creds.password);
  data.append('scope', '');
  data.append('client_id', '');
  data.append('client_secret', '');
  return request<Token>({
    url: "/v1/auth/token",
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    data: data
  });
};

const createUser = (user: Partial<User>) => {
  return request<User>({
    url: "/v1/account",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      email: user.email,
      username: user.username,
      password: user.password,
      name: user.name,
      phone: user.phone,
      address: user.address,
      age: user.age,
      role: user.role?.name
    }
  });
};

const get = (id: number) => {
  return request<User>({
    url: `/v1/profile/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });
}

const getUserDetails = (token: string) => {
  return request<User>({
    url: `/v1/account/me`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
  });
}

const getUserPage = (page: number, perPage: number) => {
  return request<any>({
    url: `/v1/account/?page=${page}&per_page=${perPage}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};



const put = (id: number, data: Partial<User>) => {
  return request<User>({
    url: `/v1/profile/${id}/update_profile`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    },
    data: {
      "email": data.email,
      "name": data.name,
      "username": data.username,
      "phone": data.phone,
      "address": data.address,
      "gender": data.gender,
      "age": data.age,
      "role": data.role ? {
        "role_id": data.role.role_id,
        "name": data.role.name
      } : undefined
    }
  });
}

const UserService = {
  createUser,
  login,
  getUserDetails,
  get,
  getUserPage,
  put
};

export default UserService;


