import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../components/utils/validators';
import { useForm } from '../components/hooks/form-hook';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/Colors';
import Input from '../components/UI/Input';
import MainButton from '../components/UI/MainButton';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../store/actions/authActions';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const password = formState.inputs.password.value;
    const confirmPassword = formState.inputs.confirmPassword.value;
    if (formState.isValid && password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [formState]);

  const logInHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const dispatch = useDispatch();

  const signUpHandler = async () => {
    await dispatch(
      authActions.signup(
        formState.inputs.email.value,
        formState.inputs.password.value
      )
    );
  };

  const clearError = async () => {
    await dispatch(authActions.clearError);
  };
  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured', error, [
        {
          text: 'Okay',
          onPress: () => {
            clearError;
          },
        },
      ]);
    }
  }, [error]);

  const emailIcon = <Ionicons name="person-outline" size={24} color="black" />;
  const emailIcon2 = formState.inputs.email.isValid && (
    <Animatable.View animation="bounceIn">
      <Ionicons name="md-checkmark-circle-outline" size={24} color="green" />
    </Animatable.View>
  );
  const passIcon = (
    <Ionicons name="md-lock-closed-outline" size={22} color="black" />
  );
  const passIcon2 = (
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Ionicons name="eye-off-outline" size={22} color="black" />
    </TouchableOpacity>
  );
  const passIcon3 = (
    <TouchableOpacity
      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      <Ionicons name="eye-off-outline" size={22} color="black" />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Register now!</Text>
        </View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <ScrollView>
            <Input
              label="Email"
              placeholder="Your email address"
              icon1={emailIcon}
              icon2={emailIcon2}
              autoCapitalize="none"
              id="email"
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              autoCorrect={false}
            />
            <View style={{ marginTop: 35 }}>
              <Input
                label="Password"
                placeholder="Your password"
                icon1={passIcon}
                icon2={passIcon2}
                secureTextEntry={showPassword ? false : true}
                autoCapitalize="none"
                id="password"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a stronger password. Your password should contain at least 6 characters."
                onInput={inputHandler}
                autoCorrect={false}
              />
            </View>
            <View style={{ marginTop: 35 }}>
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                icon1={passIcon}
                icon2={passIcon3}
                secureTextEntry={showConfirmPassword ? false : true}
                autoCapitalize="none"
                id="confirmPassword"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a stronger password. Your password should contain at least 6 characters."
                onInput={inputHandler}
                autoCorrect={false}
              />
            </View>
            {formState.isValid && !passwordMatch && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Passwords do not match.</Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <MainButton
                disabled={isLoading}
                linearGradient
                colors={isLoading && ['#9c9c9c', '#9c9c9c']}
                style={styles.button}
                textStyle={[styles.buttonText, { color: '#fff' }]}
                onClick={signUpHandler}
              >
                {!isLoading ? (
                  'Sign up'
                ) : (
                  <ActivityIndicator size="large" color={Colors.primary} />
                )}
              </MainButton>
              <MainButton
                disabled={isLoading}
                onClick={logInHandler}
                style={
                  isLoading
                    ? [
                        styles.button,
                        {
                          borderColor: '#9c9c9c',
                          borderWidth: 1,
                          marginTop: 20,
                        },
                      ]
                    : [
                        styles.button,
                        {
                          borderColor: Colors.primary,
                          borderWidth: 1,
                          marginTop: 20,
                        },
                      ]
                }
                textStyle={
                  isLoading
                    ? [styles.buttonText, { color: '#9c9c9c' }]
                    : [styles.buttonText, { color: Colors.primary }]
                }
              >
                Log in
              </MainButton>
            </View>
          </ScrollView>
        </Animatable.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontFamily: 'open-sans-bold',
    color: '#fff',
    fontSize: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
});

export default SignUpScreen;
