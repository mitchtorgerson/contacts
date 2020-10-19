import React, {Fragment, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addContact,
    saveContact,
    addAddress,
    getContacts,
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

    const handleSearchByContact = e => {

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

    const renderGettingContacts = () => {
        return (
            <div className={'no-content-row'}>
                Getting blog posts... Please wait...
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
            <Fragment>
                <List
                    data={filteredContacts}
                    action={handleSelectContact}
                    columns={columnList}
                    showDetails
                />
                <button onClick={handleAddContact}>Add New</button>
            </Fragment>
        );
    };

    const renderAddressList = () => {
        return (
            <Fragment>
                <div className={'section-title'}>Addresses</div>

                {selectedContact.contactAddresses.map(item => {
                    return item.name ? <div className={'user-row'} key={item.name}>
                        <input value={item.name} onChange={handleChangeAddressName} />
                        <textarea name={item.name} value={item.value} onChange={handleChangeAddress} />
                    </div> : null
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
                    data={filteredContacts}
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
                        <input type={'text'} placeholder={'Search by ID or Last Name'} />
                        <button onClick={handleSearchByContact}>Search</button>
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
