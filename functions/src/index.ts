//'use strict';

const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);

//var db = admin.firestore();
var firestore = admin.firestore();

exports.firestoreHotel = functions.https.onRequest((request, response) => {
  let params = request.body.result.parameters;
  switch (request.body.result.action) {
    case 'input.welcome':
      //let params = request.body.result.parameters;
      firestore.collection('orders').add(params)
        .then(() => {
          response.send({
            speech: "Welcome to my agent!"
          });
        })
        .catch((e => {
          console.log("error: ", e);
          response.send({
            speech: "something went wrong when writing on database"
          });
        }))
      break;
    case 'input.unknown':
      firestore.collection('orders').add(params)
        .then(() => {
          response.send({
            speech: "I didn't understand"
            //"I'm sorry, can you try again?"
          });
        })
        .catch((e => {
          console.log("error: ", e);
          response.send({
            speech: "something went wrong when writing on database"
          });
        }))
      break;
    case 'RoomBooking':
      firestore.collection('orders').add(params)
        .then(() => {
          response.send({
            speech: `${params.name} your hotel booking request for ${params.RoomType}room is forwarded for 
                            ${params.persons} persons. We will contact you on ${params.email} soon`
          });
        })
        .catch((e => {
          console.log("error: ", e);
          response.send({
            speech: "something went wrong when writing on database"
          });
        }))
      break;
    case 'complaint':
      firestore.collection('orders').add(params)
        .then(() => {
          response.send({
            speech: `Your ${params.typeFeedback} is duly noted against: \n Subject: ${params.subject}.
                                             \n Description: ${params.description}`
          });
        })
        .catch((e => {
          console.log("error: ", e);
          response.send({
            speech: "something went wrong when writing on database"
          });
        }))
      break;
    default:
      response.send({
        speech: "no action matched in webhook"
      })
  }
});