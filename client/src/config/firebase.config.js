import { getApp, getApps, initializeApp } from 'firebase/app'
// import { getStorage } from 'firebase/storage'
// import {getFirestore}from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDpRBr9__3vUgG0ooPXG-eX0kYxJV2TZ2c',
	authDomain: 'panacea-firebase-auth.firebaseapp.com',
	projectId: 'panacea-firebase-auth',
	storageBucket: 'panacea-firebase-auth.appspot.com',
	messagingSenderId: '526197583494',
	appId: '1:526197583494:web:b3e2ce7b4d41110308eb07',
	measurementId: 'G-9B7LF4ZT79',
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
// const storage = getStorage(app)
// const db=getFirestore(app)
export {app}