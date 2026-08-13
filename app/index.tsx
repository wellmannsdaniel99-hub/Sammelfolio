import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialItems = [
  { id: 'mew-199', name: 'Glurak ex', meta: '199/165 · 151 · DE · NM', type: 'Karte', quantity: 1, buy: 220, market: 315 },
  { id: '151-bundle', name: '151 Booster Bundle', meta: 'Deutsch · Sealed', type: 'Sealed', quantity: 4, buy: 59.99, market: 139.5 },
  { id: 'mew-200', name: 'Turtok ex', meta: '200/165 · 151 · DE · NM', type: 'Karte', quantity: 1, buy: 105, market: 169 },
];

const euro = (value: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const totals = useMemo(() => items.reduce((a, i) => ({ value: a.value + i.market * i.quantity, invested: a.invested + i.buy * i.quantity }), { value: 0, invested: 0 }), [items]);
  const gain = totals.value - totals.invested;
  const pct = totals.invested ? (gain / totals.invested) * 100 : 0;

  const addDemoCard = () => setItems(current => current.some(i => i.id === 'mew-198') ? current : [...current, { id: 'mew-198', name: 'Bisaflor ex', meta: '198/165 · 151 · DE · NM', type: 'Karte', quantity: 1, buy: 90, market: 132 }]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}><View><Text style={styles.brand}>SAMMELFOLIO</Text><Text style={styles.subtitle}>Deine Sammlung. Dein Wert.</Text></View><View style={styles.avatar}><Ionicons name="person" size={20} color="#D8E1FF" /></View></View>

        <View style={styles.hero}>
          <Text style={styles.label}>PORTFOLIOWERT</Text>
          <Text style={styles.value}>{euro(totals.value)}</Text>
          <View style={styles.gainRow}><Text style={styles.gain}>+{euro(gain)}</Text><Text style={styles.gain}>+{pct.toFixed(1)} %</Text></View>
          <View style={styles.chart}><View style={[styles.bar,{height:32}]} /><View style={[styles.bar,{height:48}]} /><View style={[styles.bar,{height:42}]} /><View style={[styles.bar,{height:68}]} /><View style={[styles.bar,{height:76}]} /><View style={[styles.bar,{height:96}]} /><View style={[styles.bar,{height:112}]} /></View>
          <View style={styles.stats}><View><Text style={styles.statLabel}>INVESTIERT</Text><Text style={styles.statValue}>{euro(totals.invested)}</Text></View><View><Text style={styles.statLabel}>POSITIONEN</Text><Text style={styles.statValue}>{items.reduce((a,i)=>a+i.quantity,0)}</Text></View></View>
        </View>

        <View style={styles.sectionHead}><Text style={styles.sectionTitle}>Meine Sammlung</Text><Text style={styles.link}>Alle anzeigen</Text></View>
        {items.map(item => <View key={item.id} style={styles.card}><View style={styles.thumb}><Text style={styles.thumbText}>{item.type === 'Karte' ? 'CARD' : 'BOX'}</Text></View><View style={styles.cardMain}><Text style={styles.cardName}>{item.name}</Text><Text style={styles.meta}>{item.meta}</Text><Text style={styles.meta}>{item.quantity}× · Kauf {euro(item.buy)}</Text></View><View style={styles.price}><Text style={styles.cardName}>{euro(item.market * item.quantity)}</Text><Text style={styles.positive}>+{(((item.market-item.buy)/item.buy)*100).toFixed(1)} %</Text></View></View>)}

        <Pressable style={styles.add} onPress={addDemoCard}><Ionicons name="add" size={22} color="#07101C" /><Text style={styles.addText}>Bisaflor ex zur Sammlung hinzufügen</Text></Pressable>
        <Text style={styles.note}>MVP-Demo · Preise und Produkte sind derzeit Beispieldaten.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:48,gap:14},header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8},brand:{color:'#F6F8FF',fontWeight:'900',fontSize:21,letterSpacing:1.4},subtitle:{color:'#78839D',marginTop:3},avatar:{width:40,height:40,borderRadius:20,backgroundColor:'#141C2D',alignItems:'center',justifyContent:'center'},hero:{backgroundColor:'#11192A',borderRadius:24,padding:20,borderWidth:1,borderColor:'#202A40'},label:{color:'#75829D',fontSize:12,fontWeight:'800',letterSpacing:1.2},value:{color:'#F7F9FF',fontSize:38,fontWeight:'900',marginTop:8},gainRow:{flexDirection:'row',gap:12,marginTop:5},gain:{color:'#5DE1A3',fontWeight:'800'},chart:{height:125,flexDirection:'row',alignItems:'flex-end',gap:9,marginTop:18,borderBottomWidth:1,borderBottomColor:'#29344C'},bar:{flex:1,backgroundColor:'#647CFF',borderTopLeftRadius:5,borderTopRightRadius:5,opacity:.85},stats:{flexDirection:'row',justifyContent:'space-between',marginTop:16},statLabel:{color:'#6F7C97',fontSize:11,fontWeight:'800'},statValue:{color:'#EEF2FF',fontSize:17,fontWeight:'800',marginTop:3},sectionHead:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10},sectionTitle:{color:'#F4F6FC',fontSize:20,fontWeight:'900'},link:{color:'#8193FF',fontWeight:'700'},card:{backgroundColor:'#0F1727',borderRadius:18,padding:12,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#1C263A'},thumb:{width:58,height:72,borderRadius:10,backgroundColor:'#222E49',alignItems:'center',justifyContent:'center'},thumbText:{color:'#8193FF',fontSize:10,fontWeight:'900'},cardMain:{flex:1,paddingHorizontal:12},cardName:{color:'#F2F5FF',fontWeight:'800',fontSize:15},meta:{color:'#77839A',fontSize:12,marginTop:4},price:{alignItems:'flex-end'},positive:{color:'#5DE1A3',fontSize:12,fontWeight:'800',marginTop:5},add:{marginTop:8,backgroundColor:'#7C8FFF',borderRadius:16,padding:16,flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8},addText:{color:'#07101C',fontWeight:'900'},note:{color:'#5E6980',fontSize:11,textAlign:'center',marginTop:4}
});
