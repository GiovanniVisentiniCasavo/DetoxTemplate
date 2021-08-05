/**
 * This is an example project for Detox library
 * When you open an issue, please add a screen which reproduce the problem
 */

import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import * as Screens from './Screens/index';
import { Provider } from 'react-redux'
import {buildLoginNeededAction, configureStore} from "./reducer";


const store = configureStore()

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: undefined,
      screenProps: {},
    };

  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=>{
      const loginState = store.getState()
      if(loginState.signInStatus.requestDone){
        this.setState({screen: Screens.ExampleScreen});
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  renderScreenButton = (title, component) => {
    return this.renderButton(title, () => {
      store.dispatch(buildLoginNeededAction())
    });
  };

  renderButton = (title, onPressCallback) => {
    return (
      <TouchableOpacity onPress={() => {
        onPressCallback();
      }}>
        <Text style={{color: 'blue', marginBottom: 8, fontSize: 20}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  renderScreen = (screen) => {
    const Screen = this.state.screen;
    return <Screen setScreen={screen}/>;
  };

  render() {
    if (this.state.screen) {
      const screen = this.state.screen;
      return this.renderScreen(screen);
    }

    return (
        <Provider store={store}>
      <View style={{flex: 1, marginTop: 80, marginHorizontal:50}}>
          <Text style={{textAlign: 'center', fontSize: 30, marginBottom: 10}}>
            Detox Template
          </Text>
          <Text style={{fontSize: 20, marginBottom: 20, color: 'grey'}}>
            Welcome to the Detox Template. Please add a screen with your example/issue below.
          </Text>
        {this.renderScreenButton('Example screen', Screens.ExampleScreen)}
      </View>
        </Provider>
    );
  }
}
