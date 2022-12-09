import { getItems } from "../../utils/api";
import { IIngredient } from '../../utils/types';
import { AppThunk, AppDispatch } from '../../index'
export const INGREDIENTS_ORDER_REQUEST: 'INGREDIENTS_ORDER_REQUEST' = 'INGREDIENTS_ORDER_REQUEST';
export const INGREDIENTS_ORDER_SUCCESS: 'INGREDIENTS_ORDER_SUCCESS' = 'INGREDIENTS_ORDER_SUCCESS';
export const INGREDIENTS_ORDER_ERROR: 'INGREDIENTS_ORDER_ERROR' = 'INGREDIENTS_ORDER_ERROR';

interface ISetOrderRequest {
  readonly type: typeof INGREDIENTS_ORDER_REQUEST;
}

interface ISetOrderSuccess {
  readonly type: typeof INGREDIENTS_ORDER_SUCCESS;
  readonly payload: { ingredients: IIngredient[] }
}

interface ISetOrderError {
  readonly type: typeof INGREDIENTS_ORDER_ERROR;
}

export type TIngredientActions =
  | ISetOrderRequest
  | ISetOrderSuccess
  | ISetOrderError;


const setOrderRequest = (): ISetOrderRequest => {
  return {
    type: INGREDIENTS_ORDER_REQUEST,
  };
}

const setOrderSuccess = (ingredients: IIngredient[]): ISetOrderSuccess => {
  return {
    type: INGREDIENTS_ORDER_SUCCESS,
    payload: { ingredients }
  };
}

const setOrderError = (): ISetOrderError => {
  return {
    type: INGREDIENTS_ORDER_ERROR,
  };
}


export const getAllItems: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    const getIndredientsData = async () => {
      try {
        dispatch(setOrderRequest())
        await getItems()
          .then((data) => {
            dispatch(setOrderSuccess(data.data))
          });
      } catch (error) {
        console.log(error)
        dispatch(setOrderError())
      }
    };
    return getIndredientsData();
  };
}

