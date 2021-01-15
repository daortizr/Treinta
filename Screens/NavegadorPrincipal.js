import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NavegadorDeInicio from './navegadorDeInicio';
import Login from './Ingreso';

import { connect } from 'react-redux';


const Stack = createStackNavigator();

const MainNavigator = (props) => {
    return (
        <View style={{ flex:1}}>
            <NavigationContainer>
                <Stack.Navigator>
                    {!props.elUsuarioEstaLogeado ? (
                        <>
                            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                            <Stack.Screen name="azureLogin" component={AzureLogin} options={{ headerShown: false}} />
                        </>
                   ) : (
                        <Stack.Screen name="NavegadorDeInicio" component={NavegadorDeInicio} options={{ headerShown: false }} />
                    )}
                </Stack.Navigator>          
            </NavigationContainer>
        </View>
    )
}

const mapStateToProps = state => ({
    elUsuarioEstaLogeado: state.reducerParaUsuario.elUsuarioEstaLogeado,
});

// export default (MainNavigator);
export default connect(mapStateToProps)(MainNavigator);
