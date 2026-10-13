import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [coords, setCoords] = useState('');
  const [image, setImage] = useState<string | null>(null);

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
      mediaTypes: ['images']
    });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  return (
    <View style={styles.container}>
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

      <Pressable
        style={styles.btnNav}
        onPress={() => {
          if (name) {
            router.push(`/details/${encodeURIComponent(name)}`);
          } else {
            alert('Skriv namn!');
          }
        }}
      >
        <Text style={styles.btnText}>Gå till detaljer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10 },
  btn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  btnNav: { backgroundColor: '#34C759', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  text: { textAlign: 'center', marginBottom: 10 },
  img: { width: '100%', height: 120, borderRadius: 5, marginBottom: 10 },
});