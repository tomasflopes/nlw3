import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Feather } from '@expo/vector-icons';

import mapMarker from '../../images/map-marker.png';

import styles from './styles';

const OrphanagesMap: React.FC = () => {
  const navigation = useNavigation();

  function handleNavigatorToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.9267002,
          longitude: -8.6368845,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}
      >
        <Marker
          icon={mapMarker}
          coordinate={{
            latitude: 40.9267002,
            longitude: -8.6368845
          }}
          calloutAnchor={{
            x: 2.7,
            y: 0.8
          }}
        >
          <Callout tooltip={true} onPress={handleNavigatorToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Cenas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orphanages found</Text>
        <TouchableOpacity
          style={styles.createOrphanageButton}
          onPress={() => {}}
        >
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrphanagesMap;
