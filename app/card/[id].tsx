import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { cardImage, cardmarketValue, getGermanCard, TCGdexCard } from '../../services/tcgdex';
import { euro, CollectionItem } from '../../data/mock';
import { useCollection } from '../../store/collection';
import { useWishlist } from '../../store/wishlist';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCollection();
  const { toggle, has } = useWishlist();
  const [card, setCard] = useState<TCGdexCard | null>(null);
  const [error, setError] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [condition, setCondition] = useState('NM');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0,10));
  const [notes, setNotes] = useState('');

  useEffect(() => { if (id) getGermanCard(id).then(setCard).catch(() => setError('Kartendetails konnten nicht geladen werden.')); }, [id]);
  if (error) return <SafeAreaView style={styles.safe}><View style={styles.container}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable><Text style={styles.title}>{error}</Text></View></SafeAreaView>;
  if (!card) return <SafeAreaView style={styles.safe}><ActivityIndicator style={{marginTop:80}} /></SafeAreaView>;

  const market = cardmarketValue(card) ?? 0;
  const cm = card.pricing?.cardmarket;
  const subtitle = `${card.localId} · ${card.set?.name ?? 'Pokémon TCG'} · DE · ${condition}`;
  const wished = has(card.id);

  const save = () => {
    const item: CollectionItem = { id: card.id, name: card.name, subtitle, kind: 'Karte', quantity: 1, buyPrice: 0, marketPrice: market, language: 'DE' };
    addItem({ item, quantity: Math.max(1, Number(quantity) || 1), buyPrice: Number(buyPrice.replace(',', '.')) || 0, condition, purchaseDate, notes: notes.trim() || undefined });
    router.replace('/(tabs)/collection');
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    {card.image ? <Image source={{ uri: cardImage(card.image, 'high') }} style={styles.art} resizeMode="contain" /> : null}
    <Text style={styles.title}>{card.name}</Text><Text style={styles.subtitle}>{card.set?.name ?? 'Pokémon TCG'} · #{card.localId} · Deutsch</Text>
    <View style={styles.market}><Text style={styles.label}>CARDMARKET TREND</Text><Text style={styles.value}>{market ? euro(market) : '–'}</Text><Text style={styles.meta}>{cm?.updated ? `Stand ${new Date(cm.updated).toLocaleDateString('de-DE')}` : 'Keine Cardmarket-Daten vorhanden.'}</Text></View>
    <View style={styles.row}><Text style={styles.key}>Seltenheit</Text><Text style={styles.val}>{card.rarity ?? '–'}</Text></View><View style={styles.row}><Text style={styles.key}>Cardmarket Low</Text><Text style={styles.val}>{cm?.low != null ? euro(cm.low) : '–'}</Text></View><View style={styles.row}><Text style={styles.key}>Ø 7 Tage</Text><Text style={styles.val}>{cm?.avg7 != null ? euro(cm.avg7) : '–'}</Text></View><View style={styles.row}><Text style={styles.key}>Ø 30 Tage</Text><Text style={styles.val}>{cm?.avg30 != null ? euro(cm.avg30) : '–'}</Text></View>
    <Pressable style={styles.wish} onPress={() => toggle({ id:card.id, name:card.name, subtitle:`${card.set?.name ?? 'Pokémon TCG'} · #${card.localId} · Deutsch`, kind:'Karte', marketPrice: market || undefined })}><Text style={styles.wishText}>{wished ? '♥ Von Wunschliste entfernen' : '♡ Zur Wunschliste'}</Text></Pressable>
    <Text style={styles.formTitle}>Zur Sammlung hinzufügen</Text><Text style={styles.formLabel}>Zustand</Text><View style={styles.conditions}>{['NM','EX','GD','LP','PL'].map(c => <Pressable key={c} onPress={() => setCondition(c)} style={[styles.condition,condition===c&&styles.conditionActive]}><Text style={[styles.conditionText,condition===c&&styles.conditionTextActive]}>{c}</Text></Pressable>)}</View>
    <Text style={styles.formLabel}>Menge</Text><TextInput value={quantity} onChangeText={setQuantity} keyboardType="number-pad" style={styles.input} />
    <Text style={styles.formLabel}>Dein Kaufpreis pro Karte (€)</Text><TextInput value={buyPrice} onChangeText={setBuyPrice} keyboardType="decimal-pad" placeholder="z. B. 225,00" placeholderTextColor="#59657C" style={styles.input} />
    <Text style={styles.formLabel}>Kaufdatum</Text><TextInput value={purchaseDate} onChangeText={setPurchaseDate} placeholder="YYYY-MM-DD" placeholderTextColor="#59657C" style={styles.input} />
    <Text style={styles.formLabel}>Notizen</Text><TextInput value={notes} onChangeText={setNotes} placeholder="Optional" placeholderTextColor="#59657C" multiline style={[styles.input,{minHeight:80,textAlignVertical:'top'}]} />
    <Pressable style={styles.add} onPress={save}><Text style={styles.addText}>+ Zur Sammlung hinzufügen</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},back:{color:'#8193FF',fontWeight:'800',marginBottom:14},art:{width:'100%',height:360,backgroundColor:'#0D1423',borderRadius:22},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900',marginTop:16},subtitle:{color:'#78839D',marginTop:5},market:{backgroundColor:'#11192A',borderRadius:20,padding:18,borderWidth:1,borderColor:'#202A40',marginTop:20,marginBottom:14},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F7F9FF',fontSize:34,fontWeight:'900',marginTop:6},meta:{color:'#78839D',fontSize:12,marginTop:5},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#182237'},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700'},wish:{borderWidth:1,borderColor:'#3A4560',borderRadius:16,padding:15,alignItems:'center',marginTop:18},wishText:{color:'#D9DFFF',fontWeight:'900'},formTitle:{color:'#F6F8FF',fontSize:20,fontWeight:'900',marginTop:24,marginBottom:14},formLabel:{color:'#8A96AD',fontSize:12,fontWeight:'700',marginTop:12,marginBottom:7},input:{backgroundColor:'#11192A',borderRadius:14,borderWidth:1,borderColor:'#202A40',padding:14,color:'#F6F8FF'},conditions:{flexDirection:'row',gap:8},condition:{paddingVertical:9,paddingHorizontal:13,borderRadius:12,backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40'},conditionActive:{backgroundColor:'#7C8FFF'},conditionText:{color:'#8A96AD',fontWeight:'800'},conditionTextActive:{color:'#07101C'},add:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:22},addText:{color:'#07101C',fontWeight:'900'}});
