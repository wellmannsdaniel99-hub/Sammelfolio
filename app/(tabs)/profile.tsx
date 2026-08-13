import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Konten, Sprache, Preisquellen und App-Einstellungen kommen als Nächstes.</Text>
        <View style={styles.card}><Text style={styles.label}>SPRACHE</Text><Text style={styles.value}>Deutsch</Text></View>
        <View style={styles.card}><Text style={styles.label}>PREISQUELLE</Text><Text style={styles.value}>Mock-Daten · TCGdex geplant</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:4,marginBottom:18,lineHeight:20},card:{backgroundColor:'#0F1727',borderRadius:18,padding:16,borderWidth:1,borderColor:'#1C263A',marginBottom:10},label:{color:'#6F7C97',fontSize:11,fontWeight:'800'},value:{color:'#F2F5FF',fontSize:15,fontWeight:'800',marginTop:6}
});
