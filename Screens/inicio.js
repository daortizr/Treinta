import React from 'react';
import { Text, View } from 'react-native';
import { Image, Input, Button} from 'react-native-elements';

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
          />
          <Input
            placeholder='password'
            leftIcon={{ name: 'lock-outline', color:'#fdd009', size:30 }}
          />
          <View style={{width:'100%', flexDirection:'row', justifyContent:'space-around'}}>
            <Button
            titleStyle={{color:'#fdd009'}}
              title="Registrarse"
              type="clear"
            />
            <Button
              buttonStyle={{backgroundColor:'#fdd009'}}
              titleStyle={{color:'black'}}
              title="Siguiente"
            />
          </View>
        </View>
      </View>
    );
  }

  componentDidMount = () => {
  }

  componentDidUpdate() {
 }

}

