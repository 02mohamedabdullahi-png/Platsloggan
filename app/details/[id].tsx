import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platsdetaljer</Text>
      <Text style={styles.text}>Sparad plats: {id}</Text>

      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Tillbaka</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 18, color: '#333', marginBottom: 25 },
  btn: { backgroundColor: '#007AFF', padding: 12, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});