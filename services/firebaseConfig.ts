import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwM6fXqJhKFxUrjqYvqH-IAXshnzSatJ4",
  authDomain: "dummy-social-aa334.firebaseapp.com",
  projectId: "dummy-social-aa334",
  storageBucket: "dummy-social-aa334.appspot.com",
  messagingSenderId: "396210133099",
  appId: "1:396210133099:web:091982ee9a402cdecdf92e",
  measurementId: "G-4HTMM5LYJQ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firestoreDb = getFirestore(firebaseApp);

export { firebaseApp, firestoreDb };
