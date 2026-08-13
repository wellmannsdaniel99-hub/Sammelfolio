import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { discoveries, euro } from '../data/mock';
import { useSealedPrices } from '../store/sealedPrices';

const filters = ['Alle','Top-Trainer-Box','Booster Bundle','Display'] as const;
type Filter = typeof filters[number];

export default function SealedPricesScreen() {
  const { latestPrice, setPrice } = useSealedPrices();
  const [filter, setFilter] = useState<Filter>('Alle');
  const [query, setQuery] = useState('');
  const [drafts, setDrafts] = useState<Record<string,string>>({});

  const products = useMemo(() => discoveries.filter(item => item.kind === 'Sealed' && (filter === 'Alle' || item.productType === filter) && `${item.name} ${item.setName ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())), [filter, query]);

  const save = (id: string, fallback: number) => {
    const raw = drafts[id] ?? String(latestPrice(id, fallback)).replace('.', ',');
    const price = Number.parseFloat(raw.replace(',', '.'));
    if (!Number.isFinite(price) || price <= 0) return;
    setPrice(id, price);
    setDrafts(current => ({ ...current, [id]: '' }));
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    <Text style={styles.title}>Preise pflegen</Text>
    <Text style={styles.subtitle}>Deine deutschen Sealed-Produkte schnell in einem Rutsch aktualisieren.</Text>
    <TextInput value={query} onChangeText={setQuery} placeholder="Set oder Produkt suchen" placeholderTextColor="#657089" style={styles.search} />
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>{filters.map(value => <Pressable key={value} onPress={() => setFilter(value)} style={[styles.filter, filter === value && styles.filterActive]}><Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{value}</Text></Pressable>)}</ScrollView>
    {products.map(item => {
      const current = latestPrice(item.id, item.marketPrice);
      return <View key={item.id} style={styles.card}>
        <View style={styles.topRow}><View style={styles.main}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.setName} · {item.productType}</Text></View><Text style={styles.current}>{euro(current)}</Text></View>
        <View style={styles.editRow}><TextInput value={drafts[item.id] ?? ''} onChangeText={value => setDrafts(currentDrafts => ({ ...currentDrafts, [item.id]: value }))} placeholder={String(current).replace('.', ',')} placeholderTextColor="#69758F" keyboardType="decimal-pad" style={styles.input} /><Pressable onPress={() => save(item.id, item.marketPrice)} style={styles.save}><Text style={styles.saveText}>Speichern</Text></Pressable></View>
        <Pressable onPress={() => router.push({ pathname: '/sealed-price/[id]', params: { id: item.id } })}><Text style={styles.details}>Verlauf ansehen ›</Text></Pressable>
      </View>;
    })}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:40},back:{color:'#8193FF',fontWeight:'800',marginBottom:18},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:5,marginBottom:18,lineHeight:20},search:{backgroundColor:'#11192A',borderRadius:14,borderWidth:1,borderColor:'#202A40',paddingHorizontal:14,paddingVertical:13,color:'#F6F8FF'},filters:{gap:8,paddingVertical:14},filter:{paddingHorizontal:13,paddingVertical:9,borderRadius:999,backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40'},filterActive:{backgroundColor:'#7C8FFF',borderColor:'#7C8FFF'},filterText:{color:'#A8B1C7',fontWeight:'800',fontSize:12},filterTextActive:{color:'#07101C'},card:{backgroundColor:'#0F1727',borderRadius:18,padding:14,borderWidth:1,borderColor:'#1C263A',marginBottom:10},topRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},main:{flex:1,paddingRight:10},name:{color:'#F2F5FF',fontWeight:'800',fontSize:15},meta:{color:'#77839A',fontSize:12,marginTop:4},current:{color:'#F2F5FF',fontWeight:'900'},editRow:{flexDirection:'row',gap:8,marginTop:12},input:{flex:1,backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40',borderRadius:12,paddingHorizontal:12,paddingVertical:10,color:'#F6F8FF'},save:{backgroundColor:'#7C8FFF',borderRadius:12,paddingHorizontal:14,justifyContent:'center'},saveText:{color:'#07101C',fontWeight:'900',fontSize:12},details:{color:'#8FA0FF',fontWeight:'800',fontSize:12,marginTop:10}});
