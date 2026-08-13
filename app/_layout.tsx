import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CollectionProvider } from '../state/collection';
import { SealedPriceProvider } from '../store/sealedPrices';

export default function RootLayout() {
  return (
    <CollectionProvider>
      <SealedPriceProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#080D19' } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="item/[id]" />
          <Stack.Screen name="card/[id]" />
          <Stack.Screen name="sealed-price/[id]" />
        </Stack>
      </SealedPriceProvider>
    </CollectionProvider>
  );
}
