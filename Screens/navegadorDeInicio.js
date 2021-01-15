import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Inicio from './inicio';
import Mapa from './map';
import Info from './infoApp';

const Tab = createBottomTabNavigator();

export default function NavegadorDeInicio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Inicio} options={{ tabBarVisible: true }} />
      <Tab.Screen name="Info" component={Info} options={{ tabBarVisible: true }} />
      <Tab.Screen name="Mapa" component={Mapa} options={{ tabBarVisible: true }} />
    </Tab.Navigator>

  );
}

