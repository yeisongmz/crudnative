import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {

  const {guardarConsultarAPI} = route.params;

  //crear state de cada campo
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  //detectar si estamos editando o no
  useEffect( ()=>{
    if(route.params.cliente){
      const {nombre, empresa, correo, telefono} = route.params.cliente
      /* console.log('Estamos editando');
      console.log(route.params.cliente.nombre); */
      guardarNombre(nombre);
      guardarEmpresa(empresa);
      guardarTelefono(telefono);
      guardarCorreo(correo);

    }else{
      //console.log('estamos guardando');
    }
  },[]);

  const guardarCliente = async () => {
    //validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }
    // generar el objeto cliente
    const cliente = {nombre, telefono, correo, empresa };
    //console.log(cliente);
    
    
    // Si estamos editando o creando un nuevo cliente
    if(route.params.cliente){

      const {id} = route.params.cliente;
      cliente.id = id;
      try {
    
        if (Platform.OS === 'ios') {
            await axios.put(`http://localhost:3000/clientes/${id}`, cliente);
            //console.log('editando en ios');
        } else {
            //para android
            await axios.put(`http://10.0.2.2:3000/clientes/${id}`, cliente);
            //console.log('editando en android');
        }
        
        
  
      } catch (error) {
          console.log(error)
      }


    }else{
      // guardar el cliente en la API
        try {
    
          if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/clientes', cliente);

          } else {
          //para android
          await axios.post('http://10.0.2.2:3000/clientes', cliente);

          }
      
        } catch (error) {
        console.log(error)
        }
    }

    //redireccionar
    guardarConsultarAPI(true);
    navigation.navigate('Inicio');
    
    //limpiar el form (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    //cambiar a true para traernos el nuevo ciente
    
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}> Añadir Nuevo Cliente</Headline>

      <TextInput
        label="Nombre"
        placeholder="Juan"
        onChangeText={texto => guardarNombre(texto)}
        value={nombre}
        style={styles.input}
      />
      <TextInput
        label="Teléfono"
        placeholder="123456"
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
        style={styles.input}
      />
      <TextInput
        label="Corrreo@correo.com"
        placeholder="Juan"
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
        style={styles.input}
      />
      <TextInput
        label="Empresa"
        placeholder="Juan"
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    color:'#000000',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
