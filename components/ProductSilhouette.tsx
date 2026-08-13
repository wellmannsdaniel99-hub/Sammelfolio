import { StyleSheet, Text, View } from 'react-native';
import { ProductType } from '../data/mock';

type Props = { type?: ProductType; kind?: 'Karte' | 'Sealed'; size?: number };

export function ProductSilhouette({ type, kind = 'Sealed', size = 58 }: Props) {
  const scale = size / 58;
  if (kind === 'Karte') return <View style={[s.frame,{width:size,height:size*1.08}]}><View style={[s.card,{transform:[{scale}]}]}><View style={s.cardEdge}/><View style={s.cardGlow}/></View></View>;
  return <View style={[s.frame,{width:size,height:size}]}><View style={{transform:[{scale}]}}>{renderShape(type)}</View></View>;
}

function renderShape(type?: ProductType) {
  switch(type){
    case 'Top-Trainer-Box': return <View style={s.etb}><View style={s.etbTop}/><View style={s.etbSide}/><View style={s.etbFace}/><Text style={s.tiny}>ETB</Text></View>;
    case 'Display': return <View style={s.display}><View style={s.displayBack}/><View style={s.displayBase}/><View style={s.displaySide}/><View style={s.packRow}><View style={s.miniPack}/><View style={s.miniPack}/><View style={s.miniPack}/></View></View>;
    case 'Booster Bundle': return <View style={s.bundle}><View style={s.bundleTop}/><View style={s.bundleSide}/><View style={s.bundleFace}/><Text style={s.tiny}>6×</Text></View>;
    case 'Booster': return <View style={s.booster}><View style={s.boosterLip}/><View style={s.boosterFace}/><View style={s.boosterShine}/></View>;
    case 'Tin': return <View style={s.tin}><View style={s.tinTop}/><View style={s.tinSide}/><View style={s.tinFace}/></View>;
    case 'Mini-Tin': return <View style={s.miniTin}><View style={s.miniTinTop}/><View style={s.miniTinSide}/><View style={s.miniTinFace}/></View>;
    case 'Kollektion': return <View style={s.collectionBox}><View style={s.collectionTop}/><View style={s.collectionSide}/><View style={s.window}><View style={s.promo}/></View></View>;
    default: return <View style={s.generic}><View style={s.genericTop}/><View style={s.genericSide}/><View style={s.genericFace}/></View>;
  }
}

