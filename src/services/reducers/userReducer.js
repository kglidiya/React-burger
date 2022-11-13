import {
    RESET_PASSWORD,
    REGISTER_USER,
    SIGN_OUT,
    SIGN_IN,
    SET_USER,
} from '../actions/usersActions.js'

const initialState = {
    userName: '',
    email: '',
    password: '',
    isAuthenticated: false,
}

export const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case REGISTER_USER:
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.email,
                password: action.payload.password,
            }
        case RESET_PASSWORD:
            return {
                ...state,
                email: action.payload
            }
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true
            }
        case SIGN_OUT:
            return {
                ...state,
                userName: '',
                email: '',
                password: '',
                isAuthenticated: false
            }
        case SET_USER:
            return {
                ...state,
                userName: action.payload.userName,
                email: action.payload.email,
                password: action.payload.password,
            }
        default:
            return state;
    }
}