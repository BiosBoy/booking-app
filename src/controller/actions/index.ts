import { SUBMIT_BOOKING, EDIT_BOOKING, DELETE_BOOKING, UPDATE_BOOKING } from "../../constants/controller";
import { ISubmitAction, IDeleteAction, IUpdateBooking, IType } from "../../interfaces/IController";

const submitBooking = ({ booking }: ISubmitAction): ISubmitAction & IType => ({
    booking,
    type: SUBMIT_BOOKING
});

const editBooking = ({ bookingID }: IDeleteAction): IDeleteAction & IType => ({
    bookingID,
    type: EDIT_BOOKING
});

const updateBooking = ({ booking }: IUpdateBooking): IUpdateBooking & IType => ({
    booking,
    type: UPDATE_BOOKING
});

const deleteBooking = ({ bookingID }: IDeleteAction): IDeleteAction & IType => ({
    bookingID,
    type: DELETE_BOOKING
});

export {
    submitBooking,
    deleteBooking,
    updateBooking,
    editBooking
};