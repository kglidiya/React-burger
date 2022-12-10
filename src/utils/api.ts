import { getCookie } from './cookie'
export const BASE_API_URL = 'https://norma.nomoreparties.space/api';
export const ORDERS_API = `${BASE_API_URL}/orders`;
export const INGEDIENTS_API = `${BASE_API_URL}/ingredients`;
export const PASSWORD_API = `${BASE_API_URL}/password-reset`;
export const PASSWORD_RESET_API = `${BASE_API_URL}/password-reset/reset`;
export const AUTH_API = `${BASE_API_URL}/auth`;
export const LOGIN_API = `${AUTH_API}/login`;
export const REGISTER_API = `${AUTH_API}/register`;
export const LOGOUT_API = `${AUTH_API}/logout`;
export const TOKEN_API = `${AUTH_API}/token`;
export const USER_API = `${AUTH_API}/user`;

type THeaders = {
  'Content-Type': string,
  Authorization?: string
}

type TOptions = {
  method: string;
  headers: THeaders;
  body?: string
};

type TRes = {
  body: ReadableStream<Uint8Array> | null
  bodyUsed: boolean,
  headers: Headers,
  ok: boolean,
  redirected: boolean,
  status: number,
  statusText: string,
  type: ResponseType;
  url: string,
  json: () => Promise<any> | undefined;
}


function checkResponse(res: TRes) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status);
}


function request(url: string, options: TOptions) {
  return fetch(url, options).then(checkResponse)
}


export function getItems() {
  return request(INGEDIENTS_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export function sendOrder(ingredientsId: string[]) {
  return request(ORDERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  })
}

export function sendEmail(userEmail: string) {
  return request(PASSWORD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: userEmail })
  })
}

export function sendNewPassword(UserPassword: string, code: string) {
  return request(PASSWORD_RESET_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      password: UserPassword,
      'token': code
    })
  })
}

export function sendUserDetails(userEmail: string, userPassword: string, userName: string) {
  return request(REGISTER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      'email': userEmail,
      'password': userPassword,
      'name': userName
    })
  })
}


export function logIn(userEmail: string, userPassword: string) {
  return request(LOGIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      'email': userEmail,
      'password': userPassword,
    })
  })
}


export function getUser() {
  return request(USER_API, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
  })
}


export function editUser(userEmail: string, userPassword: string, userName: string) {
  return request(USER_API, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({
      'email': userEmail,
      "password": userPassword,
      'name': userName,
    })
  })
}


export function refreshToken() {
  return request(TOKEN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.getItem('token'),
    })
  })
}


export function logOut() {
  return request(LOGOUT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.getItem('token'),
    })
  })

}

