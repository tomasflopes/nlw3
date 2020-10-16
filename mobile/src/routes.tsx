import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Stack.Screen name="OrphanageDetails" component={OrphanageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
