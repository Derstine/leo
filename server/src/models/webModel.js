const { db } = require('./dbModel')

async function initWebFirestore(id) {
  const docRef = db.collection('ids').doc('w_' + id);
  const doc = await docRef.get();
  const data = doc.data()

  if(doc.exists && data.devices) {
    docRef.update({ws: true})
  } else {
    docRef.set({ws: true, devices: {}})
  }

}

module.exports = initWebFirestore;