import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css";

import Date from './sections/Date';
import Guests from './sections/Guests';
import States from './sections/States';
import Button from '../Button';

import useForm from '../../hooks/useForm';
import { submitBooking } from '../../controller/actions';

import { IAppStore, IBooking } from '../../interfaces/IController';

import styles from './index.module.scss';

const BookForm = memo(() => {
    const [isErrorDuplicate, setDuplicateError] = useState(false);

    const { 
        firstDate,
        secondDate,
        guestsCount,
        state,
        onGuestsChange,
        onGuestsState,
        onFirstDate,
        onSecondDate,
        eraseFormData,
        errors
    } = useForm();

    const { bookings } = useSelector(({ app }: IAppStore) => app);
    const dispatch = useDispatch();

    const findDuplicateBooking = (item: IBooking) => {
        // preventing from duplicated orders
        if (item.from === firstDate.normalized && item.to === secondDate.normalized && item.state === state.label) {
            setDuplicateError(true);

            return true;
        }

        return false;
    };

    const _handleSubmit = () => {
        console.log(bookings.some(findDuplicateBooking), 'bookings.some(findDuplicateBooking)');

        if (bookings.some(findDuplicateBooking)) {
            return;
        }

        dispatch(submitBooking({
            booking: {
                from: firstDate.normalized,
                to: secondDate.normalized,
                state: state.label,
                guests: guestsCount,
                id: bookings.length + 1
            }
        }));

        eraseFormData();
        setDuplicateError(false);
    };

    const { isFormNotFull, isDatesOverlap, isMaxGuest, } = errors;

    return (
        <div className={styles.bookingWrap}>
            <h2 className={styles.header}>Set Up Your Next Journey</h2>
            <form className={styles.bookingForm}>
                <Date label='From' date={firstDate.pure as unknown as Date} onClick={onFirstDate} />
                <Date error={isDatesOverlap as unknown as boolean} label='To' date={secondDate.pure as unknown as Date} onClick={onSecondDate} />
                <States state={state} onClick={onGuestsState} />
                <Guests error={isMaxGuest} guestsCount={guestsCount as number} onClick={onGuestsChange} />
                <div className={styles.column}>
                    <Button onClick={_handleSubmit} label='Book now!' isDisabled={isFormNotFull || isDatesOverlap || isMaxGuest} />
                </div>
            </form>
            {isErrorDuplicate && <span className={styles.error}>Do not overlap bookings. You already made the same order</span>}
        </div>
    );
});

BookForm.displayName = 'BookForm';

export default BookForm;