import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';

import { Feather, FontAwesome } from '@expo/vector-icons';
import mapMarkerImg from '../../images/map-marker.png';

import api from '../../services/api';

import styles from './styles';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    url: string;
  }[];
}

interface RouteParams {
  id: number;
}
const OrphanageDetails: React.FC = () => {
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const route = useRoute();

  const params = route.params as RouteParams;

  async function getData() {
    const { data } = await api.get(`/orphanages/${params.id}`);

    setOrphanage(data);
  }

  function handleOpenGoogleMapsRoute() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`
    );
  }

  useEffect(() => {
    getData();
  }, [params.id]);

  if (!orphanage) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          {orphanage.images.map(image => (
            <Image
              key={image.id}
              style={styles.image}
              source={{
                uri: image.url
              }}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: orphanage.latitude,
              longitude: orphanage.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            />
          </MapView>

          <TouchableOpacity
            onPress={handleOpenGoogleMapsRoute}
            style={styles.routesContainer}
          >
            <Text style={styles.routesText}>Get routes on Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instructions for visiting</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>
              {orphanage.opening_hours}
            </Text>
          </View>
          {orphanage.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>
                We're open on weekends
              </Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#ff669d" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>
                We're not open on weekends
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default OrphanageDetails;
