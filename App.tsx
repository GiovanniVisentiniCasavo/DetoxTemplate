/**
 * This is an example project for Detox library
 * When you open an issue, please add a screen which reproduce the problem
 */
import {Provider, useDispatch, useSelector} from 'react-redux';
import {
  buildLoginNeededAction,
  configureStore,
  loginStatusSelector,
} from './reducer';
import React, {useCallback, useEffect} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {ExampleScreen} from './Screens';
import {useNetInfo} from '@react-native-community/netinfo';
import {SignInState} from './state';
const store = configureStore();

const LoginButton = () => {
  const dispatch = useDispatch();

  const onPressCallback = useCallback(() => {
    dispatch(buildLoginNeededAction());
  }, [dispatch]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPressCallback();
      }}>
      <Text style={{color: 'blue', marginBottom: 8, fontSize: 20}}>
        Example screen
      </Text>
    </TouchableOpacity>
  );
};

const ButtonScreen: React.FC = () => {
  return (
    <View style={{flex: 1, marginTop: 80, marginHorizontal: 50}}>
      <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 10}}>
        Detox Template
      </Text>
      <Text style={{fontSize: 20, marginBottom: 20, color: 'grey'}}>
        Welcome to the Detox Template. Please add a screen with your
        example/issue below.
      </Text>
      <LoginButton />
    </View>
  );
};

const Login: React.FC = () => {
  const signInState = useSelector(loginStatusSelector);
  const netInfo = useNetInfo();
  useEffect(() => {
    console.log(netInfo);
  }, [netInfo]);
  switch (signInState.state) {
    case SignInState.OperationOngoing:
      return <View style={{flex: 1, backgroundColor: 'blue'}} />;
    case SignInState.VerificationCodeNeeded:
      return <ExampleScreen />;
    case SignInState.Unknown:
      return <ButtonScreen />;
  }
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
};
