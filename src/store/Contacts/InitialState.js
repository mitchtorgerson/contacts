let _initialState = {
    contactId: 1,
    gettingContacts: false,
    contacts: [],
    contactIdList: [],
    saved: false,
    selectedContact: {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "employeeId": "",
        "email": "",
        "cellPhone": "",
        "homePhone": "",
        "officePhone": "",
        "dateOfBirth": "",
        "dateOfHire": "",
        "currentlyEmployed": true,
        "contactAddresses": [],
        "relatedContacts": [],
        "relativeOfContacts": []
    }
};

let _address = {
    "contactId": 0,
    "addressId": 0,
    "address": {
        "id": 0,
        "line1": "",
        "line2": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "contactAddresses": [
            null
        ]
    },
    "addressType": ""
};

let _relatedContacts = {
    "contactId": 0,
    "relatedContactId": 0,
    "relationship": ""
};

let _relativeOfContacts = {
    "contactId": 0,
    "relatedContactId": 0,
    "relationship": ""
};

export const INITIAL_STATE = _initialState;
export const ADDRESS = _address;
export const RELATED_CONTACTS = _relatedContacts;
export const RELATIVE_OF_CONTACTS = _relativeOfContacts;