const s=StyleSheet.create({
frame:{borderRadius:13,backgroundColor:'#0D1730',borderWidth:1,borderColor:'#263A68',alignItems:'center',justifyContent:'center',overflow:'hidden'},
card:{width:30,height:43,borderRadius:5,backgroundColor:'#132A48',borderWidth:2,borderColor:'#5DE2F4',shadowColor:'#5DE2F4',shadowOpacity:.35,shadowRadius:6,shadowOffset:{width:0,height:3}},cardEdge:{position:'absolute',right:-5,top:3,width:5,height:38,backgroundColor:'#334D82',transform:[{skewY:'-25deg'}]},cardGlow:{position:'absolute',left:5,top:5,width:7,height:28,borderRadius:4,backgroundColor:'#68E7F5',opacity:.18},
etb:{width:42,height:31},etbFace:{position:'absolute',left:3,top:8,width:32,height:21,borderRadius:4,backgroundColor:'#30245E',borderWidth:2,borderColor:'#9B6AF4'},etbTop:{position:'absolute',left:6,top:3,width:32,height:10,backgroundColor:'#4D3A86',borderWidth:1,borderColor:'#B38AFF',transform:[{skewX:'-26deg'}]},etbSide:{position:'absolute',right:1,top:8,width:8,height:21,backgroundColor:'#1B2F60',borderRightWidth:1,borderColor:'#5ADAF1',transform:[{skewY:'-24deg'}]},
display:{width:46,height:35},displayBack:{position:'absolute',left:8,top:1,width:30,height:18,borderRadius:3,backgroundColor:'#32265A',borderWidth:1,borderColor:'#9C6CF7'},displayBase:{position:'absolute',left:3,bottom:2,width:36,height:18,backgroundColor:'#201B43',borderWidth:2,borderColor:'#A85CF4',borderRadius:3},displaySide:{position:'absolute',right:1,bottom:4,width:8,height:16,backgroundColor:'#182B55',transform:[{skewY:'-25deg'}]},packRow:{position:'absolute',left:8,bottom:6,flexDirection:'row',gap:2},miniPack:{width:7,height:14,borderRadius:1,backgroundColor:'#21445D',borderWidth:1,borderColor:'#63DDED'},
bundle:{width:39,height:30},bundleFace:{position:'absolute',left:3,top:8,width:29,height:20,borderRadius:3,backgroundColor:'#173C53',borderWidth:2,borderColor:'#58DDF0'},bundleTop:{position:'absolute',left:6,top:3,width:29,height:9,backgroundColor:'#245E75',borderWidth:1,borderColor:'#7DE7F5',transform:[{skewX:'-25deg'}]},bundleSide:{position:'absolute',right:1,top:8,width:7,height:20,backgroundColor:'#33265F',transform:[{skewY:'-24deg'}]},
booster:{width:24,height:42},boosterFace:{position:'absolute',left:2,top:4,width:20,height:35,borderRadius:3,backgroundColor:'#173B52',borderWidth:2,borderColor:'#61DFF2'},boosterLip:{position:'absolute',top:0,left:3,width:18,height:6,borderTopWidth:2,borderBottomWidth:1,borderColor:'#A36DF8'},boosterShine:{position:'absolute',left:7,top:8,width:4,height:24,borderRadius:3,backgroundColor:'#C8F7FF',opacity:.18,transform:[{rotate:'8deg'}]},
tin:{width:40,height:28},tinFace:{position:'absolute',left:3,top:7,width:30,height:19,borderRadius:6,backgroundColor:'#2A2452',borderWidth:2,borderColor:'#9C6BF3'},tinTop:{position:'absolute',left:6,top:3,width:30,height:9,borderRadius:6,backgroundColor:'#473775',borderWidth:1,borderColor:'#C09BFF',transform:[{skewX:'-20deg'}]},tinSide:{position:'absolute',right:1,top:7,width:8,height:19,borderRadius:4,backgroundColor:'#16334C'},
miniTin:{width:33,height:31},miniTinFace:{position:'absolute',left:4,top:8,width:24,height:20,borderRadius:6,backgroundColor:'#173D4F',borderWidth:2,borderColor:'#5BDAEC'},miniTinTop:{position:'absolute',left:6,top:4,width:24,height:8,borderRadius:5,backgroundColor:'#286071',borderWidth:1,borderColor:'#8EEAF5',transform:[{skewX:'-18deg'}]},miniTinSide:{position:'absolute',right:1,top:8,width:6,height:20,borderRadius:3,backgroundColor:'#38245C'},
collectionBox:{width:46,height:34},collectionTop:{position:'absolute',left:6,top:2,width:34,height:9,backgroundColor:'#493477',borderWidth:1,borderColor:'#B282FF',transform:[{skewX:'-22deg'}]},collectionSide:{position:'absolute',right:1,top:8,width:8,height:23,backgroundColor:'#173B52',transform:[{skewY:'-23deg'}]},window:{position:'absolute',left:3,top:8,width:35,height:23,borderRadius:4,backgroundColor:'#181B35',borderWidth:2,borderColor:'#9E62F1',alignItems:'center',justifyContent:'center'},promo:{width:13,height:18,borderRadius:2,backgroundColor:'#245A70',borderWidth:1,borderColor:'#63DCEC'},
generic:{width:40,height:30},genericFace:{position:'absolute',left:3,top:8,width:30,height:20,borderRadius:3,backgroundColor:'#28204D',borderWidth:2,borderColor:'#9867F2'},genericTop:{position:'absolute',left:6,top:3,width:30,height:9,backgroundColor:'#443475',borderWidth:1,borderColor:'#BC91FF',transform:[{skewX:'-22deg'}]},genericSide:{position:'absolute',right:1,top:8,width:7,height:20,backgroundColor:'#17384F',transform:[{skewY:'-22deg'}]},
tiny:{position:'absolute',left:7,top:14,color:'#EAF9FF',fontWeight:'900',fontSize:7}
});