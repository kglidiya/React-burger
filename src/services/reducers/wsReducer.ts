import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DELETE_ORDERS,
  TWsActions
} from '../actions/wsActions';
import { IWsResponse } from '../../utils/types';


export type TWsState = {
  wsConnected: boolean,
  orders: IWsResponse,
  error: undefined | {}
}

const initialState: TWsState = {
  wsConnected: false,
  orders: {} as IWsResponse,
  error: undefined
};


export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload
      };

    case WS_SEND_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload
      };

    case WS_DELETE_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: { ...state.orders, orders: action.payload }
      };

    default:
      return state;
  }
}; 