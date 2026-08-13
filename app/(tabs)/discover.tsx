import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { discoveries, euro } from '../../data/mock';
import { router } from 'expo-router';

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => discoveries.filter(item => `${item.name} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Entdecken</Text>
        <Text style={styles.subtitle}>Deutsche Karten und Sealed-Produkte finden.</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="z. B. Glurak 199 oder 151" placeholderTextColor="#657089" style={styles.search} />
        {filtered.map(item => (
          <Pressable key={item.id} style={styles.card} onPress={() => router.push({ pathname: '/item/[id]', params: { id: item.id } })}>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.kind}</Text></View>
            <View style={styles.main}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.subtitle}</Text></View>
            <Text style={styles.price}>{euro(item.marketPrice)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18},search:{backgroundColor:'#11192A',borderRadius:16,borderWidth:1,borderColor:'#202A40',paddingHorizontal:16,paddingVertical:14,color:'#F6F8FF',marginBottom:16},card:{backgroundColor:'#0F1727',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#1C263A',marginBottom:10},badge:{width:54,height:54,borderRadius:12,backgroundColor:'#202B45',alignItems:'center',justifyContent:'center'},badgeText:{color:'#8FA0FF',fontSize:10,fontWeight:'900'},main:{flex:1,paddingHorizontal:12},name:{color:'#F2F5FF',fontSize:15,fontWeight:'800'},meta:{color:'#77839A',fontSize:12,marginTop:4},price:{color:'#F2F5FF',fontWeight:'900'}
});
