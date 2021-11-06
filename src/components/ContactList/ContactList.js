import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './ContactList.module.css';

import actions from '../../redux/items-actions';

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

const getFilteredContacts = (items, filter) => {
    return items.filter(item => {
        return item.name.toLowerCase().includes(filter.toLowerCase())
    })
}

const mapStateToProps = ({contacts: {items, filter}}) => ({
    contacts: getFilteredContacts(items, filter)
});

const mapDispatchToProps = dispatch => ({
    onDeleteButtonClick: id => dispatch(actions.deleteUsersContact(id))
});

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onDeleteButtonClick: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);