const { db } = require('./dbModel')

const ReturnObject = require('../services/returnObject')

async function initWebFirestore(id) {
  const docRef = db.collection('ids').doc(id);
  const doc = await docRef.get();
  const data = doc.data();

  if(doc.exists && data.devices) {
    docRef.update({ws: true})

    for(deviceID in data.devices) {
      var ro_addConnectedWebClient = await addConnectedWebClient(id, data.devices[deviceID]);
      if(!ro_addConnectedWebClient.success()) {
        return ro_addConnectedWebClient;
      }
    };
  } else {
    return new ReturnObject(false, ('Something in database is missing for client ID: ' + id))
  }

  return new ReturnObject(true);
}

async function terminateWebFirestore(id) {
  const docRef = db.collection('ids').doc(id);
  const doc = await docRef.get();
  const data = doc.data();

  if(doc.exists && data.devices) {
    docRef.update({ws: false})

    for(deviceID in data.devices) {
      var ro_removeConnectedWebClient = await removeConnectedWebClient(id, data.devices[deviceID]);
      if(!ro_removeConnectedWebClient.success()) {
        return ro_removeConnectedWebClient;
      }
    };
  } else {
    return new ReturnObject(false, ('Something in the database is missing for client ID: ' + id))
  }

  return new ReturnObject(true);
}

async function addConnectedWebClient(webID, deviceID) {
  const docRef = db.collection('ids').doc(deviceID);
  const doc = await docRef.get();
  const data = doc.data();

  if(doc.exists) {
    if(data.actives) {
      data.actives.push(webID)
      docRef.update({actives: data.actives});
    } else {
      return new ReturnObject(false, ('Active connections is missing in database for device ID: ' + id))
    }
  } else {
    return new ReturnObject(false, 'Device was not found in database');
  }
  return new ReturnObject(true);
}
async function removeConnectedWebClient(webID, deviceID) {
  const docRef = db.collection('ids').doc(deviceID);
  const doc = await docRef.get();
  const data = doc.data();

  if(doc.exists) {
    if(data.actives) {
      data.actives.push(webID)
      newActives = data.actives.filter(item => item !== webID)

      docRef.update({actives: newActives});
    } else {
      return new ReturnObject(false, ('Active connections is missing in database for device ID: ' + id))
    }
  } else {
    return new ReturnObject(false, 'Device was not found in database');
  }
  return new ReturnObject(true);
}

module.exports = {
  initWebFirestore,
  terminateWebFirestore
};