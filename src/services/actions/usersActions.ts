import {
  sendUserDetails,
  sendEmail,
  logIn,
  logOut,
  getUser,
  editUser,
  refreshToken,
  sendNewPassword
} from "../../utils/api";
import { setCookie, deleteCookie } from '../../utils/cookie'
import { setInitialConstructor } from './constructorActions'
import { WS_DELETE_ORDERS } from './wsActions'
import { AppThunk, AppDispatch } from '../../index'
export const REGISTER_USER: 'REGISTER_USER' = 'REGISTER_USER';
export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
export const SIGN_IN: 'SIGN_IN' = 'SIGN_IN';
export const SIGN_OUT: 'SIGN_OUT' = 'SIGN_OUT';
export const SET_USER: 'SET_USER' = 'SET_USER';

interface IRegisterUser {
  readonly type: typeof REGISTER_USER;
  readonly payload: { userName: string, email: string, password: string }
}

interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
  readonly payload: { email: string }
}

interface IAuthenticate {
  readonly type: typeof SIGN_IN;
  readonly payload: { isAuthenticated: boolean }
}

interface ISetUser {
  readonly type: typeof SET_USER;
  readonly payload: { userName: string, email: string, password: string }
}

interface IResetUser {
  readonly type: typeof SIGN_OUT;
  readonly payload: { userName: string, email: string, password: string, isAuthenticated: boolean }
}

export type TUserActions =
  | IRegisterUser
  | IResetPassword
  | IAuthenticate
  | ISetUser
  | IResetUser;


export const resetPassword = (email: string): IResetPassword => {
  return {
    type: RESET_PASSWORD,
    payload: { email },
  };
}

export const authenticate = (isAuthenticated: boolean): IAuthenticate => {
  return {
    type: SIGN_IN,
    payload: { isAuthenticated },
  };
}

export const registerUser = (userName: string, email: string, password: string): IRegisterUser => {
  return {
    type: REGISTER_USER,
    payload: { userName, email, password },
  };
}

export const setUser = (userName: string, email: string, password: string): ISetUser => {
  return {
    type: SET_USER,
    payload: { userName, email, password },
  };
}

export const resetUser = (userName: string, email: string, password: string, isAuthenticated: boolean): IResetUser => {
  return {
    type: SIGN_OUT,
    payload: { userName, email, password, isAuthenticated },
  };
}

export const sendResetEmail: AppThunk = (userEmail: string, redirect: () => void) => {
  return function () {
    sendEmail(userEmail)
      .then(data => {
        if (data.success === true) {
          redirect()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const changePassword: AppThunk = (userPassword: string, code: string) => {
  return function () {
    sendNewPassword(userPassword, code)
      .catch(err => {
        console.log(err)
      })
  }
}

export const registerNewUser: AppThunk = (name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    sendUserDetails(name, email, password)
      .then(data => {
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate(true))
          dispatch(setUser(name, email, password))
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          localStorage.setItem('token', refreshToken)
          setCookie('token', authToken, { path: "/", expires: 1140 });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const signIn: AppThunk = (userEmail: string, userPassword: string) => {
  return function (dispatch: AppDispatch) {
    logIn(userEmail, userPassword)
      .then(data => {
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate(true))
          dispatch(setUser(data.user.name, userEmail, userPassword))
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          setCookie('token', authToken, { path: "/", expires: 1140 });
          localStorage.setItem('token', refreshToken)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const signOut: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    logOut()
      .then(data => {
        if (data.success === true) {
          dispatch(resetUser('', '', '', false))
          dispatch(setInitialConstructor())
          deleteCookie('token');
          localStorage.removeItem('token')
          dispatch({ type: WS_DELETE_ORDERS, payload: [] })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export const getUserDetails: AppThunk = (password: string) => {
  return function (dispatch: AppDispatch) {
    getUser()
      .then(data => {
        if (data.success === true) {
          dispatch(setUser(data.user.name, data.user.email, password))
          dispatch(authenticate(true))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getNewToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    refreshToken()
      .then(data => {
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate(true))
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          localStorage.setItem('token', refreshToken)
          setCookie('token', authToken, { path: "/", expires: 1140 });
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const editUserDetails: AppThunk = (userEmail: string, userPassword: string, userName: string) => {
  return function (dispatch: AppDispatch) {
    editUser(userEmail, userPassword, userName)
      .then(data => {
        if (data.success === true) {
          dispatch(setUser(data.user.name, data.user.email, userPassword))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


