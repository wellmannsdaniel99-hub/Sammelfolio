import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CollectionProvider } from '../store/collection';

export default function RootLayout() {
  return (
    <CollectionProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#080D19' } }} />
    </CollectionProvider>
  );
}
