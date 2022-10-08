export const BASE_API_URL = 'https://norma.nomoreparties.space/api';
export const ORDERS_API = `${BASE_API_URL}/orders`;
export const INGEDIENTS_API = `${BASE_API_URL}/ingredients`;

export function sendOrder(ingredientsId) {
   return fetch(ORDERS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ ingredients: ingredientsId })
      })
}