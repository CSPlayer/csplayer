import Api from '@/services/Api';

export default {
  /**
  * @summary sends a request to the back-end to register a new party
  * @description
  * When called this method sends a POST request to the /register_party end-point
  * of back-end.
  * @param {object} credentials - proposed credientials for the party. Must
  * contain a partyName and a password property. This will be used to authenticate
  * guests.
  * @return {object} server_response - a response specifiy if the party was
  * successfully registered.
  */
  registerParty (credentials) {
    return Api().post('register_party', credentials)
  },

  /**
  * @summary sends a request to the back-end to register a new guest
  * @description
  * When called this method sends a POST request to the /register_guest end-point
  * of back-end.
  * @param {object} credentials - proposed credientials for the party. Must
  * contain a PartyName and a password property. This will be used to determine
  * what party the guest belongs to and if they are allowed inside it.
  * @return {object} server_response - a response specifiy if the guest was successfully
  * registered
  */
  registerGuest (credentials) {
    return Api().post('register_guest', credentials)
  }
};
