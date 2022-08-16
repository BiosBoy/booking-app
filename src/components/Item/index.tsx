import { memo } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../Button';

import { IBooking } from '../../interfaces/IController';
import { editBooking, deleteBooking } from '../../controller/actions';

import styles from './index.module.scss';

const Item = memo(({ item, id }: { item: IBooking, id: number }) => {
    const dispatch = useDispatch();

    const _handleEditBooking = () => dispatch(editBooking({ bookingID: item.id }));
    const _handleDeleteBooking = () => dispatch(deleteBooking({ bookingID: item.id }));

    return (
        <div className={styles.bookingItem} key={item.id}>
            <div className={styles.id}>
                <span className={styles.text}>#{id}</span>
            </div>
            <div className={styles.from}>
                <span className={styles.text}>{item.from}</span>
            </div>
            <div className={styles.to}>
                <span className={styles.text}>{item.to}</span>
            </div>
            <div className={styles.state}>
                <span className={styles.text}>{item.state}</span>
            </div>
            <div className={styles.guests}>
                <span className={styles.text}>{item.guests}</span>
            </div>
            <div className={styles.approved}>
                <span className={styles.text}>Pending</span>
            </div>
            <div className={styles.edit}>
                <Button onClick={_handleEditBooking} label='Edit' size='S' />
            </div>
            <div className={styles.delete}>
                <Button onClick={_handleDeleteBooking} label='Delete' size='S' />
            </div>
        </div>
    )
});

Item.displayName = 'Item';

export default Item;