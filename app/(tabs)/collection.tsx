import { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { euro } from '../../data/mock';
import { useCollection } from '../../store/collection';

type Filter = 'Alle' | 'Karte' | 'Sealed';

export default function CollectionScreen() {
  const { items } = useCollection();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('Alle');
  const filtered = useMemo(() => items.filter(item => {
    const q = query.trim().toLowerCase();
    const searchMatch = !q || `${item.name} ${item.subtitle} ${item.setName ?? ''}`.toLowerCase().includes(q);
    const kindMatch = filter === 'Alle' || item.kind === filter;
    return searchMatch && kindMatch;
  }), [items, query, filter]);

  const totalValue = items.reduce((sum,item)=>sum+item.marketPrice*item.quantity,0);
  const cardCount = items.filter(i=>i.kind==='Karte').reduce((s,i)=>s+i.quantity,0);
  const sealedCount = items.filter(i=>i.kind==='Sealed').reduce((s,i)=>s+i.quantity,0);

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.kicker}>DEIN SAMMELFOLIO</Text><Text style={styles.title}>Sammlung</Text><Text style={styles.subtitle}>Alles, was du sammelst – sauber sortiert.</Text>
    <View style={styles.summary}><View><Text style={styles.summaryLabel}>WERT</Text><Text style={styles.summaryValue}>{euro(totalValue)}</Text></View><View style={styles.summarySplit}><Text style={styles.summaryLabel}>KARTEN</Text><Text style={styles.summaryNumber}>{cardCount}</Text></View><View><Text style={styles.summaryLabel}>SEALED</Text><Text style={styles.summaryNumber}>{sealedCount}</Text></View></View>
    <TextInput value={query} onChangeText={setQuery} placeholder="Sammlung durchsuchen" placeholderTextColor="#64718B" style={styles.search}/>
    <View style={styles.filters}>{(['Alle','Karte','Sealed'] as Filter[]).map(type=><Pressable key={type} onPress={()=>setFilter(type)} style={[styles.filter,filter===type&&styles.filterActive]}><Text style={[styles.filterText,filter===type&&styles.filterTextActive]}>{type==='Karte'?'Karten':type}</Text></Pressable>)}</View>
    {filtered.length===0?<View style={styles.empty}><Text style={styles.emptyTitle}>Nichts gefunden</Text><Text style={styles.emptyText}>Passe Suche oder Filter an – oder füge über Entdecken neue Sammlerstücke hinzu.</Text></View>:filtered.map(item=>{const gain=(item.marketPrice-item.buyPrice)*item.quantity; const positive=gain>=0; return <View key={item.id} style={styles.card}><View style={[styles.badge,item.kind==='Sealed'&&styles.badgeSealed]}><Text style={styles.badgeText}>{item.kind==='Karte'?'KARTE':item.productType==='Top-Trainer-Box'?'TTB':item.productType==='Booster Bundle'?'BUNDLE':item.productType==='Display'?'DISPLAY':'SEALED'}</Text></View><View style={styles.main}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.subtitle}</Text><Text style={styles.meta}>{item.quantity}× · Kauf {euro(item.buyPrice)}{item.purchaseDate?` · ${item.purchaseDate}`:''}</Text>{item.notes?<Text numberOfLines={1} style={styles.note}>{item.notes}</Text>:null}</View><View style={styles.right}><Text style={styles.price}>{euro(item.marketPrice*item.quantity)}</Text><Text style={[styles.gain,!positive&&styles.loss]}>{positive?'+':''}{euro(gain)}</Text></View></View>})}
  </ScrollView></SafeAreaView>;
}

const styles=StyleSheet.create({safe:{flex:1,backgroundColor:'#050914'},container:{padding:20,paddingBottom:38},kicker:{color:'#66DCF1',fontSize:10,fontWeight:'900',letterSpacing:1.4},title:{color:'#F7F9FF',fontSize:30,fontWeight:'900',marginTop:5},subtitle:{color:'#74819A',marginTop:4,marginBottom:17},summary:{backgroundColor:'#0B1325',borderWidth:1,borderColor:'#21305A',borderRadius:20,padding:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},summaryLabel:{color:'#697793',fontSize:9,fontWeight:'900',letterSpacing:1},summaryValue:{color:'#F4F7FF',fontWeight:'900',fontSize:19,marginTop:3},summaryNumber:{color:'#C9D2FF',fontWeight:'900',fontSize:18,marginTop:3},summarySplit:{borderLeftWidth:1,borderRightWidth:1,borderColor:'#253251',paddingHorizontal:18},search:{backgroundColor:'#0A1222',borderRadius:15,borderWidth:1,borderColor:'#1C2B4B',paddingHorizontal:15,paddingVertical:13,color:'#F6F8FF',marginTop:14},filters:{flexDirection:'row',gap:8,marginTop:10,marginBottom:14},filter:{paddingHorizontal:14,paddingVertical:8,borderRadius:999,backgroundColor:'#0A1222',borderWidth:1,borderColor:'#1C2B4B'},filterActive:{backgroundColor:'#162A47',borderColor:'#48C8EA'},filterText:{color:'#7D899F',fontWeight:'800',fontSize:12},filterTextActive:{color:'#79E2F5'},card:{backgroundColor:'#09111F',borderRadius:18,padding:12,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#192743',marginBottom:10},badge:{width:55,height:60,borderRadius:12,backgroundColor:'#101D36',borderWidth:1,borderColor:'#28527A',alignItems:'center',justifyContent:'center'},badgeSealed:{borderColor:'#6846A8'},badgeText:{color:'#8FDFF1',fontSize:8,fontWeight:'900'},main:{flex:1,paddingHorizontal:12},name:{color:'#F2F5FF',fontSize:14,fontWeight:'900'},meta:{color:'#74819A',fontSize:11,marginTop:4},note:{color:'#9AA6BD',fontSize:10,marginTop:5,fontStyle:'italic'},right:{alignItems:'flex-end'},price:{color:'#F2F5FF',fontWeight:'900',fontSize:13},gain:{color:'#55E3B1',fontSize:11,fontWeight:'900',marginTop:5},loss:{color:'#FF718B'},empty:{backgroundColor:'#09111F',borderRadius:20,borderWidth:1,borderColor:'#192743',padding:22},emptyTitle:{color:'#F2F5FF',fontWeight:'900',fontSize:17},emptyText:{color:'#74819A',marginTop:6,lineHeight:18}});