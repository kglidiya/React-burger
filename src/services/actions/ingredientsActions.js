import { getItems} from "../../utils/api";
export const INGREDIENTS_ORDER_REQUEST = 'INGREDIENTS_ORDER_REQUEST';
export const INGREDIENTS_ORDER_SUCCESS = 'INGREDIENTS_ORDER_SUCCESS';
export const INGREDIENTS_ORDER_ERROR = 'INGREDIENTS_ORDER_ERROR';


export function getAllItems() {
  return (dispatch) => {
    const getIndredientsData = async () => {
      try {
        dispatch({
          type: INGREDIENTS_ORDER_REQUEST
        })
        await getItems()
          .then((data) => {
            dispatch({
              type: INGREDIENTS_ORDER_SUCCESS,
              ingredients: data.data
            })
          });
      } catch (error) {
        console.log(error)
        dispatch({
          type: INGREDIENTS_ORDER_ERROR
        })
      }
    };
    return getIndredientsData();
  };
}

