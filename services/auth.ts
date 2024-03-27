import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { firebaseApp } from "./firebaseConfig";
import * as firebaseAuth from "firebase/auth";

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const auth = initializeAuth(firebaseApp, {
  persistence: reactNativePersistence(AsyncStorage),
});
const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("User registered with email: ", userCredential.user.email);
};

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in with email: ", userCredential.user.email);
  } catch (error) {
    console.error("Error signing in: ", error);
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export { signUp, signIn, logOut, onAuthStateChanged };
