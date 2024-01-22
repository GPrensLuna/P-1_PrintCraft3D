import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import {
  APIKEY,
  APPID,
  AUTH,
  ID,
  MESSAGING,
  PROJECTSID,
  STORAGE,
} from "@/config";
const firebaseConfig = {
  apiKey: `${APIKEY}`,

  authDomain: `${AUTH}`,

  projectId: `${PROJECTSID}`,

  storageBucket: `${STORAGE}`,

  messagingSenderId: `${MESSAGING}`,

  appId: `${APPID}`,

  measurementId: `${ID}`,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  analytics,
  auth,
  database,
  signInWithPopup,
  GoogleAuthProvider,
  ref,
  set,
  get,
};
