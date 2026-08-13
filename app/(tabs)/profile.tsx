import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Verwaltung, Preisquellen und App-Einstellungen.</Text>
        <Pressable style={styles.action} onPress={() => router.push('/sealed-prices')}>
          <View><Text style={styles.label}>SEALED-PREISE</Text><Text style={styles.value}>Preise pflegen</Text><Text style={styles.meta}>TTBs, Bundles und Displays zentral aktualisieren</Text></View><Text style={styles.chevron}>›</Text>
        </Pressable>
        <View style={styles.card}><Text style={styles.label}>SPRACHE</Text><Text style={styles.value}>Deutsch</Text></View>
        <View style={styles.card}><Text style={styles.label}>PREISQUELLEN</Text><Text style={styles.value}>Karten: TCGdex · Sealed: manuell</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18,lineHeight:20},action:{backgroundColor:'#11192A',borderRadius:18,padding:16,borderWidth:1,borderColor:'#28365A',marginBottom:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},card:{backgroundColor:'#0F1727',borderRadius:18,padding:16,borderWidth:1,borderColor:'#1C263A',marginBottom:10},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F2F5FF',fontSize:15,fontWeight:'800',marginTop:6},meta:{color:'#77839A',fontSize:12,marginTop:4},chevron:{color:'#8193FF',fontSize:28}});
