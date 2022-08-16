import { useState } from 'react';
import { format, getUnixTime } from 'date-fns';

import dateNormalizer from '../helpers/dateNormalizer';
import { MAX_GUESTS } from '../constants/form';
import { STATE_CODES } from '../constants/states';
import { IBooking } from '../interfaces/IController';

const DEFAULT_DATE: IDate = { pure: null, normalized: null };
const DEFAULT_STATE = { value: null, label: null };

export interface IDate {
    pure: Date | null;
    normalized: string | null;
}

export interface IState {
    value: string | null;
    label: string | null;
}

export type TGuests = number | null;

const useForm = () => {
    // use local state to prevent unnecessary global state updates
    // onc the form is filled up submit its data to the global state
    const [firstDate, setFirstData] = useState(DEFAULT_DATE as IDate);
    const [secondDate, setSecondData] = useState(DEFAULT_DATE as IDate);
    const [guestsCount, setGuestsCount] = useState(0);
    const [state, setState] = useState(DEFAULT_STATE as IState);

    const _handleSetDate = (date: Date, isFirst?: boolean) => {
        const newDate = { pure: date, normalized: dateNormalizer(date) };
        
        // @ts-ignore
        isFirst ? setFirstData(newDate) : setSecondData(newDate);
    };
    
    const _handleSelectFirst = (date: Date) => _handleSetDate(date, true);
    const _handleSelectSecond = (date: Date) => _handleSetDate(date);
    const _handleChangeState = (newState: IState) => setState(newState);
    const _handleChangeGuests = (e: React.ChangeEvent<HTMLInputElement>) => setGuestsCount(Number(e.target.value));

    const _handleSetInitData = (initData: IBooking) => {
        const firstDateInit = {
            pure: new Date(initData.from as string),
            normalized: initData.from
        };
        const secondDateInit = {
            pure: new Date(initData.to as string),
            normalized: initData.to
        };
        const guestsInit = initData.guests;
        // @ts-ignore
        const stateInit = { value: STATE_CODES[initData.state], label: initData.state };

        setFirstData(firstDateInit as IDate)
        setSecondData(secondDateInit as IDate)
        setGuestsCount(guestsInit as number)
        setState(stateInit)
    };

    const eraseFormData = () => {
        setFirstData(DEFAULT_DATE as IDate)
        setSecondData(DEFAULT_DATE as IDate)
        setGuestsCount(0 as number)
        setState(DEFAULT_STATE)
    };

    const checkErrors = () => {
        // TODO: add useMemo in this checks
        const isMaxGuest = (guestsCount as number) > MAX_GUESTS;
        const isFormNotFull = !firstDate.normalized || !secondDate.normalized || !state.label || !guestsCount;
        const isDatesOverlap = (firstDate.normalized && secondDate.normalized) && getUnixTime(firstDate.pure as unknown as Date) > getUnixTime(secondDate.pure  as unknown as Date);

        return {
            isMaxGuest,
            isFormNotFull,
            isDatesOverlap
        }
    }

    return {
        firstDate,
        secondDate,
        guestsCount,
        state,
        onGuestsChange: _handleChangeGuests,
        onGuestsState: _handleChangeState,
        onFirstDate: _handleSelectFirst,
        onSecondDate: _handleSelectSecond,
        onInitData: _handleSetInitData,
        eraseFormData,
        errors: {
            ...checkErrors()
        }
    }
};

export default useForm;