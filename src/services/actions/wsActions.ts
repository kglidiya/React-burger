export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_DELETE_ORDERS: 'WS_DELETE_ORDERS' = 'WS_DELETE_ORDERS';

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: string;
}
interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR
  readonly payload: any;
}
interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: any;
}
interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE
  readonly payload: any;
}
interface IWsDeleteOrders {
  readonly type: typeof WS_DELETE_ORDERS;
  readonly payload: []
}
export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsSendMessage
  | IWsDeleteOrders;




