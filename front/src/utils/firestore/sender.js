const db = require('./init');

const BaseDao = {

    list: async (collectionPath) => {

        const docRef = db.collection(collectionPath);

        const doc = await docRef.get();

        if (doc.exists) return doc.data();
        else return null;
    },
    add: async (collectionPath, item) => {

        const id = item.id;
        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).set({...item, create_at: new Date()});
    },
    addMulti: async (collectionPath, items) => {

        return await Promise.all(items.map(item => SenderUtils.add(collectionPath, item)));
    },
    update: async (collectionPath, item) => {

        const id = item.id;
        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).update({...item, update_at: new Date()});
    },
    del: async (collectionPath, id) => {

        const docRef = db.collection(collectionPath);
        return await docRef.doc(id).delete();
    },
}

module.exports = SenderUtils;