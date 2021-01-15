import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Icon, CheckBox, ListItem, Card } from 'react-native-elements';

export default class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <View >
       <Text>
           Este es el inicio de la app
       </Text>
      </View>
    );
  }

  componentDidMount = () => {
  }

  componentDidUpdate() {
 }

}

