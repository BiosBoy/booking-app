export interface IType {
    type: string;
}

export type TActionTypes = 'SUBMIT_ACTION' | 'EDIT_BOOKING' | 'DELETE_BOOKING';

export interface ICommonAction {
    type: TActionTypes
}

export interface IBooking {
    from: string | null | undefined;
    to: string | null | undefined;
    state: string | null;
    guests: number | null;
    id: number;
}

export interface ISubmitAction {
    booking: IBooking;
}

export interface IEditAction {
    bookingID: number;
}

export interface IUpdateBooking {
    booking: IBooking;
}

export interface IDeleteAction {
    bookingID: number | null;
}

export interface IState {
    bookings: IBooking[];
    bookingToEdit: IBooking | undefined;
}

export interface IAppStore {
    app: IState
}