import {useState, Fragment, useEffect} from "react";
import {v4 as uuidv4} from 'uuid';

import Section from "./components/Section";
import ContactForm from "./components/ContactForm";
import Filter from './components/Filter';
import ContactList from "./components/ContactList";


function App() {

    const [contacts, setContacts] = useState(() => {
        return JSON.parse(localStorage.getItem('savedContacts')) ?? []
    });
    const [filter, setFilter] = useState('');


    useEffect(() => {
        localStorage.setItem('savedContacts', JSON.stringify(contacts));
    }, [contacts])

    const handleFormSubmit = user => {
        const uid = uuidv4();
        const contact = {uid, ...user};

        setContacts(state => [contact, ...state]);
    }

    const handleDeleteContact = id => {
        setContacts(contacts.filter(contact => contact.uid !== id));
    }

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase())
    })
    const isAnyContact = contacts.length > 0;

    return (
        <Fragment>
            <Section>
                <h1 className="">Phonebook</h1>
                <ContactForm
                    onFormSubmit={handleFormSubmit}
                    existingContacts={contacts}
                />
            </Section>
            <Section>
                <h2 className="">Contacts</h2>
                <Filter
                    onFilterChange={setFilter}
                    isFilterActive={isAnyContact}
                />
                <ContactList
                    contacts={filteredContacts}
                    onDeleteButtonClick={handleDeleteContact}
                />
            </Section>
        </Fragment>
    );
}

export default App;
