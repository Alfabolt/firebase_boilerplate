import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { signUp } from "./services/auth";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigators/AppNavigator";

export default function App() {
  const localSignUp = async () => {
    await signUp("ali@alfabolt.com", "Alfabolt123!");
  };

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator initialRouteName={user ? "Home" : "Login"} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
