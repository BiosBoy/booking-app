// @ts-nocheck
import Select from 'react-select';

import states from '../../../constants/states';

import styles from '../index.module.scss';

export interface IStateData {
    value: string | null;
    label: string | null;
}

export interface IProps { 
    state: IStateData;
    onClick: (newState: IStateData) => void; 
    isFullWidth?: boolean;
};

const States = ({ state, onClick, isFullWidth }: IProps) => {
    const currentState = states.find(item => item.label === state.label);

    return (
        <div className={`${styles.column} ${isFullWidth ? styles.fullWidth : ''}`}>
            <span className={styles.label}>State:</span>
            <Select 
                className={styles.reactSelect}
                value={currentState}
                options={states}
                onChange={onClick}
            />
        </div>
    )
}

export default States;