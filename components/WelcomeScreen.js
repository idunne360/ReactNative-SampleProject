import React, { useState } from "react";
import {
  useWindowDimensions,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  View,
} from "react-native";

export default function WelcomeScreen({ navigation }) {
  const [firstName, onChangeFirstName] = useState("");
  const window = useWindowDimensions();
  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <Image
        style={styles.logo}
        source={require("../img/LittleLemonLogo.png")}
      />
      <Text style={styles.regularText}>
        Little Lemon is a charming neighborhood bistro that serves simple food
        and classic cocktails in a lively but casual environment.
      </Text>
      <Image
        style={{ width: window.width * 0.75, height: 250, alignSelf: "center" }}
        source={require("../img/lemons.jpg")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
  },
  logo: {
    height: 100,
    width: window.width,
    backgroundColor: "gray",
    resizeMode: "contain",
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
  },
  linkText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "lightblue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#EDEFEE",
  },
});
