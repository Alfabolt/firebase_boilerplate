import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "../components/button";
import { signUp } from "../services/auth";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signUp(email, password);
      // @ts-expect-error TODO: Fix  types
      navigation.navigate("Login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button loading={loading} label="Register" onPress={handleLogin} />

        <TouchableOpacity
          onPress={() => {
            // @ts-expect-error TODO: Fix  types
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.registerText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  innerContainer: {
    width: "90%",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  registerText: {
    fontSize: 16,
    color: "#0077b6",
    textAlign: "center",
  },
});

export default RegisterScreen;
