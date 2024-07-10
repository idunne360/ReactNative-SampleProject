import { ScrollView, Text, StyleSheet, TextInput, Alert, Pressable} from 'react-native';
import React, { useState } from 'react';

export default function LoginScreen({navigation}) {
  const [loggedIn, onLogin] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  return (
    <>
    <ScrollView style={styles.container} keyboardDismissMode='on-drag'>
      <Text style={styles.regularText}>Login to continue </Text>
      <TextInput
        style={styles.inputBox}
        value={email}
        keyboardType={'email-address'}
        onChangeText={onChangeEmail}
        placeholder={'email'}
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        secureTextEntry={true}
        onChangeText={onChangePassword}
        placeholder={'password'}
      />
      <Pressable onPress={() => onLogin(!loggedIn)} style={styles.button}>
        <Text style={styles.buttonText}>{loggedIn ? 'Log Out' : 'Log In'}</Text>
      </Pressable>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  linkText: {
    fontSize: 24,
    paddingTop: 20,
    color: 'lightblue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  headerText: {
    padding: 40,
    fontSize: 30,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 24,
    padding: 20,
    marginVertical: 8,
    color: '#EDEFEE',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'EDEFEE',
    backgroundColor: '#EDEFEE',
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 40,
    backgroundColor: '#EDEFEE',
    borderColor: '#EDEFEE',
    borderWidth: 2,
    borderRadius: 8
  },
  buttonText: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 26,
  },
});

