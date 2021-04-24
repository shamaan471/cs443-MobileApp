import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen, {screenOptions as homeScreenOptions} from '../screens/HomeScreen';
import UrlListScreen , {screenOptions as urlListScreenOp} from '../screens/UrlListScreen';



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


const Tab = createBottomTabNavigator();
export const MainTabNavigator = () => {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'UrlList') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: {
          backgroundColor: Colors.primary
        },
        headerTintColor: Colors.accent
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={homeScreenOptions}/>
        <Tab.Screen name="UrlList" component={UrlListScreen} options={urlListScreenOp}/>
      </Tab.Navigator>
  );
}
