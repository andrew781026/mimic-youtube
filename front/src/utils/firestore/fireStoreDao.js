const db = require('./init');

const FireStoreDao = {

    list: async (collectionPath) => {

        const querySnapshot = await db.collection(collectionPath).get();

        return querySnapshot.docs.map(doc => ({_id: doc.id, ...doc.data()}));
    },
    findById: async (collectionPath, id) => {

        const doc = await db.collection(collectionPath).doc(id).get();

        if (doc.exists) return doc.data();
        else return null;
    },
    add: async (collectionPath, item) => {

        const id = item.id;
        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).set({...item, create_at: new Date()});
    },
    addMulti: async (collectionPath, items) => {

        return await Promise.all(items.map(item => FireStoreDao.add(collectionPath, item)));
    },
    update: async (collectionPath, item) => {

        const id = item.id;
        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).update({...item, update_at: new Date()});
    },
    delete: async (collectionPath, id) => {

        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).delete();
    },
}

module.exports = FireStoreDao;
