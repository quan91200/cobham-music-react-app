import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqT0_fw1r1oo0iGiXgoZaARdttAdwMwuc",
  authDomain: "musicapp-7c251.firebaseapp.com",
  projectId: "musicapp-7c251",
  storageBucket: "musicapp-7c251.appspot.com",
  messagingSenderId: "716573487739",
  appId: "1:716573487739:web:b2de90750b85b81a3168de",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
