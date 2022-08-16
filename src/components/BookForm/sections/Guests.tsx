import { MAX_GUESTS } from '../../../constants/form';

import styles from '../index.module.scss';

export interface IProps { 
    error: boolean; 
    guestsCount: number; 
    onClick: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    isFullWidth?: boolean;
};

const Guests = ({ error, guestsCount = 0, onClick, isFullWidth }: IProps) => {
    return (
        <div className={`${styles.column} ${isFullWidth ? styles.fullWidth : ''}`}>
            <span className={styles.label}>Guests:</span>
            <input placeholder='Set guests count...' name='guests' type='number' value={String(guestsCount).replace(/^0(.*)/i, '$1')} onChange={onClick} />
            {error && <span className={styles.error}>Max guests allowed: {MAX_GUESTS}</span>}
        </div>
    )
}

export default Guests;