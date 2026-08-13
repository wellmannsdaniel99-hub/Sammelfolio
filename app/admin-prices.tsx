import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { discoveries, euro, ProductType } from '../data/mock';
import { useSealedPrices } from '../store/sealedPrices';

const filters: ('Alle' | ProductType)[] = ['Alle','Top-Trainer-Box','Booster Bundle','Display','Booster','Kollektion','Tin','Mini-Tin'];

export default function AdminPricesScreen() {
  const { latestPrice, latestEntry, setPrice } = useSealedPrices();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'Alle' | ProductType>('Alle');
  const [drafts, setDrafts] = useState<Record<string,string>>({});
  const [notes, setNotes] = useState<Record<string,string>>({});

  const products = useMemo(() => discoveries.filter(item => {
    if (item.kind !== 'Sealed') return false;
    if (filter !== 'Alle' && item.productType !== filter) return false;
    const q = query.trim().toLowerCase();
    return !q || `${item.name} ${item.setName ?? ''} ${item.productType ?? ''}`.toLowerCase().includes(q);
  }), [query, filter]);

  const missing = products.filter(item => !latestEntry(item.id) && item.marketPrice <= 0).length;
  const save = (id: string, fallback: number) => {
    const raw = drafts[id] ?? String(latestPrice(id, fallback)).replace('.', ',');
    const price = Number.parseFloat(raw.replace(',', '.'));
    if (!Number.isFinite(price) || price <= 0) return;
    setPrice(id, price, notes[id]);
    setDrafts(current => ({ ...current, [id]: '' }));
    setNotes(current => ({ ...current, [id]: '' }));
  };

  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
    <Pressable onPress={() => router.back()}><Text style={s.back}>‹ Zurück</Text></Pressable>
    <Text style={s.kicker}>SAMMELFOLIO ADMIN</Text><Text style={s.title}>Marktpreise verwalten</Text>
    <Text style={s.subtitle}>Zentrale Sammelfolio-Marktwerte für alle Sealed-Produkte. Im Teststand werden sie lokal gespeichert.</Text>
    <View style={s.summary}><View><Text style={s.summaryNumber}>{products.length}</Text><Text style={s.summaryLabel}>PRODUKTE</Text></View><View><Text style={[s.summaryNumber, missing > 0 && s.warn]}>{missing}</Text><Text style={s.summaryLabel}>OHNE PREIS</Text></View></View>
    <TextInput value={query} onChangeText={setQuery} placeholder="Produkt oder Set suchen" placeholderTextColor="#65718A" style={s.search}/>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.filters}>{filters.map(value => <Pressable key={value} onPress={() => setFilter(value)} style={[s.filter, filter === value && s.filterOn]}><Text style={[s.filterText, filter === value && s.filterTextOn]}>{value === 'Top-Trainer-Box' ? 'ETB' : value}</Text></Pressable>)}</ScrollView>
    {products.map(item => {
      const entry = latestEntry(item.id);
      const current = latestPrice(item.id, item.marketPrice);
      const updated = entry ? new Date(entry.date).toLocaleString('de-DE', { dateStyle:'short', timeStyle:'short' }) : 'Noch nicht gepflegt';
      return <View key={item.id} style={s.card}>
        <View style={s.row}><View style={s.main}><Text style={s.name}>{item.name}</Text><Text style={s.meta}>{item.setName} · {item.productType} · DE</Text></View><Text style={[s.current, current <= 0 && s.warn]}>{current > 0 ? euro(current) : 'Offen'}</Text></View>
        <Text style={s.updated}>Zuletzt aktualisiert: {updated}</Text>
        {entry?.note ? <Text style={s.lastNote}>Interne Notiz: {entry.note}</Text> : null}
        <View style={s.editRow}><TextInput value={drafts[item.id] ?? ''} onChangeText={value => setDrafts(d => ({...d,[item.id]:value}))} placeholder={current > 0 ? String(current).replace('.', ',') : '0,00'} placeholderTextColor="#65718A" keyboardType="decimal-pad" style={s.priceInput}/><Pressable style={s.save} onPress={() => save(item.id, item.marketPrice)}><Text style={s.saveText}>Speichern</Text></Pressable></View>
        <TextInput value={notes[item.id] ?? ''} onChangeText={value => setNotes(n => ({...n,[item.id]:value}))} placeholder="Interne Notiz / Referenz (optional)" placeholderTextColor="#65718A" style={s.noteInput}/>
      </View>;
    })}
  </ScrollView></SafeAreaView>;
}

const s = StyleSheet.create({safe:{flex:1,backgroundColor:'#050914'},container:{padding:20,paddingBottom:42},back:{color:'#70DFF2',fontWeight:'800',marginBottom:18},kicker:{color:'#A16FFF',fontSize:10,fontWeight:'900',letterSpacing:1.4},title:{color:'#F7F9FF',fontSize:29,fontWeight:'900',marginTop:5},subtitle:{color:'#74819A',marginTop:5,lineHeight:19,marginBottom:16},summary:{flexDirection:'row',justifyContent:'space-around',backgroundColor:'#0B1325',borderWidth:1,borderColor:'#293A65',borderRadius:20,padding:15,marginBottom:14},summaryNumber:{color:'#83E3F4',fontSize:22,fontWeight:'900',textAlign:'center'},summaryLabel:{color:'#687792',fontSize:9,fontWeight:'900',marginTop:3},warn:{color:'#FFB86B'},search:{backgroundColor:'#0A1222',borderWidth:1,borderColor:'#23365A',borderRadius:14,padding:14,color:'#F4F7FF'},filters:{gap:7,paddingVertical:12},filter:{paddingHorizontal:11,paddingVertical:8,borderRadius:99,borderWidth:1,borderColor:'#263654',backgroundColor:'#0A1222'},filterOn:{borderColor:'#59D8EF',backgroundColor:'#142B48'},filterText:{color:'#8491A8',fontSize:10,fontWeight:'800'},filterTextOn:{color:'#7FE4F5'},card:{backgroundColor:'#09111F',borderWidth:1,borderColor:'#192743',borderRadius:18,padding:14,marginBottom:10},row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},main:{flex:1,paddingRight:10},name:{color:'#F2F5FF',fontWeight:'900',fontSize:14},meta:{color:'#74819A',fontSize:10,marginTop:4},current:{color:'#F2F5FF',fontWeight:'900',fontSize:13},updated:{color:'#697791',fontSize:10,marginTop:8},lastNote:{color:'#9B8DBE',fontSize:10,marginTop:5,fontStyle:'italic'},editRow:{flexDirection:'row',gap:8,marginTop:12},priceInput:{flex:1,backgroundColor:'#0D1728',borderWidth:1,borderColor:'#263654',borderRadius:12,paddingHorizontal:12,paddingVertical:10,color:'#F4F7FF'},save:{backgroundColor:'#6657E8',borderRadius:12,paddingHorizontal:14,justifyContent:'center'},saveText:{color:'#FFF',fontWeight:'900',fontSize:11},noteInput:{backgroundColor:'#0D1728',borderWidth:1,borderColor:'#202D47',borderRadius:12,paddingHorizontal:12,paddingVertical:10,color:'#DDE4F6',marginTop:8,fontSize:11}});