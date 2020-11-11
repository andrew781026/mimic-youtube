const {auth} = require('./init');

const errorCodeMapper = {
    'auth/invalid-email': '帳號請輸入正確的電子郵件 !',
    'auth/weak-password': '密碼請輸入至少 6 碼 !',
    'auth/email-already-in-use': '帳號已被使用 !',
    'auth/wrong-password': '密碼錯誤 !',
    'auth/user-not-found': '找不到此帳戶 !',
}

const FirebaseAuth = {

    errorCodeMapper,

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
        return FirebaseAuth._formatter(userData);
    },

    signInWithEmailAndPassword: async (email, password) => {

        const userData = await auth.signInWithEmailAndPassword(email, password);
        return FirebaseAuth._formatter(userData);
    },

}


module.exports = FirebaseAuth;
