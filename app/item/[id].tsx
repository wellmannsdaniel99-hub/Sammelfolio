import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro, languageName } from '../../data/mock';
import { ProductSilhouette } from '../../components/ProductSilhouette';
import { useCollection } from '../../store/collection';
import { useSealedPrices } from '../../store/sealedPrices';
import { useWishlist } from '../../store/wishlist';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id);
  const { items } = useCollection();
  const { history, latestPrice } = useSealedPrices();
  const { toggle, has } = useWishlist();

  if (!item) return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Nicht gefunden</Text></View></SafeAreaView>;

  const owned = items.find(entry => entry.id === item.id);
  const manualEntries = history[item.id] ?? [];
  const marketPrice = latestPrice(item.id, item.marketPrice);
  const wished = has(item.id);
  const isGerman = (item.language ?? 'DE') === 'DE';
  const invested = owned ? owned.buyPrice * owned.quantity : 0;
  const currentValue = owned ? marketPrice * owned.quantity : 0;
  const gain = currentValue - invested;
  const latestDate = manualEntries.length ? new Date(manualEntries[manualEntries.length - 1].date).toLocaleDateString('de-DE') : null;

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>

    <View style={styles.hero}>
      <View style={styles.languageBadge}><Text style={styles.languageText}>{item.language ?? 'DE'} · {languageName(item.language)}</Text></View>
      {owned?.photoUri ? <Image source={{ uri: owned.photoUri }} style={styles.photo} /> : <ProductSilhouette type={item.productType} size={150} />}
      <Text style={styles.type}>{item.productType === 'Top-Trainer-Box' ? 'TTB · TOP-TRAINER-BOX' : item.productType?.toUpperCase() ?? 'SEALED'}</Text>
    </View>

    <Text style={styles.title}>{item.name}</Text><Text style={styles.subtitle}>{item.setName ?? item.subtitle}</Text>

    <View style={styles.market}>
      <Text style={styles.label}>{isGerman ? 'SAMMELFOLIO-MARKTWERT' : 'PERSÖNLICHER MARKTWERT'}</Text>
      <Text style={styles.value}>{marketPrice > 0 ? euro(marketPrice) : 'Noch offen'}</Text>
      <Text style={styles.note}>{isGerman ? (latestDate ? `Zuletzt gepflegt am ${latestDate}` : 'Noch kein zentral gepflegter Tagespreis') : 'EN/JP werden derzeit nicht zentral von Sammelfolio bewertet.'}</Text>
    </View>

    {owned && <View style={styles.owned}>
      <View style={styles.ownedTop}><View><Text style={styles.label}>IN DEINER SAMMLUNG</Text><Text style={styles.ownedCount}>{owned.quantity}× vorhanden</Text></View><Text style={styles.ownedValue}>{euro(currentValue)}</Text></View>
      <View style={styles.metrics}><View><Text style={styles.metricLabel}>INVESTIERT</Text><Text style={styles.metricValue}>{euro(invested)}</Text></View><View><Text style={styles.metricLabel}>GEWINN / VERLUST</Text><Text style={[styles.metricValue,gain>=0?styles.positive:styles.negative]}>{gain>=0?'+':''}{euro(gain)}</Text></View></View>
      {owned.purchaseDate ? <Text style={styles.ownedMeta}>Kaufdatum: {owned.purchaseDate}</Text> : null}
      {owned.notes ? <Text style={styles.ownedMeta}>Notiz: {owned.notes}</Text> : null}
    </View>}

    <View style={styles.infoCard}>
      <View style={styles.row}><Text style={styles.key}>Produkttyp</Text><Text style={styles.val}>{item.productType === 'Top-Trainer-Box' ? 'TTB' : item.productType ?? 'Sealed'}</Text></View>
      <View style={styles.row}><Text style={styles.key}>Set / Serie</Text><Text style={styles.val}>{item.setName ?? '–'}</Text></View>
      <View style={styles.row}><Text style={styles.key}>Sprache</Text><Text style={styles.val}>{languageName(item.language)}</Text></View>
      <View style={[styles.row,styles.lastRow]}><Text style={styles.key}>Bewertung</Text><Text style={styles.val}>{isGerman ? 'Sammelfolio' : 'Persönlich'}</Text></View>
    </View>

    <Pressable style={styles.wish} onPress={() => toggle({ id:item.id, name:item.name, subtitle:item.subtitle, kind:'Sealed', marketPrice })}><Text style={styles.wishText}>{wished ? '♥ Von Wunschliste entfernen' : '♡ Zur Wunschliste'}</Text></Pressable>
    {isGerman && <Pressable style={styles.priceButton} onPress={() => router.push({ pathname: '/sealed-price/[id]', params: { id: item.id } })}><Text style={styles.priceButtonText}>€ Preisverlauf ansehen</Text></Pressable>}
    <Pressable style={styles.add} onPress={() => router.push({ pathname: '/add/[id]', params: { id: item.id } })}><Text style={styles.addText}>{owned ? '+ Weiteres Exemplar hinzufügen' : '+ Zur Sammlung hinzufügen'}</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#050914'},container:{padding:20,paddingBottom:40},back:{color:'#72DDF1',fontWeight:'800',marginBottom:16},hero:{height:250,borderRadius:26,backgroundColor:'#0B1325',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#263A68',overflow:'hidden'},languageBadge:{position:'absolute',top:14,left:14,borderRadius:99,paddingHorizontal:10,paddingVertical:6,backgroundColor:'#111C35',borderWidth:1,borderColor:'#36507D',zIndex:2},languageText:{color:'#8CE4F3',fontWeight:'900',fontSize:9,letterSpacing:.5},photo:{width:'100%',height:'100%'},type:{position:'absolute',bottom:13,color:'#C9D5FF',fontWeight:'900',fontSize:9,letterSpacing:1.5,backgroundColor:'#081020CC',paddingHorizontal:10,paddingVertical:6,borderRadius:99},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900',marginTop:18},subtitle:{color:'#78839D',marginTop:5},market:{backgroundColor:'#0B1325',borderRadius:20,padding:18,borderWidth:1,borderColor:'#263A68',marginTop:20,marginBottom:12},label:{color:'#6EDDF2',fontSize:10,fontWeight:'900',letterSpacing:1},value:{color:'#F7F9FF',fontSize:34,fontWeight:'900',marginTop:6},note:{color:'#78839D',fontSize:11,marginTop:6,lineHeight:17},owned:{backgroundColor:'#0A1222',borderRadius:20,padding:16,borderWidth:1,borderColor:'#2A3D61',marginBottom:12},ownedTop:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},ownedCount:{color:'#F2F5FF',fontWeight:'900',fontSize:16,marginTop:5},ownedValue:{color:'#D8CCFF',fontWeight:'900',fontSize:18},metrics:{flexDirection:'row',justifyContent:'space-between',marginTop:15,paddingTop:13,borderTopWidth:1,borderTopColor:'#1D2A44'},metricLabel:{color:'#697793',fontSize:9,fontWeight:'900'},metricValue:{color:'#F2F5FF',fontWeight:'900',marginTop:4},positive:{color:'#55E3B1'},negative:{color:'#FF718B'},ownedMeta:{color:'#7D899F',fontSize:10,marginTop:8},infoCard:{backgroundColor:'#09111F',borderRadius:18,borderWidth:1,borderColor:'#192743',paddingHorizontal:14},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#182237'},lastRow:{borderBottomWidth:0},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'800',maxWidth:'58%',textAlign:'right'},wish:{borderWidth:1,borderColor:'#3A4560',borderRadius:16,padding:15,alignItems:'center',marginTop:18},wishText:{color:'#D9DFFF',fontWeight:'900'},priceButton:{borderWidth:1,borderColor:'#52CFEA',borderRadius:16,padding:15,alignItems:'center',marginTop:10},priceButtonText:{color:'#83E6F6',fontWeight:'900'},add:{backgroundColor:'#635BDF',borderRadius:16,padding:16,alignItems:'center',marginTop:10},addText:{color:'#FFFFFF',fontWeight:'900'}});