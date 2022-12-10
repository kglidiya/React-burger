import { Dispatch } from 'redux';
import {
  TWsActions, 
  TWSActionsObj
} from '../actions/wsActions';


export const socketMiddleware = (wsUrl: string, wsActions: TWSActionsObj) => {
  return (store: { dispatch: Dispatch<TWsActions> }) => {

    let socket: WebSocket | null = null;

    return (next: Dispatch<TWsActions>) => (action: TWsActions) => {
      const { dispatch } = store;
      const { wsInit,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage } = wsActions;
      if (action.type === wsInit) {
        socket = new WebSocket(`${wsUrl}${action.payload}`);
     
      }

      if (socket) {
        socket.onopen = (event: any) => {
          dispatch({ type: onOpen, payload: event });

        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {
          const data = JSON.parse(event.data);
          if (data.success) {
            dispatch({ type: onMessage, payload: data });
          }
        };

        if (action.type ===  onClose) {
          socket.close()
        }

        if (action.type === wsSendMessage) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);

    };
  };
};
