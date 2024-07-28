var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

var serviceAccount = require("../../keys/firestore_db.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

async function setID(id, status) {
  const docRef = db.collection('ids').doc(id);

  await docRef.set(status);
}

async function updateID(id, status) {
  const docRef = db.collection('ids').doc(id);
  await docRef.update(status);
}


module.exports = {
  setID,
  updateID,
  db
};