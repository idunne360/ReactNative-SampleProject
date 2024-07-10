import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useUpdate from './useUpdate';
export default function Preferences({ navigation }) {
  const [preferences, setPreferences] = React.useState({
    pushNotifications: false,
    emailMarketing: false,
    latestNews: false,
  });

  const updateState = (key) => () =>
    setPreferences((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }
  ));

  useEffect(() => {
    (async () => {
      try {
        const preferences = await AsyncStorage.multiGet([
          'pushNotifications',
          'emailMarketing',
          'latestNews',
        ]);
        setPreferences({
          pushNotifications: preferences[0][1] === 'true',
          emailMarketing: preferences[1][1] === 'true',
          latestNews: preferences[2][1] === 'true',
        });
      } catch (e) {
        Alert.alert(`An error occurred: ${e.message}`);
      }
    })();
  }, []);

  useUpdate(() => { 
    (async () => { 
      // Every time there is an update on the preference state, we persist it on storage 
      // The exercise requirement is to use multiSet API 
      const keyValues = Object.entries(preferences).map((entry) => { 
        return [entry[0], String(entry[1])]; 
      }); 
      try { 
        await AsyncStorage.multiSet(keyValues); 
      } catch (e) { 
        Alert.alert(`An error occurred: ${e.message}`); 
      } 
    })(); 
  }, [preferences]);



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Preferences</Text>
      <View style={styles.row}>
        <Text style={{color: '#EDEFEE',}}>Push notifications</Text>
        <Switch
          color='#EDEFEE'
          value={preferences.pushNotifications}
          onValueChange={updateState('pushNotifications')}
        />
      </View>
      <View style={styles.row}>
        <Text style={{color: '#EDEFEE',}} >Marketing emails</Text>
        <Switch
          color='#EDEFEE'
          value={preferences.emailMarketing}
          onValueChange={updateState('emailMarketing')}
        />
      </View>
      <View style={styles.row}>
        <Text style={{color: '#EDEFEE',}}>Latest news</Text>
        <Switch
          color='#EDEFEE'
          value={preferences.latestNews}
          onValueChange={updateState('latestNews')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#495E57',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  header: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switch: {
    color: '#EDEFEE',
  },
});
