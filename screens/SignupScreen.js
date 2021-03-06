import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
  } from 'react-native';

import Colors from '../constants/Colors';
import Input from '../components/UI/Input'
import Card from '../components/UI/Card';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const SignupScreen = props => {

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            fullName: '',
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        //formIsValid: false
    });


    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);



    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
    );

    const signUpHandler = async () => {
        let action;
        action = authActions.signup(
            formState.inputValues.fullName,
            formState.inputValues.email,
            formState.inputValues.password
        );
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            //props.navigation.navigate('Login');
          } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }


    return (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}
        >

            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id="fullName"
                        label="Full Name"
                        keyboardType="default"
                        required
                        autoCapitalize="words"
                        errorText="Please enter a valid Full Name"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please enter a valid email address."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <Input
                        id="password"
                        label="Password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={5}
                        autoCapitalize="none"
                        errorText="Please enter a valid password."
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />

                    {isLoading? (
                      <View style={styles.buttonContainer}>
                        <ActivityIndicator/>
                      </View>
                    ):
                    (
                      <View>
                        <View style={styles.buttonContainer}>
                          <Button
                            title = 'Create Account'
                            color={Colors.primary}
                            onPress={signUpHandler}
                          />
                      </View>
                      
                      <View style={styles.buttonContainer}>
                          <Button
                            title = 'Go Back'
                            color={Colors.primary}
                            onPress={() => props.navigation.goBack()}
                          />
                      </View>
                    </View>
                  )}
                </ScrollView>
            </Card>
          
        </KeyboardAvoidingView>
    );

};


// export const screenOptions = {
//     headerTitle: 'Signup'
// };
  
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'skyblue'
    },
    gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    authContainer: {
      width: '80%',
      maxWidth: 400,
      maxHeight: 800,
      padding: 20
    },
    buttonContainer: {
      marginTop: 10,
    }
});

export default SignupScreen;