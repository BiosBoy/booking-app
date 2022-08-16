import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Date from '../BookForm/sections/Date';
import Guests from '../BookForm/sections/Guests';
import States from '../BookForm/sections/States';

import Button from '../Button';

import useForm from '../../hooks/useForm';
import { editBooking, updateBooking } from '../../controller/actions';

import { IAppStore, IBooking } from '../../interfaces/IController';

import formStyles from '../BookForm/index.module.scss';
import styles from './index.module.scss';

const EditPopup = () => {
    const { bookingToEdit } = useSelector(({ app }: IAppStore) => app);
    const dispatch = useDispatch();

    const { 
        firstDate,
        secondDate,
        guestsCount,
        state,
        onGuestsChange,
        onGuestsState,
        onFirstDate,
        onSecondDate,
        onInitData,
        errors : {
            isFormNotFull, isDatesOverlap, isMaxGuest
        }
    } = useForm();

    const data = {
        firstDate,
        secondDate,
        state,
        guestsCount
    }

    useEffect(() => {
        window.addEventListener('keydown', _handleCloseKeydownPopup);

        return () => window.removeEventListener('keydown', _handleCloseKeydownPopup);
    }, []);

    useEffect(() => {
        if (!bookingToEdit) {
            return;
        }

        onInitData(bookingToEdit);
    }, [bookingToEdit])

    // @ts-ignore
    const _handleCloseKeydownPopup = (e) => {
        if (e.keyCode === 27) { // ESC 
            dispatch(editBooking({ bookingID: null }));
        }
    }

    const _handleClosePopup = () => {
        dispatch(editBooking({ bookingID: null }));
    }

    const _handleSubmit = () => dispatch(updateBooking({
        booking: {
            id: (bookingToEdit as IBooking).id,
            from: firstDate.normalized,
            to: secondDate.normalized,
            state: state.label,
            guests: guestsCount,
        }
    }));
    
    if (!bookingToEdit) {
        return null;
    }

    console.log(data, 'RESULT');

    return (
        <div className={styles.editPopupWrap}>
            <div className={styles.editPopupContainer}>
                <div className={styles.editPopupClose}>
                    <Button onClick={_handleClosePopup} size='S' label='Cancel' />
                </div>
                <h2>Edit Booking</h2>
                <form className={`${formStyles.formStyles} ${styles.formWrap}`}>
                    <Date label='From' date={firstDate.pure as unknown as Date} onClick={onFirstDate} isFullWidth />
                    <Date error={isDatesOverlap as boolean} label='To' date={secondDate.pure as unknown as Date} onClick={onSecondDate} isFullWidth />
                    <States state={state} onClick={onGuestsState} isFullWidth />
                    <Guests error={isMaxGuest} guestsCount={guestsCount as number} onClick={onGuestsChange} isFullWidth />
                    <div className={styles.column}>
                        <Button onClick={_handleSubmit} label='Update Booking' isDisabled={isFormNotFull || isDatesOverlap || isMaxGuest} isFullWidth />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPopup;