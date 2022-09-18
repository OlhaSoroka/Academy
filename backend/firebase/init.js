const admin = require("firebase-admin");

// init app and database
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
});
const app = admin.auth();
const db = admin.firestore();

module.exports = { app, db };
