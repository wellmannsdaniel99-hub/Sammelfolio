import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro } from '../../data/mock';
import { useSealedPrices } from '../../store/sealedPrices';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id);
  const { history, latestPrice } = useSealedPrices();

  if (!item) return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Nicht gefunden</Text></View></SafeAreaView>;
  const manualEntries = history[item.id] ?? [];
  const marketPrice = latestPrice(item.id, item.marketPrice);

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    <View style={styles.art}><Text style={styles.artText}>{item.productType === 'Top-Trainer-Box' ? 'TOP-TRAINER-BOX' : item.productType?.toUpperCase() ?? 'SEALED'}</Text></View>
    <Text style={styles.title}>{item.name}</Text><Text style={styles.subtitle}>{item.subtitle}</Text>
    <View style={styles.market}><Text style={styles.label}>MARKTWERT</Text><Text style={styles.value}>{euro(marketPrice)}</Text><Text style={styles.note}>{manualEntries.length ? 'Manuell gepflegter Tagespreis' : 'Startwert · noch kein manueller Tagespreis'}</Text></View>
    <View style={styles.row}><Text style={styles.key}>Produkttyp</Text><Text style={styles.val}>{item.productType ?? 'Sealed'}</Text></View>
    <View style={styles.row}><Text style={styles.key}>Set</Text><Text style={styles.val}>{item.setName ?? '–'}</Text></View>
    <View style={styles.row}><Text style={styles.key}>Sprache</Text><Text style={styles.val}>Deutsch</Text></View>
    <View style={styles.row}><Text style={styles.key}>Preisstatus</Text><Text style={styles.val}>{manualEntries.length ? 'Manuell gepflegt' : 'Startwert'}</Text></View>
    <Pressable style={styles.priceButton} onPress={() => router.push({ pathname: '/sealed-price/[id]', params: { id: item.id } })}><Text style={styles.priceButtonText}>€ Tagespreis eintragen</Text></Pressable>
    <Pressable style={styles.add} onPress={() => router.push({ pathname: '/add/[id]', params: { id: item.id } })}><Text style={styles.addText}>+ Zur Sammlung hinzufügen</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},back:{color:'#8193FF',fontWeight:'800',marginBottom:16},art:{height:230,borderRadius:24,backgroundColor:'#17223A',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#263653'},artText:{color:'#8193FF',fontWeight:'900',letterSpacing:2},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900',marginTop:18},subtitle:{color:'#78839D',marginTop:5},market:{backgroundColor:'#11192A',borderRadius:20,padding:18,borderWidth:1,borderColor:'#202A40',marginTop:20,marginBottom:14},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F7F9FF',fontSize:34,fontWeight:'900',marginTop:6},note:{color:'#78839D',fontSize:12,marginTop:5},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#182237'},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700'},priceButton:{borderWidth:1,borderColor:'#7C8FFF',borderRadius:16,padding:15,alignItems:'center',marginTop:22},priceButtonText:{color:'#9AA8FF',fontWeight:'900'},add:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:10},addText:{color:'#07101C',fontWeight:'900'}});
