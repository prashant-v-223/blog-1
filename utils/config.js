import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "*****",
  authDomain: "*****",
  databaseURL: "*****",
  projectId: "*****",
  storageBucket: "*****",
  messagingSenderId: "*****",
  appId: "*****",
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage();