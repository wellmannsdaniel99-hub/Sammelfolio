import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { collection, euro } from '../../data/mock';

export default function CollectionScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sammlung</Text>
        <Text style={styles.subtitle}>Karten und Sealed an einem Ort.</Text>
        {collection.map(item => {
          const gain = (item.marketPrice - item.buyPrice) * item.quantity;
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.badge}><Text style={styles.badgeText}>{item.kind}</Text></View>
              <View style={styles.main}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>{item.subtitle}</Text>
                <Text style={styles.meta}>{item.quantity}× · Kauf {euro(item.buyPrice)}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.name}>{euro(item.marketPrice * item.quantity)}</Text>
                <Text style={styles.gain}>+{euro(gain)}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18},card:{backgroundColor:'#0F1727',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center',borderWidth:1,borderColor:'#1C263A',marginBottom:10},badge:{width:54,height:54,borderRadius:12,backgroundColor:'#202B45',alignItems:'center',justifyContent:'center'},badgeText:{color:'#8FA0FF',fontSize:10,fontWeight:'900'},main:{flex:1,paddingHorizontal:12},name:{color:'#F2F5FF',fontSize:15,fontWeight:'800'},meta:{color:'#77839A',fontSize:12,marginTop:4},right:{alignItems:'flex-end'},gain:{color:'#5DE1A3',fontSize:12,fontWeight:'800',marginTop:5}
});
