import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { firestoreDb } from "./firebaseConfig"; // Ensure you're exporting 'app' from your firebaseConfig file

interface Post {
  userId: string;
  email: string;
  content: string;
}

const createPost = async (post: Post) => {
  try {
    await addDoc(collection(firestoreDb, "posts"), {
      ...post,
      createdAt: Timestamp.fromDate(new Date()), // Use Timestamp from Firestore
    });
  } catch (error) {
    console.log("here now");

    console.error("Error creating post:", error);
  }
};

export { createPost };
