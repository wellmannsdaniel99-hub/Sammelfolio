import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { collection, euro } from '../../data/mock';

export default function PortfolioScreen() {
  const value = collection.reduce((sum, item) => sum + item.marketPrice * item.quantity, 0);
  const invested = collection.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  const gain = value - invested;
  const pct = invested ? (gain / invested) * 100 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>SAMMELFOLIO</Text>
        <Text style={styles.subtitle}>Deine Sammlung. Dein Wert.</Text>

        <View style={styles.hero}>
          <Text style={styles.label}>PORTFOLIOWERT</Text>
          <Text style={styles.value}>{euro(value)}</Text>
          <Text style={styles.gain}>+{euro(gain)} · +{pct.toFixed(1)} %</Text>
          <View style={styles.chart}>
            {[32,48,42,68,76,96,112].map((height, i) => <View key={i} style={[styles.bar,{height}]} />)}
          </View>
          <View style={styles.stats}>
            <View><Text style={styles.statLabel}>INVESTIERT</Text><Text style={styles.statValue}>{euro(invested)}</Text></View>
            <View><Text style={styles.statLabel}>POSITIONEN</Text><Text style={styles.statValue}>{collection.reduce((sum,i)=>sum+i.quantity,0)}</Text></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Top-Positionen</Text>
        {collection.map(item => (
          <View key={item.id} style={styles.card}>
            <View><Text style={styles.cardName}>{item.name}</Text><Text style={styles.meta}>{item.subtitle}</Text></View>
            <Text style={styles.cardName}>{euro(item.marketPrice * item.quantity)}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},brand:{color:'#F6F8FF',fontWeight:'900',fontSize:21,letterSpacing:1.4},subtitle:{color:'#78839D',marginTop:3,marginBottom:18},hero:{backgroundColor:'#11192A',borderRadius:24,padding:20,borderWidth:1,borderColor:'#202A40'},label:{color:'#75829D',fontSize:12,fontWeight:'800',letterSpacing:1.2},value:{color:'#F7F9FF',fontSize:38,fontWeight:'900',marginTop:8},gain:{color:'#5DE1A3',fontWeight:'800',marginTop:4},chart:{height:125,flexDirection:'row',alignItems:'flex-end',gap:9,marginTop:18,borderBottomWidth:1,borderBottomColor:'#29344C'},bar:{flex:1,backgroundColor:'#647CFF',borderTopLeftRadius:5,borderTopRightRadius:5,opacity:.85},stats:{flexDirection:'row',justifyContent:'space-between',marginTop:16},statLabel:{color:'#6F7C97',fontSize:11,fontWeight:'800'},statValue:{color:'#EEF2FF',fontSize:17,fontWeight:'800',marginTop:3},sectionTitle:{color:'#F4F6FC',fontSize:20,fontWeight:'900',marginTop:24,marginBottom:12},card:{backgroundColor:'#0F1727',borderRadius:18,padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderWidth:1,borderColor:'#1C263A',marginBottom:10},cardName:{color:'#F2F5FF',fontWeight:'800',fontSize:15},meta:{color:'#77839A',fontSize:12,marginTop:4}
});
