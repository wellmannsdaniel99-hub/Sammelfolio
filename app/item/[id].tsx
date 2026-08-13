import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro } from '../../data/mock';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id);

  if (!item) {
    return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Nicht gefunden</Text></View></SafeAreaView>;
  }

  const gain = item.marketPrice - item.buyPrice;
  const pct = item.buyPrice ? (gain / item.buyPrice) * 100 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
        <View style={styles.art}><Text style={styles.artText}>{item.kind === 'Karte' ? 'KARTE' : 'SEALED'}</Text></View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>

        <View style={styles.market}>
          <Text style={styles.label}>MARKTWERT</Text>
          <Text style={styles.value}>{euro(item.marketPrice)}</Text>
          <Text style={styles.gain}>+{euro(gain)} · +{pct.toFixed(1)} % ggü. Beispiel-Kaufpreis</Text>
        </View>

        <View style={styles.row}><Text style={styles.key}>Typ</Text><Text style={styles.val}>{item.kind}</Text></View>
        <View style={styles.row}><Text style={styles.key}>Sprache</Text><Text style={styles.val}>Deutsch</Text></View>
        <View style={styles.row}><Text style={styles.key}>Preisstatus</Text><Text style={styles.val}>Mock-Daten</Text></View>

        <Pressable style={styles.add} onPress={() => router.push({ pathname: '/add/[id]', params: { id: item.id } })}><Text style={styles.addText}>+ Zur Sammlung hinzufügen</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},back:{color:'#8193FF',fontWeight:'800',marginBottom:16},art:{height:230,borderRadius:24,backgroundColor:'#17223A',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#263653'},artText:{color:'#8193FF',fontWeight:'900',letterSpacing:2},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900',marginTop:18},subtitle:{color:'#78839D',marginTop:5},market:{backgroundColor:'#11192A',borderRadius:20,padding:18,borderWidth:1,borderColor:'#202A40',marginTop:20,marginBottom:14},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F7F9FF',fontSize:34,fontWeight:'900',marginTop:6},gain:{color:'#5DE1A3',fontWeight:'800',marginTop:5},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#182237'},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700'},add:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:22},addText:{color:'#07101C',fontWeight:'900'}});
