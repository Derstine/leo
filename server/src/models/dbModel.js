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

async function docExists(col, docID) {
  const docRef = db.collection(col).doc(docID);
  const doc = await docRef.get();

  return doc.exists;
}

async function objectExists(col, docID, objectName, objectType) {
  const docRef = db.collection(col).doc(docID);
  const doc = await docRef.get();

  const data = doc.data();
  if (objectName in data && typeof data.ws === objectType) {
    return true;
  }
  return false;
}

module.exports = {
  setID,
  updateID,
  docExists,
  objectExists,
  db
};