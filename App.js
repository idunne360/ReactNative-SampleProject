import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme, AppRegistry } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { registerRootComponent } from 'expo';

registerRootComponent( App );

import LittleLemonHeader from './components/LittleLemonHeader';
import LittleLemonFooter from './components/LittleLemonFooter';

import WelcomeScreen from './components/WelcomeScreen';
import MenuItems from './components/MenuItems';
import FeedbackForm from './components/FeedbackForm';
import LoginScreen from './components/LoginScreen';
import Preferences from './components/Preferences';
import Customers from './components/CustomersScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = 'dark';

  return (
    <NavigationContainer>
      <View style={styles.container}>
          <LittleLemonHeader />
          <Tab.Navigator 
            screenOptions={({ route }) => ({
              tabBarIcon: ({size}) => {
                let iconName;
                if (route.name === 'Welcome') {
                  iconName = 'home-outline';
                } else if (route.name === 'Login') {
                  iconName = 'person-outline';
                } else if (route.name === 'Menu') {
                  iconName = 'restaurant-outline'
                } else if (route.name === 'Feedback') {
                  iconName = 'help-circle-outline'
                } else if (route.name === 'Preferences') {
                  iconName = 'settings-outline'
                } else if (route.name === 'Customers') {
                  iconName = 'people-outline'
                }
                return <Ionicons name={iconName} size={size} />;
              },
            })}
            initialRouteName="Welcome">
            <Tab.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Tab.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
            <Tab.Screen name="Menu" options={{headerShown: false}} component={MenuItems} />
            <Tab.Screen name="Feedback" options={{headerShown: false}} component={FeedbackForm} />
            <Tab.Screen name="Preferences" options={{headerShown: false}} component={Preferences} />
            <Tab.Screen name="Customers" options={{headerShown: false}} component={Customers} />
          </Tab.Navigator>
        </View>
        <View style={styles.footerContainer}>
          <LittleLemonFooter />
        </View>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
  },
  footerContainer: { backgroundColor: '#495E57' }
});
