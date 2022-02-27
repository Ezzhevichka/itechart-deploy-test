"use strict";

var functions = require("firebase-functions");

var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var cors = require('cors');

var uuid = require('uid'); // // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.employeeCreated = functions.https.onRequest(function (req, res) {
  cors()(req, res, function () {
    var parsed = JSON.parse(req.body);
    var name = parsed.name;
    var email = parsed.email;
    var adminId = parsed.adminId;
    var db = admin.firestore();
    var employee = {
      name: name,
      email: email,
      adminId: adminId
    };
    db.collection('employees').doc("".concat(uuid.v4())).add(employee);
    res.status(200).send('Good');
  });
});