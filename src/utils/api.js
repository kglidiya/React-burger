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


export function sendOrder(ingredientsId) {
  return fetch(ORDERS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    body: JSON.stringify({ ingredients: ingredientsId })
  })
}

export function sendEmail(userEmail) {
  return fetch(PASSWORD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ email: userEmail })
  })
}

export function sendNewPassword(UserPassword, code) {
  return fetch(PASSWORD_RESET_API, {
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
  return fetch(REGISTER_API, {
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
  return fetch(LOGIN_API, {
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
  return fetch(USER_API, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('token')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}


export function editUser(userEmail, userPassword, userName) {
  return fetch(USER_API, {
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
  return fetch(TOKEN_API, {
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
  return fetch(LOGOUT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'token': localStorage.getItem('token'),
    })
  })

}

  // console.log('Bearer ' + getCookie('token'))
//console.log(getCookie('token'))
//console.log(localStorage.token)
//{"success":false,"message":"jwt expired"}