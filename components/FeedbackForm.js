import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
} from "react-native";

const FeedbackForm = ({ navigation }) => {
  const [firstName, onChangeFirstName] = useState("");
  const [lastName, onChangeLastName] = useState("");
  const [message, onChangeMessage] = useState("");

  return (
    <ScrollView style={styles.container} keyboardDismissMode="on-drag">
      <Text style={styles.headingSection}>
        How was your visit to Little Lemon?
      </Text>
      <Text style={styles.infoSection}>
        We would love to hear your experience with us!
      </Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={onChangeFirstName}
        placeholder="First name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={onChangeLastName}
        placeholder="Last name"
      />
      <TextInput
        style={styles.messageInput}
        value={message}
        onChangeText={onChangeMessage}
        placeholder="Feedback"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#495E57",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
    backgroundColor: "#fff",
  },
  messageInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  infoSection: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
    backgroundColor: "#495E57",
  },
  headingSection: {
    fontSize: 28,
    padding: 20,
    marginVertical: 8,
    color: "#EDEFEE",
    textAlign: "center",
    backgroundColor: "#495E57",
  },
  linkText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: "lightblue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default FeedbackForm;
