import React from 'react';
import { Text, View } from 'react-native';
import { Image, Input, Button, Overlay} from 'react-native-elements';

import auth from '@react-native-firebase/auth';

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      overlayVisible: false,
    };
  }

  onClickCrear = () => {
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        console.log('User account created & signed in!');
        this.overlayNotVisible()
        this.props.navigation.navigate('NavegadorDeInicio')
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  onClickSiguiente = () => {
    console.log(this.state)
    auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        console.log('User account created & signed in!');
        this.props.navigation.navigate('NavegadorDeInicio')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ overlayVisible: true })
        console.log(errorMessage)
      });
  }

  overlayNotVisible = () => {
    this.setState({ overlayVisible: false })
  }
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fdd009', justifyContent:'center', alignItems:'center' }} >
        <View style={{ width:'30%', height:'50%', backgroundColor: 'white', alignItems:'center', borderRadius:10 }}>
          <Image
            resizeMode='contain'
            source={require('../assets/treinta-logo-yellow-gmail-1.png')}
            style={{ width: 100, height: 100 }}
          />
        <Text style={{fontSize:16}}>Acceder</Text>
          <Input
            placeholder='correo'
            leftIcon={{ name: 'email', color:'#fdd009', size:30 }}
            onChangeText={(e) => { this.setState({ email: e }) }}
          />
          <Input
            secureTextEntry={true}
            placeholder='password'
            leftIcon={{ name: 'lock-outline', color: '#fdd009', size: 30 }}
            onChangeText={(e) => { this.setState({ password: e }) }}
          />
          <View style={{width:'100%', flexDirection:'row', justifyContent:'space-around'}}>
            <Button
              disabled={!(this.state.email && this.state.password)}
              titleStyle={{ color: '#fdd009' }}
              title="Registrarse"
              type="clear"
              onPress={()=>{this.onClickCrear()}}
            />
            <Button
              disabled={!(this.state.email && this.state.password)}
              buttonStyle={{backgroundColor:'#fdd009'}}
              titleStyle={{color:'black'}}
              title="Siguiente"
              onPress={()=>{this.onClickSiguiente()}}
            />
          </View>
        </View>
        <Overlay 
          isVisible={this.state.overlayVisible}
          onBackdropPress={() => this.overlayNotVisible()}
          overlayStyle={{ height: '40%', width: '40%', justifyContent: 'center', flexDirection: 'row', borderRadius: 10, position: 'relative' }}
        >
          <View style={{alignItems:'center', justifyContent:'space-evenly'}}>
            <View style={{alignItems:'center'}}>
              <Text style={{ fontSize: 30 }}>Usuario no registrado</Text>
              <Text style={{ fontSize: 30 }}>¿Desea registrarse?</Text>
            </View>
            <View style={{ width:'70%'}}>
              <Input
                placeholder='correo'
                value={this.state.email}
                leftIcon={{ name: 'email', color: '#fdd009', size: 30 }}
                onChangeText={(e) => { this.setState({ email: e }) }}
              />
              <Input
                secureTextEntry={false}
                placeholder='password'
                value={this.state.password}
                leftIcon={{ name: 'lock-outline', color: '#fdd009', size: 30 }}
                onChangeText={(e) => { this.setState({ password: e }) }}
              />
            </View>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-around'}}>
              <Button
                buttonStyle={{ backgroundColor: '#fdd009', }}
                titleStyle={{ color: 'black' }}
                title="Sí"
                onPress={() => { this.onClickCrear() }}
              />
              <Button
                buttonStyle={{ backgroundColor: '#fdd009', }}
                titleStyle={{ color: 'black' }}
                title="No"
                onPress={() => { this.overlayNotVisible() }}
              />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }

  componentDidMount = () => {
  }

  componentDidUpdate() {
 }

}

