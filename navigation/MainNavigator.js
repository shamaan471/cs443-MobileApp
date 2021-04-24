import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors'

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen, {screenOptions as homeScreenOptions} from '../screens/HomeScreen';



const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: Colors.accent
};



//stack navigator for auth
const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        //options={authScreenOptions}
      />
      <AuthStackNavigator.Screen
        name="Signup"
        component={SignupScreen}
        //options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};


//stack for main app
const MainStackNavigator = createStackNavigator();
export const MainNavigator = () => {
    return (
        <MainStackNavigator.Navigator screenOptions={defaultNavOptions}>
          <MainStackNavigator.Screen
            name="Home"
            component={HomeScreen}
            options={homeScreenOptions}
          />
        </MainStackNavigator.Navigator>
    );
}; 
