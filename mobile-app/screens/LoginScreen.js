import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
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

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
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
    },
    false
  );

  const signUpHandler = () => {
    navigation.navigate('SignupScreen');
  };

  const dispatch = useDispatch();

  const logInHandler = async () => {
    await dispatch(
      authActions.login(
        formState.inputs.email.value,
        formState.inputs.password.value
      )
    );
  };

  const error = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured', error, [{ text: 'Okay' }]);
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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <View style={styles.screen}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>Welcome!</Text>
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

            <View style={styles.buttonContainer}>
              <MainButton
                disabled={isLoading}
                linearGradient
                colors={isLoading && ['#9c9c9c', '#9c9c9c']}
                style={styles.button}
                textStyle={[styles.buttonText, { color: '#fff' }]}
                onClick={logInHandler}
              >
                {!isLoading ? (
                  'Log in'
                ) : (
                  <ActivityIndicator size="large" color={Colors.primary} />
                )}
              </MainButton>
              <MainButton
                disabled={isLoading}
                onClick={signUpHandler}
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
                Sign Up
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
});

export default LoginScreen;
