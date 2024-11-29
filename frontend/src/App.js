import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import MedicalRecords from './screens/MedicalRecords';
import Appointments from './screens/Appointments';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="MedicalRecords" component={MedicalRecords} />
          <Stack.Screen name="Appointments" component={Appointments} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}