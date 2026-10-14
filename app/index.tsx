import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

interface Place {
  id: string;
  name: string;
  coords: string;
  image: string | null;
}

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [coords, setCoords] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);

  const getLocation = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let loc = await Location.getCurrentPositionAsync({});
      setCoords(`${loc.coords.latitude.toFixed(2)}, ${loc.coords.longitude.toFixed(2)}`);
    }
  };

  const pickImage = async () => {
    Haptics.selectionAsync();
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const savePlace = () => {
    if (!name) {
      alert('Skriv namn!');
      return;
    }
    const newPlace: Place = {
      id: Date.now().toString(),
      name,
      coords,
      image,
    };
    setPlaces([newPlace, ...places]);
    setName('');
    setCoords('');
    setImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Platsloggan</Text>

      <TextInput
        style={styles.input}
        placeholder="Skriv platsnamn"
        value={name}
        onChangeText={setName}
      />

      <Pressable style={styles.btn} onPress={getLocation}>
        <Text style={styles.btnText}>Hämta GPS</Text>
      </Pressable>

      {coords ? <Text style={styles.text}>Position: {coords}</Text> : null}

      <Pressable style={styles.btn} onPress={pickImage}>
        <Text style={styles.btnText}>Välj bild</Text>
      </Pressable>

      {image ? <Image source={{ uri: image }} style={styles.img} /> : null}

      <Pressable style={styles.btnSave} onPress={savePlace}>
        <Text style={styles.btnText}>💾 Spara plats</Text>
      </Pressable>

      <Text style={styles.subTitle}>Mina sparade platser ({places.length}):</Text>

      {places.map((item) => (
        <View key={item.id} style={styles.card}>
          {item.image ? <Image source={{ uri: item.image }} style={styles.cardImg} /> : null}
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.coords ? <Text style={styles.cardText}>Position: {item.coords}</Text> : null}
            <Pressable
              style={styles.btnNav}
              onPress={() => router.push(`/details/${encodeURIComponent(item.name)}`)}
            >
              <Text style={styles.btnText}>Gå till detaljer</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  btn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  btnSave: { backgroundColor: '#34C759', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 5, marginBottom: 10 },
  btnNav: { backgroundColor: '#007AFF', padding: 8, borderRadius: 5, alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', marginBottom: 10 },
  img: { width: '100%', height: 120, borderRadius: 5, marginBottom: 10 },
  card: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', paddingVertical: 12, alignItems: 'center', gap: 12 },
  cardImg: { width: 65, height: 65, borderRadius: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardText: { fontSize: 12, color: '#555', marginTop: 2 },
});