import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from './home';
import Mapa from './map';
import Info from './infoApp';

const Tab = createBottomTabNavigator();

export default function NavegadorDeInicio() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{ tabBarVisible: true }} />
      <Tab.Screen name="Info" component={Info} options={{ tabBarVisible: true }} />
      <Tab.Screen name="Mapa" component={Mapa} options={{ tabBarVisible: true }} />
    </Tab.Navigator>

  );
}

