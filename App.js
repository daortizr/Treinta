import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import NavegadorDeInicio from './Screens/navegadorDeInicio';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NavegadorDeInicio" component={NavegadorDeInicio} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>

  );
}

