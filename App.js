import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import NavegadorDeInicio from './Screens/navegadorDeInicio';
import Inicio from './Screens/inicio';

const Stack = createStackNavigator();
const usuarioLogueado = false;

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {usuarioLogueado ?
            <Stack.Screen name="NavegadorDeInicio" component={NavegadorDeInicio} options={{ headerShown: false }} /> :
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />}
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}

