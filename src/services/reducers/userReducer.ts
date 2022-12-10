import {
    RESET_PASSWORD,
    REGISTER_USER,
    SIGN_OUT,
    SIGN_IN,
    SET_USER,
    TUserActions
} from '../actions/usersActions'

export type TUserState = {
    userName: string,
    email: string,
    password: string,
    isAuthenticated: boolean,
}


const initialState: TUserState = {
    userName: '',
    email: '',
    password: '',
    isAuthenticated: false,
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {

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
                email: action.payload.email
            }
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated
            }
        case SIGN_OUT:
            return {
                userName: '',
                email: '',
                password: '',
                isAuthenticated: action.payload.isAuthenticated
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