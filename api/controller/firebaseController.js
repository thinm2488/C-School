var admin = require("firebase-admin");

var serviceAccount = require("../../configs/c-school-apps-firebase-adminsdk-z3osd-9b5c9dbae7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://c-school-apps.firebaseio.com"
});

module.exports = admin