import { StyleSheet, Text, View } from 'react-native';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  const size = compact ? 46 : 62;
  return <View style={[styles.logo,{width:size,height:size,borderRadius:compact?14:19}]}>
    <View style={styles.card}/><View style={styles.etb}/><View style={styles.display}/><Text style={[styles.s,{fontSize:compact?23:31}]}>S</Text>
  </View>;
}

const styles=StyleSheet.create({logo:{backgroundColor:'#0B1430',borderWidth:1,borderColor:'#2D4387',alignItems:'center',justifyContent:'center',overflow:'hidden'},card:{position:'absolute',left:7,top:8,width:19,height:30,borderRadius:4,borderWidth:2,borderColor:'#27DAF2',transform:[{rotate:'-12deg'}]},etb:{position:'absolute',right:6,top:9,width:27,height:22,borderRadius:4,borderWidth:2,borderColor:'#8667F3'},display:{position:'absolute',right:8,bottom:7,width:31,height:15,borderRadius:3,borderWidth:2,borderColor:'#B366FF'},s:{color:'#F9FBFF',fontWeight:'900',textShadowColor:'#686BFF',textShadowRadius:9}});