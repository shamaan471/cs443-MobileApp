import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator, AuthNavigator } from './MainNavigator';
import {MainTabNavigator} from './MainNavigator';



const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.userId);

  return (
    <NavigationContainer>
      {isAuth && <MainTabNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;