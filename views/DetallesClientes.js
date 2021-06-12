import React from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {
    const {guardarConsultarAPI} = route.params;
    const cliente = route.params.item
    const {nombre, telefono, correo, empresa, id} = route.params.item;
    console.log(route.params)

    const mostrarConfirmacion = ()=> {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            '¿Un cliente eliminado no se puede recuperar?',
            [
                {text: 'Si, Eliminar', onPress: ()=> eliminarCliente() },
                {text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    const eliminarCliente = async () => {

        try {
    
            if (Platform.OS === 'ios') {
                await axios.delete(`http://localhost:3000/clientes/${id}`);
                //console.log('eliminado en ios');
            } else {
                //para android
                await axios.delete(`http://10.0.2.2:3000/clientes/${id}`);
                //console.log('eliminado en android');
            }
            
            
      
          } catch (error) {
              console.log(error)
          }

        //console.log('eliminando cliente', id)
        
        //redireccionar
        navigation.navigate('Inicio');
        
        //consultar de nuevo la api
        guardarConsultarAPI(true);
    }

    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text  style={styles.texto}> Empresa: <Subheading>{empresa}</Subheading> </Text>
            <Text  style={styles.texto}> Teléfono: <Subheading>{telefono}</Subheading> </Text>
            <Text  style={styles.texto}> Correo: <Subheading>{correo}</Subheading> </Text>
            
            <Button 
             style={styles.boton} 
             mode="contained" 
             icon="cancel"  
             onPress={()=> mostrarConfirmacion()  }
             >
                Eliminar Cliente
            </Button>

            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={ ()=> navigation.navigate('NuevoCliente', { cliente, guardarConsultarAPI}) }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})

export default DetallesCliente;