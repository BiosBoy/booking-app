import { IAppStore } from "../../interfaces/IController";

const initialState: IAppStore = {
    app: {
        bookings: [],
        bookingToEdit: undefined
    }
};

export default initialState;
