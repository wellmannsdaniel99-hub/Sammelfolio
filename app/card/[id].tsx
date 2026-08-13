import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { cardImage, cardmarketValue, getGermanCard, TCGdexCard } from '../../services/tcgdex';
import { euro } from '../../data/mock';

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [card, setCard] = useState<TCGdexCard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getGermanCard(id).then(setCard).catch(() => setError('Kartendetails konnten nicht geladen werden.'));
  }, [id]);

  if (error) return <SafeAreaView style={styles.safe}><View style={styles.container}><Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable><Text style={styles.title}>{error}</Text></View></SafeAreaView>;
  if (!card) return <SafeAreaView style={styles.safe}><ActivityIndicator style={{marginTop:80}} /></SafeAreaView>;

  const market = cardmarketValue(card);
  const cm = card.pricing?.cardmarket;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
        {card.image ? <Image source={{ uri: cardImage(card.image, 'high') }} style={styles.art} resizeMode="contain" /> : null}
        <Text style={styles.title}>{card.name}</Text>
        <Text style={styles.subtitle}>{card.set?.name ?? 'Pokémon TCG'} · #{card.localId} · Deutsch</Text>

        <View style={styles.market}>
          <Text style={styles.label}>CARDMARKET TREND</Text>
          <Text style={styles.value}>{market != null ? euro(market) : '–'}</Text>
          <Text style={styles.meta}>{cm?.updated ? `Stand ${new Date(cm.updated).toLocaleDateString('de-DE')}` : 'Für diese Karte liegen keine Cardmarket-Daten vor.'}</Text>
        </View>

        <View style={styles.row}><Text style={styles.key}>Seltenheit</Text><Text style={styles.val}>{card.rarity ?? '–'}</Text></View>
        <View style={styles.row}><Text style={styles.key}>Cardmarket Low</Text><Text style={styles.val}>{cm?.low != null ? euro(cm.low) : '–'}</Text></View>
        <View style={styles.row}><Text style={styles.key}>Ø 7 Tage</Text><Text style={styles.val}>{cm?.avg7 != null ? euro(cm.avg7) : '–'}</Text></View>
        <View style={styles.row}><Text style={styles.key}>Ø 30 Tage</Text><Text style={styles.val}>{cm?.avg30 != null ? euro(cm.avg30) : '–'}</Text></View>

        <View style={styles.info}><Text style={styles.infoText}>Live-Kartendaten: TCGdex. Preisfelder: Cardmarket-Daten aus dem TCGdex-Feed. Als Nächstes verbinden wir diese Karten mit dem Collection-State.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},back:{color:'#8193FF',fontWeight:'800',marginBottom:14},art:{width:'100%',height:360,backgroundColor:'#0D1423',borderRadius:22},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900',marginTop:16},subtitle:{color:'#78839D',marginTop:5},market:{backgroundColor:'#11192A',borderRadius:20,padding:18,borderWidth:1,borderColor:'#202A40',marginTop:20,marginBottom:14},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F7F9FF',fontSize:34,fontWeight:'900',marginTop:6},meta:{color:'#78839D',fontSize:12,marginTop:5},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#182237'},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700'},info:{backgroundColor:'#10192A',borderRadius:16,padding:14,marginTop:20},infoText:{color:'#7F8AA3',fontSize:12,lineHeight:18}
});
