import { useSelector } from 'react-redux';

import Item from '../Item';

import { IAppStore, IBooking } from '../../interfaces/IController';

import styles from './index.module.scss';

const PLACEHOLDER = 'No records found. Please, create your first booking';

const BookingsList = () => {
    const { bookings } = useSelector(({ app }: IAppStore) => app);

    const _renderPlaceholder = (
        <div className={styles.placeholderWrap}>{PLACEHOLDER}</div>
    );

    const _renderBookings = bookings.map((item: IBooking, id) => {
        return <Item item={item} id={id + 1} key={item.id} />
    })

    return (
        <div className={styles.bookings}>
            <h2 className={styles.headline}>Last bookings:</h2>
            <div className={`${styles.bookingsListWrap} ${!bookings.length ? styles.placeholderWrap : ''}`}>
                {!bookings.length ? _renderPlaceholder : _renderBookings}
            </div>
        </div>
    );
};

export default BookingsList;