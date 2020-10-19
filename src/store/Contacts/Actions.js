import rest from '../utils/rest';

export const Actions = {
    GET_CONTACTS_START: 'GET_CONTACTS_START',
    GET_CONTACTS: 'GET_CONTACTS',
    ADD_CONTACT: 'ADD_CONTACT',
    SAVE_CONTACT: 'SAVE_CONTACT',
    FINISH_SAVE_CONTACT: 'FINISH_SAVE_CONTACT',
    SAVE_CONTACT_START: 'SAVE_CONTACT_START',
    ADD_ADDRESS: 'ADD_ADDRESS',
    SET_CONTACT: 'SET_CONTACT',
    CHANGE_VALUE: 'CHANGE_VALUE'
};

const baseUrl = 'https://localhost:44365/api/';

export function getContacts() {
    return dispatch => {
        const url = `${baseUrl}Contacts`;

        dispatch({type: Actions.GET_CONTACTS_START});

        return rest.get(url).then(response => {
            dispatch({type: Actions.GET_CONTACTS, contacts: response.data});
        })
    };
}

export function addContact() {
    return dispatch => {
        dispatch({type: Actions.ADD_CONTACT});
    };
}

export function saveContact(contact) {
    return dispatch => {
        const url = `${baseUrl}Contacts`;

        return rest.post(url, contact).then(response => {
            dispatch({type: Actions.FINISH_SAVE_CONTACT, contacts: response.data});
        })
    };
}

export function deleteContact(id) {
    return dispatch => {
        const url = `${baseUrl}Contacts/${id}`;

        return rest.delete(url).then(response => {
            dispatch({type: Actions.FINISH_SAVE_CONTACT, contacts: response.data});
        })
    };
}

export function addAddress() {
    return dispatch => {
        dispatch({type: Actions.ADD_ADDRESS});
    };
}

export function setSelectedContact(contact) {
    return dispatch => {
        dispatch({type: Actions.SET_CONTACT, contact});
    };
}

export function changeValue(prop, val) {
    return dispatch => {
        dispatch({type: Actions.CHANGE_VALUE, prop, val});
    };
}


