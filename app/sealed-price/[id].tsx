import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro } from '../../data/mock';
import { useSealedPrices } from '../../store/sealedPrices';

export default function SealedPriceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id && entry.kind === 'Sealed');
  const { history, setPrice, latestPrice } = useSealedPrices();
  const current = item ? latestPrice(item.id, item.marketPrice) : 0;
  const [value, setValue] = useState(String(current).replace('.', ','));

  if (!item) return <SafeAreaView style={styles.safe}><Text style={styles.title}>Produkt nicht gefunden</Text></SafeAreaView>;
  const entries = [...(history[item.id] ?? [])].reverse();
  const save = () => {
    const price = Number.parseFloat(value.replace(',', '.'));
    if (!Number.isFinite(price) || price <= 0) return;
    setPrice(item.id, price);
    router.back();
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    <Text style={styles.title}>Sealed-Preis pflegen</Text><Text style={styles.subtitle}>{item.name}</Text>
    <Text style={styles.label}>AKTUELLER MARKTWERT</Text><Text style={styles.current}>{euro(current)}</Text>
    <Text style={styles.label}>NEUER PREIS IN EUR</Text><TextInput value={value} onChangeText={setValue} keyboardType="decimal-pad" style={styles.input} />
    <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>Tagespreis speichern</Text></Pressable>
    <Text style={styles.note}>Quelle: manuell gepflegt · Datum und Uhrzeit werden automatisch gespeichert.</Text>
    <Text style={styles.historyTitle}>Preisverlauf</Text>
    {entries.length === 0 ? <Text style={styles.empty}>Noch kein manueller Preis gespeichert.</Text> : entries.map((entry, index) => <View key={`${entry.date}-${index}`} style={styles.row}><Text style={styles.date}>{new Date(entry.date).toLocaleDateString('de-DE')}</Text><Text style={styles.price}>{euro(entry.price)}</Text></View>)}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:40},back:{color:'#8193FF',fontWeight:'800',marginBottom:20},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:5,marginBottom:24},label:{color:'#6F7C97',fontSize:11,fontWeight:'900',letterSpacing:1,marginTop:16,marginBottom:8},current:{color:'#F7F9FF',fontSize:34,fontWeight:'900'},input:{backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40',borderRadius:14,padding:14,color:'#F6F8FF',fontSize:18},save:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:18},saveText:{color:'#07101C',fontWeight:'900'},note:{color:'#667085',fontSize:12,lineHeight:18,marginTop:10},historyTitle:{color:'#F4F6FC',fontSize:20,fontWeight:'900',marginTop:30,marginBottom:10},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:13,borderBottomWidth:1,borderBottomColor:'#182237'},date:{color:'#8994AA'},price:{color:'#F2F5FF',fontWeight:'800'},empty:{color:'#667085'}});
