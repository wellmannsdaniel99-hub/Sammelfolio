import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8193FF',
        tabBarInactiveTintColor: '#667085',
        tabBarStyle: { backgroundColor: '#0B1220', borderTopColor: '#1A2438', height: 72, paddingTop: 8 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            index: 'pie-chart-outline',
            collection: 'albums-outline',
            discover: 'search-outline',
            wishlist: 'heart-outline',
            profile: 'person-outline',
          };
          return <Ionicons name={icons[route.name] ?? 'ellipse-outline'} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Portfolio' }} />
      <Tabs.Screen name="collection" options={{ title: 'Sammlung' }} />
      <Tabs.Screen name="discover" options={{ title: 'Entdecken' }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Wünsche' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
