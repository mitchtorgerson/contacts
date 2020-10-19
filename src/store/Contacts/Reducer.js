import { Actions } from './Actions';
import {
    INITIAL_STATE,
    ADDRESS,
    RELATED_CONTACTS,
    RELATIVE_OF_CONTACTS
} from './InitialState';

const ACTION_HANDLERS = {
    [Actions.GET_CONTACTS_START]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.gettingContacts = true;
        return Object.assign({}, state, tempState);
    },

    [Actions.GET_CONTACTS]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.contacts = action.contacts;
        tempState.gettingContacts = false;
        tempState.contactIdList = [...new Set(tempState.contacts.map(a => a.contactId))];
        tempState.saved = false;
        return Object.assign({}, state, tempState);
    },

    [Actions.ADD_ADDRESS]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.selectedContact = state.selectedContact;
        tempState.selectedContact.contactAddresses.push(ADDRESS);
        return Object.assign({}, state, tempState);
    },

    [Actions.ADD_CONTACT]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.selectedContact = INITIAL_STATE.selectedContact;
        return Object.assign({}, state, tempState);
    },

    [Actions.SAVE_CONTACT]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.selectedContact = INITIAL_STATE.selectedContact;
        return Object.assign({}, state, tempState);
    },

    [Actions.FINISH_SAVE_CONTACT]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.saved = true;
        return Object.assign({}, state, tempState);
    },

    [Actions.SET_CONTACT]: (state, action) => {
        const tempState = Object.assign({}, state);
        if (action.contact && action.contact.id) {
            tempState.selectedContact = action.contact;
        }
        else {
            tempState.selectedContact = INITIAL_STATE.selectedContact;
        }

        return Object.assign({}, state, tempState);
    },

    [Actions.CHANGE_VALUE]: (state, action) => {
        const tempState = Object.assign({}, state);
        tempState.selectedContact[action.prop] = action.val;
        return Object.assign({}, state, tempState);
    }
};

export default function reduce(state, action) {
    state = state || INITIAL_STATE;
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
