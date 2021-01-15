import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Icon, CheckBox, ListItem, Card } from 'react-native-elements';

export default class Info extends React.Component {
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
        <View style={{ flex: 8, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', margin:10, }}>

            <View style={{ flex: 1, flexDirection: 'column', }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}><Icon name={'cash-register'} type='material-community' color={'#fdd009'} size={50} /></View>
                <View>
                  <Text style={{ fontSize: 30 }}>Registra todas las ventas y gastos</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                <Text style={{ fontSize: 20 }}>Registra los ingresos, los gastos y las cuentas por cobrar y pagar</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}><Icon name={'bar-chart'} color={'#fdd009'} size={50} /></View>
                <View>
                  <Text style={{ fontSize: 30 }}>Visualiza la utilidad del negocio al</Text>
                  <Text style={{ fontSize: 30 }}>instante</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                <Text style={{ fontSize: 20 }}>Obtén información diaria, semanal y mensual de la utilidad del negocio</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'column', }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}><Icon name={'attach-money'} color={'#fdd009'} size={50} /></View>
                <View>
                  <Text style={{ fontSize: 30 }}>Cobra puntualmente la deuda de tus</Text>
                  <Text style={{ fontSize: 30 }}>clientes</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems:'center' }}>
                <Text style={{ fontSize: 20 }}>Obtén pagos de las deudas de tus clientes más rápido con el registro de deudas pendientes</Text>
              </View>
            </View>

          </View>

          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', margin:10 }}>
            <View style={{ flex: 1, flexDirection: 'column', }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}><Icon name={'warning'} color={'#fdd009'} size={50} /></View>
                <View>
                  <Text style={{ fontSize: 30 }}>Recuerda cuando pagar a proveedores y acreedores</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Visualiza las fechas de vencimiento de tus facturas y recibos</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}><Icon name={'lock'} color={'#fdd009'} size={50} /></View>
                <View>
                  <Text style={{ fontSize: 30 }}>Los datos se mantienen seguros</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Las cuentas por cobrar son muy importantes, no las pierda. Con Treinta, los registros se mantienen seguros.</Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column', }}>
              
            </View>

          </View>
        </View>
        <View style={{ flex: 1 }}>
        </View>
      </View>
    );
  }

  componentDidMount = () => {
  }

  componentDidUpdate() {
  }

}

