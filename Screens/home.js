import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Icon, CheckBox, ListItem, Card } from 'react-native-elements';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 30 }}>La contabilidad de tu negocio en tu mano</Text>
        </View>
      </View>
    );
  }

  componentDidMount = () => {
  }

  componentDidUpdate() {
  }

}

