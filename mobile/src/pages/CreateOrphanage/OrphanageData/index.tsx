import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../../services/api';

interface RouteParams {
  position: {
    latitude: number;
    longitude: number;
  };
}

const OrphanageData: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(false);

  const params = route.params as RouteParams;

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Oops... Please give permission to camera roll.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (result.cancelled) return;

    setImages([...images, result.uri]);
  }

  async function handleSubmit() {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('about', about);
    formData.append('latitude', String(params.position.latitude));
    formData.append('longitude', String(params.position.longitude));
    formData.append('instructions', instructions);
    formData.append('open_on_weekends', String(openOnWeekends));
    formData.append('opening_hours', openingHours);

    images.forEach((image, index) => {
      formData.append('images', {
        name: `image_${Date.now()}_${index}_.jpg`,
        type: 'image/jpg',
        uri: image
      } as any);
    });

    await api.post('/orphanages', formData).catch(error => alert(error));

    navigation.navigate('OrphanagesMap');
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={styles.title}>Data</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>About</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.label}>Photos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map(image => (
          <Image
            source={{ uri: image }}
            key={image}
            style={styles.uploadedImage}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visit</Text>

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Visit Schedule</Text>
      <TextInput
        style={styles.input}
        value={openingHours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open On Weekends?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          onTouchEnd={() => setOpenOnWeekends(current => !current)}
          value={openOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Register</Text>
      </RectButton>
    </ScrollView>
  );
};

export default OrphanageData;
