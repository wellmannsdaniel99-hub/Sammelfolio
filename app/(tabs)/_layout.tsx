import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return <Tabs screenOptions={({route})=>({headerShown:false,tabBarActiveTintColor:'#70DFF2',tabBarInactiveTintColor:'#65718A',tabBarStyle:{backgroundColor:'#070D19',borderTopColor:'#192541',height:74,paddingTop:8},tabBarLabelStyle:{fontSize:10,fontWeight:'800',paddingBottom:8},tabBarIcon:({color,size,focused})=>{const icons:Record<string,keyof typeof Ionicons.glyphMap>={index:focused?'pie-chart':'pie-chart-outline',collection:focused?'albums':'albums-outline',discover:focused?'search':'search-outline',wishlist:focused?'heart':'heart-outline',profile:focused?'person':'person-outline'};return <Ionicons name={icons[route.name]??'ellipse-outline'} color={color} size={size}/>;}})}>
    <Tabs.Screen name="index" options={{title:'Portfolio'}}/><Tabs.Screen name="collection" options={{title:'Sammlung'}}/><Tabs.Screen name="discover" options={{title:'Entdecken'}}/><Tabs.Screen name="wishlist" options={{title:'Wünsche'}}/><Tabs.Screen name="profile" options={{title:'Profil'}}/>
  </Tabs>;
}
