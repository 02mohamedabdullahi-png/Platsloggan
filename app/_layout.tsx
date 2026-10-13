import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Platsloggan' }} />
      <Stack.Screen name="details/[id]" options={{ title: 'Detaljer' }} />
    </Stack>
  );
}