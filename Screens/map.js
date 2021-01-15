import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Icon, CheckBox, ListItem, Card } from 'react-native-elements';

const puntos = require('../assets/listadoDePuntos');

export default class map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      presentLatitude: 4.653703,
      presentLongitude: -74.103473,
    };
  }
  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  renderMarkers = () => {
    let listadoDePuntos = puntos.puntos
    return listadoDePuntos.map(punto =>
      <Marker
        key={punto.name}
        style={{ backgroundColor: 'transparent' }}
        coordinate={{
          latitude: punto.lat,
          longitude: punto.long,
        }}
        onDragEnd={(e) => console.log(JSON.stringify(e.nativeEvent.coordinate))}
        title={punto.name}
        description={punto.description}
      ><Icon name={'location-on'} color={'#fdd009'} size={30} /></Marker>
    )
  }

  

  render() {
    return (
      <View style={{flex:1}}>
        <MapView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          onLayout={this.onMapLayout}
          region={{
            latitude: this.state.presentLatitude,
            longitude: this.state.presentLongitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.isMapReady ? this.renderMarkers() : null}
        </MapView>
      </View>
    );
  }

  componentDidMount = () => {
    //this.renderMarkers()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
    }
 }

}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
