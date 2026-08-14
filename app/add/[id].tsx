import { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { euro, languageName } from '../../data/mock';
import { discoveries } from '../../data/catalog';
import { ProductSilhouette } from '../../components/ProductSilhouette';
import { useCollection } from '../../store/collection';

const conditions = ['NM', 'EX', 'GD', 'LP', 'PL'];

export default function AddItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id);
  const { addItem } = useCollection();
  const [quantity, setQuantity] = useState('1');
  const [buyPrice, setBuyPrice] = useState(item ? String(item.buyPrice).replace('.', ',') : '');
  const [condition, setCondition] = useState('NM');
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().slice(0,10));
  const [notes, setNotes] = useState('');
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  if (!item) return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Nicht gefunden</Text></View></SafeAreaView>;

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: .82 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) return;
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], allowsEditing: true, quality: .82 });
    if (!result.canceled) setPhotoUri(result.assets[0].uri);
  };

  const save = () => {
    const parsedQty = Math.max(1, Number.parseInt(quantity, 10) || 1);
    const parsedPrice = Number.parseFloat(buyPrice.replace(',', '.')) || 0;
    addItem({ item, quantity: parsedQty, buyPrice: parsedPrice, condition: item.kind === 'Karte' ? condition : undefined, purchaseDate, notes: notes.trim() || undefined, photoUri });
    router.replace('/(tabs)/collection');
  };

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
    <Text style={styles.title}>Hinzufügen</Text><Text style={styles.subtitle}>{item.name}</Text>
    {item.kind === 'Sealed' && <View style={styles.photoCard}>{photoUri?<Image source={{uri:photoUri}} style={styles.photo}/>:<ProductSilhouette type={item.productType} size={88}/>}<View style={styles.photoCopy}><Text style={styles.photoTitle}>Dein Produktfoto</Text><Text style={styles.photoText}>Nur für deine Sammlung. Es verändert nicht das allgemeine Katalogbild.</Text><View style={styles.photoActions}><Pressable style={styles.photoButton} onPress={takePhoto}><Text style={styles.photoButtonText}>Kamera</Text></Pressable><Pressable style={styles.photoButton} onPress={pickPhoto}><Text style={styles.photoButtonText}>Mediathek</Text></Pressable></View></View></View>}
    <Text style={styles.label}>MENGE</Text><TextInput value={quantity} onChangeText={setQuantity} keyboardType="number-pad" style={styles.input} />
    {item.kind === 'Karte' && <><Text style={styles.label}>ZUSTAND</Text><View style={styles.chips}>{conditions.map(value => <Pressable key={value} style={[styles.chip,condition===value&&styles.chipActive]} onPress={()=>setCondition(value)}><Text style={[styles.chipText,condition===value&&styles.chipTextActive]}>{value}</Text></Pressable>)}</View></>}
    <Text style={styles.label}>KAUFPREIS PRO STÜCK</Text><TextInput value={buyPrice} onChangeText={setBuyPrice} keyboardType="decimal-pad" style={styles.input} />
    <Text style={styles.label}>KAUFDATUM</Text><TextInput value={purchaseDate} onChangeText={setPurchaseDate} placeholder="YYYY-MM-DD" placeholderTextColor="#657089" style={styles.input} />
    <Text style={styles.label}>NOTIZEN</Text><TextInput value={notes} onChangeText={setNotes} placeholder="z. B. bei Händler XY gekauft" placeholderTextColor="#657089" style={[styles.input,styles.notes]} multiline />
    <View style={styles.summary}><View style={styles.row}><Text style={styles.key}>Aktueller Wert</Text><Text style={styles.val}>{item.marketPrice?euro(item.marketPrice):'Noch nicht gepflegt'}</Text></View><View style={styles.row}><Text style={styles.key}>Sprache</Text><Text style={styles.val}>{languageName(item.language)}</Text></View><View style={styles.row}><Text style={styles.key}>Typ</Text><Text style={styles.val}>{item.kind==='Sealed'&&item.productType==='Top-Trainer-Box'?(item.language==='EN'?'ETB':'TTB'):item.kind==='Sealed'?item.productType:item.kind}</Text></View></View>
    <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>In Sammlung speichern</Text></Pressable>
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({safe:{flex:1,backgroundColor:'#050914'},container:{padding:20,paddingBottom:36},back:{color:'#70DFF2',fontWeight:'800',marginBottom:18},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:5,marginBottom:20},photoCard:{backgroundColor:'#0A1222',borderRadius:18,borderWidth:1,borderColor:'#253967',padding:13,flexDirection:'row',alignItems:'center'},photo:{width:88,height:88,borderRadius:13,backgroundColor:'#111A2E'},photoCopy:{flex:1,marginLeft:13},photoTitle:{color:'#F4F7FF',fontWeight:'900',fontSize:14},photoText:{color:'#77849D',fontSize:10,lineHeight:15,marginTop:4},photoActions:{flexDirection:'row',gap:7,marginTop:9},photoButton:{borderRadius:10,borderWidth:1,borderColor:'#4662A3',paddingHorizontal:10,paddingVertical:7,backgroundColor:'#111C35'},photoButtonText:{color:'#8DE3F2',fontSize:10,fontWeight:'900'},label:{color:'#6F7C97',fontSize:11,fontWeight:'900',letterSpacing:1,marginBottom:8,marginTop:16},input:{backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40',borderRadius:14,paddingHorizontal:14,paddingVertical:13,color:'#F6F8FF',fontSize:16},notes:{minHeight:90,textAlignVertical:'top'},chips:{flexDirection:'row',gap:8,flexWrap:'wrap'},chip:{paddingHorizontal:14,paddingVertical:9,borderRadius:999,backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40'},chipActive:{backgroundColor:'#7C8FFF',borderColor:'#7C8FFF'},chipText:{color:'#A8B1C7',fontWeight:'800'},chipTextActive:{color:'#07101C'},summary:{backgroundColor:'#0F1727',borderRadius:18,padding:14,borderWidth:1,borderColor:'#1C263A',marginTop:24},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:9},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700',maxWidth:'55%',textAlign:'right'},save:{backgroundColor:'#675FE5',borderRadius:16,padding:16,alignItems:'center',marginTop:22},saveText:{color:'#FFFFFF',fontWeight:'900'}});