import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import NavegadorDeInicio from './Screens/navegadorDeInicio';
import Inicio from './Screens/inicio';

const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usuarioLogueado: false,
    };
  }
  usuarioLogueadoTrue = () => {
    this.setState({ usuarioLogueado: true })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* {this.state.usuarioLogueado ?
              <Stack.Screen name="NavegadorDeInicio" component={NavegadorDeInicio} options={{ headerShown: false }} /> :
              <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />} */}
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} usuarioLogueadoTrue={() => this.usuarioLogueadoTrue()} />
            <Stack.Screen name="NavegadorDeInicio" component={NavegadorDeInicio} options={{ headerShown: false }} />   
          </Stack.Navigator>
        </NavigationContainer>
      </View>

    );
  }
}

