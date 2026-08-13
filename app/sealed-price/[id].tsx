import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro } from '../../data/mock';
import { useSealedPrices } from '../../store/sealedPrices';

type Range = 7 | 30 | 90 | 0;

export default function SealedPriceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id && entry.kind === 'Sealed');
  const { history, setPrice, latestPrice } = useSealedPrices();
  const current = item ? latestPrice(item.id, item.marketPrice) : 0;
  const [value, setValue] = useState(String(current).replace('.', ','));
  const [range, setRange] = useState<Range>(30);

  const allEntries = item ? history[item.id] ?? [] : [];
  const filtered = useMemo(() => {
    if (!range) return allEntries;
    const cutoff = Date.now() - range * 86400000;
    return allEntries.filter(entry => new Date(entry.date).getTime() >= cutoff);
  }, [allEntries, range]);

  if (!item) return <SafeAreaView style={styles.safe}><Text style={styles.title}>Produkt nicht gefunden</Text></SafeAreaView>;
  const first = filtered[0]?.price ?? current;
  const last = filtered[filtered.length - 1]?.price ?? current;
  const change = first ? ((last - first) / first) * 100 : 0;
  const min = Math.min(...(filtered.length ? filtered.map(e => e.price) : [current]));
  const max = Math.max(...(filtered.length ? filtered.map(e => e.price) : [current]));
  const spread = Math.max(max - min, 1);
  const entries = [...allEntries].reverse();

  const save = () => {
    const price = Number.parseFloat(value.replace(',', '.'));
    if (!Number.isFinite(price) || price <= 0) return;
    setPrice(item.id, price);
    setValue(String(price).replace('.', ','));
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    <Text style={styles.title}>Sealed-Preis pflegen</Text><Text style={styles.subtitle}>{item.name}</Text>
    <Text style={styles.label}>AKTUELLER MARKTWERT</Text><Text style={styles.current}>{euro(current)}</Text>
    <Text style={[styles.change, { opacity: filtered.length > 1 ? 1 : .45 }]}>{change >= 0 ? '+' : ''}{change.toFixed(1)} % im Zeitraum</Text>

    <View style={styles.ranges}>{([{n:7,t:'7T'},{n:30,t:'30T'},{n:90,t:'90T'},{n:0,t:'MAX'}] as {n:Range,t:string}[]).map(r => <Pressable key={r.t} onPress={() => setRange(r.n)} style={[styles.range, range === r.n && styles.rangeActive]}><Text style={[styles.rangeText, range === r.n && styles.rangeTextActive]}>{r.t}</Text></Pressable>)}</View>
    <View style={styles.chart}>{filtered.length < 2 ? <Text style={styles.chartHint}>Nach mindestens zwei Preiseinträgen erscheint hier die Entwicklung.</Text> : filtered.map((entry,index) => <View key={`${entry.date}-${index}`} style={styles.barSlot}><View style={[styles.bar,{height:18 + ((entry.price-min)/spread)*92}]} /></View>)}</View>
    <View style={styles.summary}><View><Text style={styles.small}>TIEF</Text><Text style={styles.summaryValue}>{euro(min)}</Text></View><View><Text style={styles.small}>HOCH</Text><Text style={styles.summaryValue}>{euro(max)}</Text></View><View><Text style={styles.small}>EINTRÄGE</Text><Text style={styles.summaryValue}>{filtered.length}</Text></View></View>

    <Text style={styles.label}>NEUER PREIS IN EUR</Text><TextInput value={value} onChangeText={setValue} keyboardType="decimal-pad" style={styles.input} />
    <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>Tagespreis speichern</Text></Pressable>
    <Text style={styles.note}>Quelle: manuell gepflegt · Datum und Uhrzeit werden automatisch gespeichert.</Text>
    <Text style={styles.historyTitle}>Preisverlauf</Text>
    {entries.length === 0 ? <Text style={styles.empty}>Noch kein manueller Preis gespeichert.</Text> : entries.map((entry,index) => <View key={`${entry.date}-${index}`} style={styles.row}><Text style={styles.date}>{new Date(entry.date).toLocaleDateString('de-DE')}</Text><Text style={styles.price}>{euro(entry.price)}</Text></View>)}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:40},back:{color:'#8193FF',fontWeight:'800',marginBottom:20},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:5,marginBottom:24},label:{color:'#6F7C97',fontSize:11,fontWeight:'900',letterSpacing:1,marginTop:16,marginBottom:8},current:{color:'#F7F9FF',fontSize:34,fontWeight:'900'},change:{color:'#5DE1A3',fontWeight:'800',marginTop:5},ranges:{flexDirection:'row',gap:8,marginTop:20},range:{flex:1,paddingVertical:9,borderRadius:10,backgroundColor:'#11192A',alignItems:'center'},rangeActive:{backgroundColor:'#26345C'},rangeText:{color:'#73809A',fontWeight:'800',fontSize:12},rangeTextActive:{color:'#AAB5FF'},chart:{height:135,backgroundColor:'#0F1727',borderRadius:18,borderWidth:1,borderColor:'#1C263A',marginTop:12,padding:14,flexDirection:'row',alignItems:'flex-end',gap:5,overflow:'hidden'},chartHint:{color:'#667085',fontSize:12,lineHeight:18,alignSelf:'center'},barSlot:{flex:1,height:110,justifyContent:'flex-end'},bar:{backgroundColor:'#7C8FFF',borderRadius:4,minWidth:3},summary:{flexDirection:'row',justifyContent:'space-between',marginTop:12},small:{color:'#68758E',fontSize:10,fontWeight:'900'},summaryValue:{color:'#EEF2FF',fontWeight:'800',marginTop:3},input:{backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40',borderRadius:14,padding:14,color:'#F6F8FF',fontSize:18},save:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:18},saveText:{color:'#07101C',fontWeight:'900'},note:{color:'#667085',fontSize:12,lineHeight:18,marginTop:10},historyTitle:{color:'#F4F6FC',fontSize:20,fontWeight:'900',marginTop:30,marginBottom:10},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:13,borderBottomWidth:1,borderBottomColor:'#182237'},date:{color:'#8994AA'},price:{color:'#F2F5FF',fontWeight:'800'},empty:{color:'#667085'}});
