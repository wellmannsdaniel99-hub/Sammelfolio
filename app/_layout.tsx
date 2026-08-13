import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CollectionProvider } from '../store/collection';
import { SealedPriceProvider } from '../store/sealedPrices';
import { WishlistProvider } from '../store/wishlist';

export default function RootLayout() {
  return (
    <CollectionProvider>
      <SealedPriceProvider>
        <WishlistProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#080D19' } }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="item/[id]" />
            <Stack.Screen name="card/[id]" />
            <Stack.Screen name="sealed-price/[id]" />
          </Stack>
        </WishlistProvider>
      </SealedPriceProvider>
    </CollectionProvider>
  );
}
