import PropTypes from 'prop-types';

import styles from './ContactList.module.css';


function ContactList({contacts, onDeleteButtonClick}) {

    return (
        <ul className={styles.list}>
            {contacts.map(({uid, name, number}) => {
                return (
                    <li className={styles.item} key={uid}>
                        <div className={styles.wrapper}>
                            <p className={styles.name}>{name}</p>
                            <span className={styles.number}>{number}</span>
                            <button className={styles.button}
                                    onClick={() => onDeleteButtonClick(uid)}>Delete
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onDeleteButtonClick: PropTypes.func
}

export default ContactList;