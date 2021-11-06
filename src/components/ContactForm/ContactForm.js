import { useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './ContactForm.module.css';

import actions from '../../redux/items-actions'


function ContactForm({existingContacts, onFormSubmit}) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onInputChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    }

    const onInputReset = () => {
        setName('');
        setNumber('');
    }

    const HandleFormSubmit = event => {
        event.preventDefault();
        
        const existingContact = existingContacts.find(existingContact => {
            return existingContact.name === name;
        });
        if (existingContact) {
            alert('Contact already exists. Try another name');
            setName('');
            return;
        }
        onFormSubmit({name, number});
        onInputReset();
    }

        return (
            <form className={styles.form} onSubmit={HandleFormSubmit}>
                <label className={styles.label}>
                    Name
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        value={name}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                        autoComplete="off"
                        onChange={onInputChange}
                    />
                </label>
                <label className={styles.label}>
                    Number
                    <input
                        className={styles.input}
                        type="tel"
                        name="number"
                        value={number}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                        autoComplete="off"
                        onChange={onInputChange}
                    />
                </label>
                <button className={styles.button} type="submit">Add a contact</button>
            </form>
        );
}

const mapStateToProps = state => ({
    existingContacts: state.contacts.items
});

const mapDispatchToProps = dispatch => ({
    onFormSubmit: user => dispatch(actions.addUsersContact(user))
});


ContactForm.propTypes = {
    existingContacts: PropTypes.arrayOf(PropTypes.object),
    onFormSubmit: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);