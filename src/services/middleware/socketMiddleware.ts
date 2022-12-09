import { Dispatch } from 'redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  TWsActions
} from '../actions/wsActions';


export const socketMiddleware = (wsUrl: string) => {
  return (store: { dispatch: Dispatch<TWsActions> }) => {

    let socket: WebSocket | null = null;

    return (next: Dispatch<TWsActions>) => (action: TWsActions) => {
      const { dispatch } = store;
      if (action.type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}${action.payload}`);

      }

      if (socket) {
        socket.onopen = (event: any) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });

        };

        socket.onerror = (event: any) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event: any) => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: WS_GET_MESSAGE, payload: data });
          }
        };

        if (action.type === WS_CONNECTION_CLOSED) {
          socket.close()
        }

        if (action.type === WS_SEND_MESSAGE) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);

    };
  };
};
