const {auth} = require('./init');

const FirebaseAuth = {

    _formatter: data => ({
        ...data,
        uid: data.user.uid,
        displayName: data.user.displayName,
        photoURL: data.user.displayName,
        email: data.user.email,
        emailVerified: data.user.emailVerified,
        phoneNumber: data.user.phoneNumber,
    }),

    createUserWithEmailAndPassword: async (email, password) => {

        const userData = await auth.createUserWithEmailAndPassword(email, password);
        return formatter(userData);
    },

    signInWithEmailAndPassword: async (email, password) => {

        const userData = await auth.signInWithEmailAndPassword(email, password);
        return formatter(userData);
    },

}


module.exports = FirebaseAuth;
