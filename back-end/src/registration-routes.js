const mongoose = require('mongoose');
const Party = require('../models/Party');

const init = (app) => {

  /**
   * @summary Creates a party with the provided username and password.
   * @description
   * Accepts post requests on the /register_party route. Expects a json with the
     following data:
     {
        partyName: string,
        partyPassword: string
     }
     On success it will send back the party name. Otherwise it will send a json
     with an error message in it. ex: { error: string }
   * @listens Server#register_party_route
   * @emits JSON
   */
  app.post('/register_party', (req, res) => {
    const name = req.body.partyName;
    const password = req.body.partyPassword;

    //check if both name and password fields are not empty
    if(!name || !password) {
      res.status(200).send({error : "Must provide a partyName and partyPassword."});
      return;
    }

    //look up provided party name
    const result = Party.find({partyName: name}).exec((err, party) => {
      if (err) {
        res.status(200).send({error: "Encountered database error while checking if party exists. Please try again at a later time."});
        return;
      }

      //return error if party with that name already exists
      if (party.length != 0){
        res.status(200).send({error: "A party with that name already exists."});
        return;
      }

      //otherwise create new party object to store in db
      var newParty = new Party({
        partyName: name,
        partyPassword: password,
        memberCount: 1,
        playlist: []
      })

      //save newly created party object
      newParty.save((err, newParty) => {
        if (err) {
          res.status(200).send({error: "Encountered a database error while checking if the party exists. Please try again at a later time."});
          return;
        }

        //send back partyname to indicate success
        res.status(200).send({partyName: name});
      });
    });
  });

  /**
   * @summary registers a guest with the provided username and password.
   * @description
   * Accepts post requests on the /register_guest route. Expects a json with the
     following data:
     {
        partyName: string,
        partyPassword: string
     }
     On success it will send back the party name and the guests guestID. Otherwise
     it will send a json with an error message in it. ex: { error: string }
   * @listens Server#register_guest_route
   * @emits JSON
   */
  app.post('/register_guest', (req, res) => {
    var name = req.body.partyName;
    var password = req.body.partyPassword;

    //check if both name and password fields are not empty
    if(!name || !password) {
      res.status(200).send({error : "Must provide a partyName and partyPassword"});
      return;
    }

    //validate that there is a party with that name and password
    const result = Party.findOne({partyName: name, partyPassword: password}).exec((err, party) => {
      if (err) {
        res.status(200).send({error: "Encountered database error while checking if party exists. Please try again at a later time."});
        return;
      }

      //if not, then tell the user they provided invalid creditenals
      if (!party){
        res.status(200).send({error: "Invalid partyName or partyPassword"});
        return;
      }

      //otherwise add guest data to the database
      party.memberCount++;
      party.save((err, result) => {
        if (err) {
          res.status(200).send({error: "Encountered database error while adding guest. Please try again at a later time."});
          return;
        }

        //send back json with partyName and the registered guests guestID.
        res.status(200).send({partyName: name, guestID: result.memberCount});
      });
    });
  });



  /**
   * @summary Deletes a party with the provided username and password.
   * @description
   * Accepts post requests on the /unregister_party route. Expects a json with the
     following data:
     {
        partyName: string,
        partyPassword: string
     }
     On success it will send back the party name. Otherwise it will send a json
     with an error message in it. ex: { error: string }
   * @listens Server#unregister_party_route
   * @emits JSON
   */
  app.post('/unregister_party', (req, res) => {
    const name = req.body.partyName;
    const password = req.body.partyPassword;

    //check if both name and password fields are not empty
    if(!name || !password) {
      res.status(200).send({error : "Must provide a partyName and partyPassword."});
      return;
    }

    //look up provided party name
    Party.remove({partyName: name, partyPassword: password}, (err, party) => {
        if (err) {
          res.status(200).send({error: "Encountered database error while checking if party exists. Please try again at a later time."});
          return;
        } else {
          //send back party name to indicate success
          res.status(200).send({partyName: name});
        }
      });
  });


}

module.exports = {init: init};
