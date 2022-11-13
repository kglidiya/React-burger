import { getCookie } from '../utils/cookie'
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

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status);
}

function request(url, options) {
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

export function sendOrder(ingredientsId) {
  return request(ORDERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  })
}

export function sendEmail(userEmail) {
  return request(PASSWORD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: userEmail })
  })
}

export function sendNewPassword(UserPassword, code) {
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

export function sendUserDetails(userEmail, userPassword, userName) {
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


export function logIn(userEmail, userPassword) {
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


export function editUser(userEmail, userPassword, userName) {
  return request(USER_API, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
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

