import DatePicker from 'react-datepicker';

import styles from '../index.module.scss';

export interface IProps { 
    error?: boolean; 
    label: string; 
    date: Date; 
    onClick: (date: Date) => void; 
    isFullWidth?: boolean;
};

const Guests = ({ error, label, date, onClick, isFullWidth }: IProps) => {
    return (
        <div className={`${styles.column} ${isFullWidth ? styles.fullWidth : ''}`}>
            <span className={styles.label}>{label}:</span>
            <DatePicker placeholderText='Set end date...' selected={date} onSelect={onClick} onChange={onClick} />
            {error && <span className={styles.error}>Please, select valid date</span>}
        </div>
    )
}

export default Guests;