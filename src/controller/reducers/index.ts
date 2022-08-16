import { SUBMIT_BOOKING, EDIT_BOOKING, DELETE_BOOKING, UPDATE_BOOKING } from '../../constants/controller';
import { IState, ICommonAction, ISubmitAction, IDeleteAction, IEditAction, IUpdateBooking } from '../../interfaces/IController';

import initialState from '../store/initialState';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SUBMIT_BOOKING]: (state: IState, action: ISubmitAction): IState => ({
    ...state,
    bookings: [
      ...state.bookings,
      action.booking
    ]
  }),
  [EDIT_BOOKING]: (state: IState, action: IEditAction): IState => ({
    ...state,
    bookingToEdit: state.bookings.find(item => item.id === action.bookingID)
  }),
  [UPDATE_BOOKING]: (state: IState, action: IUpdateBooking): IState => ({
    ...state,
    bookingToEdit: undefined,
    bookings: state.bookings.map(item => item.id === action.booking.id ? action.booking : item)
  }),
  [DELETE_BOOKING]: (state: IState, action: IDeleteAction): IState => ({
    ...state,
    bookings: state.bookings.filter(booking => booking.id !== action.bookingID)
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const reducer = (state: IState = initialState.app, action: ICommonAction) => {
  // @ts-ignore
  const handler = ACTION_HANDLERS[action.type];

  // @ts-ignore
  return handler ? handler(state, action) : state
}

export default reducer
