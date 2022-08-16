import NewBooking from '../components/BookForm';
import BookingsList from '../components/BookingsList';
import EditBookingPopup from '../components/EditPopup';

import logo from '../assets/logo.svg';

import styles from './app.module.scss';

const App = () => {
  return (
    <div className={styles.appWrap}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h1>Booking app | Test demo by Sviat Kuzhelev</h1>
        <NewBooking />
        <BookingsList />
        <EditBookingPopup />
    </div>
  );
}

export default App;
