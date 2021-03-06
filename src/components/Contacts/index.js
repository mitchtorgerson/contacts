import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addContact,
    saveContact,
    addAddress,
    getContacts,
    deleteContact,
    setSelectedContact,
    changeValue
} from '../../store/Contacts/Actions';
import List from '../List';
import './styles.css';

const columnList = [
    {
        title: 'Employee ID',
        prop: 'employeeId'
    },
    {
        title: 'First Name',
        prop: 'firstName'
    },
    {
        title: 'Last Name',
        prop: 'lastName'
    }
];

const familyColumnList = [
    {
        title: 'First Name',
        prop: 'firstName'
    },
    {
        title: 'Last Name',
        prop: 'lastName'
    },
    {
        title: 'Relationship',
        prop: 'relationship'
    }
];

function Blog() {
    const {
        contact: {
            contactId,
            contactIdList,
            gettingContacts,
            selectedContact,
            contacts,
            saved
        }
    } = useSelector(state => state);

    const dispatch = useDispatch();

    const [filteredContacts, setfilteredContacts] = useState([]);
    const [filteredFamily, setFilteredFamily] = useState([]);
    const [searchText, setSearchText] = useState();

    useEffect(() => {
        dispatch(getContacts());
    }, []);

    useEffect(() => {
        setfilteredContacts(contacts);
    }, [contacts]);

    useEffect(() => {
        if (saved) {
            dispatch(getContacts());
        }
    }, [saved]);

    useEffect(() => {
        setfilteredContacts(contacts.filter(
            c => (c.employeeId.match(searchText) || c.lastName.match(searchText))
        ));
    }, [searchText]);

    // handle methods
    const handleAddContact = () => {
        dispatch(addContact());
    };

    const handleSaveContact = () => {
        dispatch(saveContact(selectedContact));
    };

    const handleAddAddress = () => {
        dispatch(addAddress());
    };

    const handleSelectContact = contact => {
        dispatch(setSelectedContact(contact));
    };

    const handleDeleteContact = contact => {
        dispatch(deleteContact(contact.id));
    };

    const handleChangeEmployeeId = e => {
        dispatch(changeValue('employeeId', e.currentTarget.value));
    };

    const handleChangeFirstName = e => {
        dispatch(changeValue('firstName', e.currentTarget.value));
    };

    const handleChangeLastName = e => {
        dispatch(changeValue('lastName', e.currentTarget.value));
    };

    const handleChangeEmail = e => {
        dispatch(changeValue('email', e.currentTarget.value));
    };

    const handleChangeAddressName = e => {

    };

    const handleChangeAddress = e => {

    };

    const handleSearchText = e => {
        setSearchText(e.target.value);
    };

    const renderGettingContacts = () => {
        return (
            <div className={'no-content-row'}>
                Getting contacts... Please wait...
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className={'contact-container'}>
                <div className={'user-row'}>
                    <button onClick={handleSaveContact}>Save</button>
                </div>
                <div className={'user-row'}>
                    <div className={'user-head'}>Employee ID</div>
                    <input value={selectedContact.employeeId} onChange={handleChangeEmployeeId} />
                </div>
                <div className={'user-row'}>
                    <div className={'user-head'}>First Name</div>
                    <input value={selectedContact.firstName} onChange={handleChangeFirstName} />

                    <div className={'user-head'}>Last Name</div>
                    <input value={selectedContact.lastName} onChange={handleChangeLastName} />
                </div>
                <div className={'user-row'}>
                    <div className={'user-head'}>Email</div>
                    <input value={selectedContact.email} onChange={handleChangeEmail} />
                </div>

                {renderAddressList()}

                {renderFamilyList()}
            </div>
        );
    };

    const renderContactList = () => {
        return (
            <div className={'contact-container'}>
                <List
                    data={filteredContacts}
                    action={handleSelectContact}
                    deleteAction={handleDeleteContact}
                    columns={columnList}
                    showDetails
                />
                <button onClick={handleAddContact}>Add New</button>
            </div>
        );
    };

    const renderAddressList = () => {
        return (
            <Fragment>
                <div className={'section-title'}>Addresses</div>

                {selectedContact.contactAddresses.map(item => {
                    return <div className={'user-row'} key={item.addressType}>
                        <input value={item.name} onChange={handleChangeAddressName} />
                        <textarea name={item.addressType} value={item.address.contactAddresses} onChange={handleChangeAddress} />
                    </div>
                })}

                <button onClick={handleAddAddress}>Add New</button>
            </Fragment>
        );
    };

    const renderFamilyList = () => {
        return (
            <Fragment>
                <List
                    title={'Family'}
                    data={filteredFamily}
                    action={handleSelectContact}
                    columns={familyColumnList}
                    showDetails
                />
                <button onClick={handleAddContact}>Add New</button>
            </Fragment>
        );
    };

    const renderContacts = () =>{
        return (
            <Fragment>
                <div className={'contact-column'}>
                    <header>Contacts</header>
                    <div>
                        <input type={'text'} placeholder={'Search by ID or Last Name'} value={searchText} onChange={handleSearchText} />
                        <button onClick={handleSearchText}>Search</button>
                    </div>
                    {renderContactList()}
                </div>
                <div className={'contact-column'}>
                    <header>Contacts Details</header>
                    {selectedContact && renderContent()}
                </div>
            </Fragment>
        )
    };

    return (
        <Fragment>
            <div className={'blog-container'}>
                {!gettingContacts && renderContacts()}
                {gettingContacts && renderGettingContacts()}
            </div>
        </Fragment>
    );
}

export default Blog;
