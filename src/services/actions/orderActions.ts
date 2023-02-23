import {
  sendOrder
} from "../../utils/api";
import { setInitialConstructor } from './constructorActions';
import { IOrder } from "../../utils/types";
import { AppThunk, AppDispatch } from '../../index'
import { Dispatch, SetStateAction } from 'react';
export const SET_ORDER_DETAILS: 'SET_ORDER_DETAILS' = 'SET_ORDER_DETAILS';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';
export const SET_CURRENT_ORDER: 'SET_CURRENT_ORDER' = 'SET_CURRENT_ORDER';
export const DELETE_CURRENT_ORDER: 'DELETE_CURRENT_ORDER' = 'DELETE_CURRENT_ORDER';

interface ISetOrderDetails {
  readonly type: typeof SET_ORDER_DETAILS;
  readonly payload: { items: string[] }
}

interface ISetCurrentOrder {
  readonly type: typeof SET_CURRENT_ORDER;
  readonly payload: { order: IOrder }
}

interface IDeleteCurrentOrder {
  readonly type: typeof DELETE_CURRENT_ORDER;
  readonly payload: {}
}

interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: { orderNumber: number }
}

interface IGetOrderError {
  readonly type: typeof GET_ORDER_ERROR;
}

export type TOrderActions =
  | ISetOrderDetails
  | ISetCurrentOrder
  | IDeleteCurrentOrder
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError;


export const setOrderDetails = (items: string[]): ISetOrderDetails => {
  return {
    type: SET_ORDER_DETAILS,
    payload: { items },
  };
}

export const setCurrentOrder = (order: IOrder): ISetCurrentOrder => {
  return {
    type: SET_CURRENT_ORDER,
    payload: { order },
  };
}

export const deleteCurrentOrder = (): IDeleteCurrentOrder => {
  return {
    type: DELETE_CURRENT_ORDER,
    payload: {},
  };
}

const setOrderRequest = (): IGetOrderRequest => {
  return {
    type: GET_ORDER_REQUEST,
  };
}

const setOrderSuccess = (orderNumber: number): IGetOrderSuccess => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: { orderNumber }
  };
}

const setOrderError = (): IGetOrderError => {
  return {
    type: GET_ORDER_ERROR,
  };
}

export const getOrderNumber: AppThunk = (ingredientsId: string[], openPopup: Dispatch<SetStateAction<string>>) => {
  return function (dispatch: AppDispatch) {
    dispatch(setOrderRequest())
    sendOrder(ingredientsId)
      .then(data => {
        if (data.success === true) {
          dispatch(setOrderSuccess(data.order.number))
          openPopup('OrderPopup')
          dispatch(setInitialConstructor())
        } else {
          dispatch({
            type: GET_ORDER_ERROR
          })
        }
      }).catch(err => {
        console.log(err)
        dispatch(setOrderError())
      })
  }
}

