import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button } from "../components/button";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { firebaseApp } from "../services/firebaseConfig"; // Adjust the import path as necessary
import { createPost } from "../services/firestore";
import { logOut } from "../services/auth";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isPosting, setIsPosting] = useState(false);
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<
    {
      id: string;
      email: string;
      userId: string;
      content: string;
      createdAt: Timestamp;
    }[]
  >([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore(firebaseApp);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "desc"))
    );
    const fetchedPosts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // @ts-ignore
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    setIsPosting(true);
    if (user && content.trim()) {
      await createPost({
        userId: user.uid,
        content,
        email: user.email,
      });
      setIsPosting(false);

      setContent("");
      fetchPosts();
    }
  };

  const formatDate = (timestamp: Timestamp) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = timestamp.toDate();

    return (
      date.toLocaleDateString(undefined, options) +
      " " +
      date.toLocaleTimeString(undefined, options)
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.logout}
        onPress={() => {
          logOut();
          // @ts-expect-error TODO: Fix  types
          navigation.navigate("Login");
        }}
      >
        Logout
      </Text>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button loading={isPosting} label="Post" onPress={handleCreatePost} />
      <ScrollView style={styles.postsContainer}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <Text style={styles.postContent}>{post.content}</Text>
            <Text style={styles.postInfo}>Posted by: {post.email}</Text>
            <Text style={styles.postInfo}>
              On: {formatDate(post.createdAt)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 60,
  },
  input: {
    width: "100%",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  postsContainer: {
    flex: 1,
    width: "100%",
  },
  post: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Necessary for Android
  },
  postContent: {
    fontSize: 16,
  },
  postInfo: {
    fontSize: 12,
    marginTop: 4,
  },
  logout: {
    textAlign: "right",
    width: "100%",
    marginBottom: 16,
  },
});

export default HomeScreen;
