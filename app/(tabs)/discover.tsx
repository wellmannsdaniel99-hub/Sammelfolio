import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { discoveries, euro } from '../../data/mock';
import { cardImage, searchGermanCards, TCGdexCardBrief } from '../../services/tcgdex';

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const [cards, setCards] = useState<TCGdexCardBrief[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const value = query.trim();
    if (value.length < 2) { setCards([]); setError(''); return; }
    const timer = setTimeout(async () => {
      try {
        setLoading(true); setError('');
        setCards(await searchGermanCards(value));
      } catch {
        setError('Kartensuche gerade nicht erreichbar.');
      } finally { setLoading(false); }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const normalized = query.trim().toLowerCase();
  const sealed = discoveries.filter(item => item.kind === 'Sealed' && (!normalized || `${item.name} ${item.subtitle} ${item.productType ?? ''}`.toLowerCase().includes(normalized)));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Entdecken</Text>
        <Text style={styles.subtitle}>Deutsche Karten live suchen und Top-Trainer-Boxen direkt verwalten.</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="z. B. Glurak, 151 oder Top-Trainer-Box" placeholderTextColor="#657089" style={styles.search} autoCorrect={false} />
        {loading && <ActivityIndicator style={styles.loader} />}
        {!!error && <Text style={styles.error}>{error}</Text>}

        {query.trim().length >= 2 && cards.map(card => (
          <Pressable key={card.id} style={styles.card} onPress={() => router.push({ pathname: '/card/[id]', params: { id: card.id } })}>
            {card.image ? <Image source={{ uri: cardImage(card.image) }} style={styles.image} /> : <View style={styles.badge}><Text style={styles.badgeText}>KARTE</Text></View>}
            <View style={styles.main}><Text style={styles.name}>{card.name}</Text><Text style={styles.meta}>#{card.localId} · Deutsch</Text></View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}

        {sealed.length > 0 && <Text style={styles.section}>Top-Trainer-Boxen & Sealed</Text>}
        {sealed.map(item => (
          <Pressable key={item.id} style={styles.card} onPress={() => router.push({ pathname: '/item/[id]', params: { id: item.id } })}>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.productType === 'Top-Trainer-Box' ? 'TTB' : 'SEALED'}</Text></View>
            <View style={styles.main}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.subtitle}</Text></View>
            <Text style={styles.price}>{euro(item.marketPrice)}</Text>
          </Pressable>
        ))}

        {!query.trim() && <Text style={styles.hint}>Top-Trainer-Boxen werden auch ohne Suche angezeigt. Die angezeigten Sealed-Preise sind vorerst Platzhalter und werden später durch eine echte Preisquelle ersetzt.</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18},search:{backgroundColor:'#11192A',borderRadius:16,borderWidth:1,borderColor:'#202A40',paddingHorizontal:16,paddingVertical:14,color:'#F6F8FF',marginBottom:12},loader:{marginVertical:12},error:{color:'#FF8E8E',marginBottom:12},card:{backgroundColor:'#0F1727',borderRadius:18,padding:12,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#1C263A',marginBottom:10},image:{width:48,height:67,borderRadius:7,backgroundColor:'#202B45'},badge:{width:54,height:54,borderRadius:12,backgroundColor:'#202B45',alignItems:'center',justifyContent:'center'},badgeText:{color:'#8FA0FF',fontSize:9,fontWeight:'900'},main:{flex:1,paddingHorizontal:12},name:{color:'#F2F5FF',fontSize:15,fontWeight:'800'},meta:{color:'#77839A',fontSize:12,marginTop:4},price:{color:'#F2F5FF',fontWeight:'900'},chevron:{color:'#8193FF',fontSize:28,fontWeight:'500'},section:{color:'#8FA0FF',fontSize:12,fontWeight:'800',marginVertical:10,textTransform:'uppercase'},hint:{color:'#667085',fontSize:12,lineHeight:18,marginTop:8}
});
