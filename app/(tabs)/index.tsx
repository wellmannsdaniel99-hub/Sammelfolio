import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { euro } from '../../data/mock';
import { BrandMark } from '../../components/BrandMark';
import { ProductSilhouette } from '../../components/ProductSilhouette';
import { useCollection } from '../../store/collection';

export default function PortfolioScreen() {
  const { items } = useCollection();
  const value = items.reduce((sum, item) => sum + item.marketPrice * item.quantity, 0);
  const invested = items.reduce((sum, item) => sum + item.buyPrice * item.quantity, 0);
  const gain = value - invested;
  const pct = invested ? (gain / invested) * 100 : 0;
  const positive = gain >= 0;

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <View style={styles.brandRow}><BrandMark/><View><Text style={styles.brand}>SAMMELFOLIO</Text><Text style={styles.claim}>SAMMELN · VERWALTEN · ENTDECKEN</Text></View></View>
    <View style={styles.hero}>
      <View style={styles.glow}/><Text style={styles.label}>DEIN SAMMELFOLIO</Text><Text style={styles.value}>{euro(value)}</Text>
      <Text style={[styles.gain,!positive && styles.loss]}>{positive?'+':''}{euro(gain)} · {positive?'+':''}{pct.toFixed(1)} %</Text>
      <View style={styles.chart}>{[32,48,42,68,76,96,112].map((height,i)=><View key={i} style={[styles.bar,{height}]}/>)}</View>
      <View style={styles.stats}><View><Text style={styles.statLabel}>INVESTIERT</Text><Text style={styles.statValue}>{euro(invested)}</Text></View><View><Text style={styles.statLabel}>SAMMLERSTÜCKE</Text><Text style={styles.statValue}>{items.reduce((s,i)=>s+i.quantity,0)}</Text></View></View>
    </View>
    <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Deine Highlights</Text><Text style={styles.sectionMeta}>{items.length} Positionen</Text></View>
    {items.length===0?<View style={styles.empty}><Text style={styles.emptyIcon}>◇</Text><Text style={styles.emptyTitle}>Dein Folio wartet</Text><Text style={styles.emptyText}>Füge Karten, Top-Trainer-Boxen und Displays hinzu und verfolge deine Sammlung an einem Ort.</Text></View>:items.map(item=><View key={item.id} style={styles.card}>{item.photoUri?<Image source={{uri:item.photoUri}} style={styles.photo}/>:<ProductSilhouette kind={item.kind} type={item.productType} size={58}/>}<View style={styles.cardCopy}><Text style={styles.cardName}>{item.name}</Text><Text style={styles.meta}>{item.subtitle} · {item.quantity}×</Text></View><Text style={styles.cardValue}>{euro(item.marketPrice*item.quantity)}</Text></View>)}
  </ScrollView></SafeAreaView>;
}

const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#050914'},container:{padding:20,paddingBottom:38},brandRow:{flexDirection:'row',alignItems:'center',gap:12,marginBottom:22},brand:{color:'#F7FAFF',fontWeight:'900',fontSize:21,letterSpacing:1.7},claim:{color:'#74819D',fontSize:8,fontWeight:'800',letterSpacing:1.15,marginTop:3},hero:{backgroundColor:'#0B1325',borderRadius:26,padding:21,borderWidth:1,borderColor:'#21305A',overflow:'hidden'},glow:{position:'absolute',width:180,height:180,borderRadius:90,backgroundColor:'#4428A8',opacity:.13,right:-45,top:-80},label:{color:'#6EDDF2',fontSize:11,fontWeight:'900',letterSpacing:1.5},value:{color:'#F8FAFF',fontSize:40,fontWeight:'900',marginTop:7},gain:{color:'#55E3B1',fontWeight:'900',marginTop:4},loss:{color:'#FF718B'},chart:{height:125,flexDirection:'row',alignItems:'flex-end',gap:8,marginTop:18,borderBottomWidth:1,borderBottomColor:'#253251'},bar:{flex:1,backgroundColor:'#647CFF',borderTopLeftRadius:5,borderTopRightRadius:5,opacity:.9},stats:{flexDirection:'row',justifyContent:'space-between',marginTop:16},statLabel:{color:'#697793',fontSize:10,fontWeight:'900',letterSpacing:.7},statValue:{color:'#F0F4FF',fontSize:17,fontWeight:'900',marginTop:3},sectionRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',marginTop:26,marginBottom:12},sectionTitle:{color:'#F4F7FF',fontSize:20,fontWeight:'900'},sectionMeta:{color:'#68758F',fontSize:11,fontWeight:'700'},card:{backgroundColor:'#0A1222',borderRadius:18,padding:13,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#192743',marginBottom:10},photo:{width:58,height:58,borderRadius:13,backgroundColor:'#10182B'},cardCopy:{flex:1,marginLeft:12},cardName:{color:'#F2F5FF',fontWeight:'800',fontSize:14},cardValue:{color:'#C9D2FF',fontWeight:'900',fontSize:14},meta:{color:'#71809B',fontSize:11,marginTop:4},empty:{backgroundColor:'#09111F',borderRadius:22,borderWidth:1,borderColor:'#192743',padding:28,alignItems:'center'},emptyIcon:{color:'#7B86FF',fontSize:42},emptyTitle:{color:'#F4F7FF',fontSize:18,fontWeight:'900',marginTop:6},emptyText:{color:'#71809B',fontSize:12,lineHeight:18,textAlign:'center',marginTop:7,maxWidth:300}});