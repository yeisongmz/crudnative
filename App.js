import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetallesClientes from './views/DetallesClientes';
import BarraSuperior from './components/ui/barra';

import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper'

import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// definir tema
const theme = {

  ...DefaultTheme,
  colors : {
    ...DefaultTheme.colors,
    primary: 'blue',
   
    
  }
}




const App = () => {


  return (
   <>
   <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
      >
        <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={({navigation, route})=>({
          /* headerLeft: (props) => <BarraSuperior {...props}
                              navigation={navigation}
                              route={route}
                        /> */
        })}
        />
        <Stack.Screen
        name="NuevoCliente"
        component={NuevoCliente}
        options={{
          title: "Nuevo Cliente"
        }}
        />
        <Stack.Screen
        name="DetallesClientes"
        component={DetallesClientes}
        options={{
          title: "Detalles Clientes"
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
   </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
