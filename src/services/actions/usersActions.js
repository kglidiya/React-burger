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
import { setCookie } from '../../utils/cookie.js'
import { setInitialConstructor } from '../../services/actions/constructorActions'

export const REGISTER_USER = 'REGISTER_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_USER = 'SET_USER';



export function resetPassword(value) {
  return {
    type: RESET_PASSWORD,
    payload: value,
  };
}

export function authenticate(isAuthenticated) {
  return {
    type: SIGN_IN,
    payload: { isAuthenticated },
  };
}

export function registerUser(userName, email, password) {
  return {
    type: REGISTER_USER,
    payload: { userName, email, password },
  };
}

export function setUser(userName, email, password) {
  return {
    type: SET_USER,
    payload: { userName, email, password },
  };
}

export function resetUser(userName, email, password, isAuthenticated) {
  return {
    type: SIGN_OUT,
    payload: { userName, email, password, isAuthenticated },
  };
}

export function sendResetEmail(userEmail, redirect) {
  return function (dispatch) {
    sendEmail(userEmail)
      .then(data => {
       // console.log(data)
        if (data.success === true) {
          redirect()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function changePassword(UserPassword, code) {
  return function (dispatch) {
    sendNewPassword(UserPassword, code)
      // .then(data => {
      //   console.log(data)
      // })
      .catch(err => {
        console.log(err)
      })
  }
}

export function registerNewUser(name, email, password) {
  return function (dispatch) {
    sendUserDetails(name, email, password)
      .then(data => {
       // console.log(data)
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate())
          dispatch(setUser(name, email, password))
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          setCookie('token', authToken);
          localStorage.setItem('token', refreshToken)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function signIn(userEmail, userPassword) {
  return function (dispatch) {
    logIn(userEmail, userPassword)
      .then(data => {
       // console.log(data)
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate())
          dispatch(setUser(data.user.name, userEmail, userPassword))
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          setCookie('token', authToken);
          localStorage.setItem('token', refreshToken)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function signOut() {
  return function (dispatch) {
    logOut()
      .then(data => {
       // console.log(data)
        if (data.success === true) {
          setCookie('token', '');
          dispatch(resetUser())
          dispatch(setInitialConstructor())
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export function getUserDetails(password) {
  return function (dispatch) {
    getUser()
      .then(data => {
       // console.log(data)
        if (data.success === true) {
          dispatch(setUser(data.user.name, data.user.email, password))
          dispatch(authenticate())
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getNewToken() {
  return function (dispatch) {
    refreshToken()
      .then(data => {
       // console.log(data)
        let authToken;
        let refreshToken;
        if (data.success === true) {
          dispatch(authenticate())
          authToken = data.accessToken.split('Bearer ')[1]
          refreshToken = data.refreshToken
          setCookie('token', authToken);
          localStorage.setItem('token', refreshToken)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function editUserDetails(userEmail, userPassword, userName) {
  return function (dispatch) {
    editUser(userEmail, userPassword, userName)
      .then(data => {
       //console.log(data)
        if (data.success === true) {
          dispatch(setUser(data.user.name, data.user.email, userPassword))
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}


