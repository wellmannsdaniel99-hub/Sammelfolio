import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { euro } from '../../data/mock';
import { useWishlist } from '../../store/wishlist';

export default function WishlistScreen() {
  const { items } = useWishlist();
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Wunschliste</Text>
    <Text style={styles.subtitle}>Karten und Sealed, die du noch suchst.</Text>
    {items.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>Noch nichts vorgemerkt</Text><Text style={styles.emptyText}>Öffne eine Karte oder ein Sealed-Produkt und füge es zur Wunschliste hinzu.</Text></View> : items.map(item => <View key={item.id} style={styles.card}><View style={styles.badge}><Text style={styles.badgeText}>{item.kind === 'Karte' ? 'KARTE' : 'SEALED'}</Text></View><View style={styles.main}><Text style={styles.name}>{item.name}</Text><Text style={styles.meta}>{item.subtitle}</Text></View>{item.marketPrice != null && <Text style={styles.price}>{euro(item.marketPrice)}</Text>}</View>)}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18},empty:{backgroundColor:'#0F1727',borderRadius:18,padding:20,borderWidth:1,borderColor:'#1C263A'},emptyTitle:{color:'#F2F5FF',fontWeight:'900',fontSize:17},emptyText:{color:'#78839D',marginTop:6,lineHeight:19},card:{backgroundColor:'#0F1727',borderRadius:18,padding:12,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#1C263A',marginBottom:10},badge:{width:54,height:54,borderRadius:12,backgroundColor:'#202B45',alignItems:'center',justifyContent:'center'},badgeText:{color:'#8FA0FF',fontSize:9,fontWeight:'900'},main:{flex:1,paddingHorizontal:12},name:{color:'#F2F5FF',fontSize:15,fontWeight:'800'},meta:{color:'#77839A',fontSize:12,marginTop:4},price:{color:'#F2F5FF',fontWeight:'900'}});
