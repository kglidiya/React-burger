import { getCookie } from '../../utils/cookie'
import { getNewToken } from '../actions/usersActions';
import { isTokenExpired } from '../../utils/token';


export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {

    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInitOrdersAll,
        wsInitOrdersUser,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage } = wsActions;
     

      if (type === wsInitOrdersAll) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === wsInitOrdersUser) {
        let token = getCookie('token')
        const isExpired = isTokenExpired(token)
        if (!isExpired) {
         //console.log('!isExpired')
          socket = new WebSocket(`${wsUrl}?token=${token}`)
        }
        if (isExpired) {
       // console.log('isExpired')
          dispatch(getNewToken())
          setTimeout(() => {
            socket = new WebSocket(`${wsUrl}?token=${token}`)
          }, 0)
        }
      }

      if (socket) {

        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch({ type: onMessage, payload: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);

    };
  };
};

