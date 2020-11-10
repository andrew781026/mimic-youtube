const firebase = require('firebase');

const serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp(serviceAccount);

const db = firebase.firestore();
const auth = firebase.auth();

module.exports = {db, auth};