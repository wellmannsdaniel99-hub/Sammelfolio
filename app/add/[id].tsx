import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { discoveries, euro } from '../../data/mock';
import { useCollection } from '../../store/collection';

const conditions = ['NM', 'EX', 'GD', 'LP', 'PL'];

export default function AddItemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = discoveries.find(entry => entry.id === id);
  const { addItem } = useCollection();
  const [quantity, setQuantity] = useState('1');
  const [buyPrice, setBuyPrice] = useState(item ? String(item.buyPrice).replace('.', ',') : '');
  const [condition, setCondition] = useState('NM');

  if (!item) {
    return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Nicht gefunden</Text></View></SafeAreaView>;
  }

  const save = () => {
    const parsedQty = Math.max(1, Number.parseInt(quantity, 10) || 1);
    const parsedPrice = Number.parseFloat(buyPrice.replace(',', '.')) || 0;
    addItem({ item, quantity: parsedQty, buyPrice: parsedPrice, condition: item.kind === 'Karte' ? condition : undefined });
    router.replace('/(tabs)/collection');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()}><Text style={styles.back}>‹ Zurück</Text></Pressable>
        <Text style={styles.title}>Hinzufügen</Text>
        <Text style={styles.subtitle}>{item.name}</Text>

        <Text style={styles.label}>MENGE</Text>
        <TextInput value={quantity} onChangeText={setQuantity} keyboardType="number-pad" style={styles.input} />

        {item.kind === 'Karte' && (
          <>
            <Text style={styles.label}>ZUSTAND</Text>
            <View style={styles.chips}>
              {conditions.map(value => (
                <Pressable key={value} style={[styles.chip, condition === value && styles.chipActive]} onPress={() => setCondition(value)}>
                  <Text style={[styles.chipText, condition === value && styles.chipTextActive]}>{value}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Text style={styles.label}>KAUFPREIS PRO STÜCK</Text>
        <TextInput value={buyPrice} onChangeText={setBuyPrice} keyboardType="decimal-pad" style={styles.input} />

        <View style={styles.summary}>
          <View style={styles.row}><Text style={styles.key}>Aktueller Marktwert</Text><Text style={styles.val}>{euro(item.marketPrice)}</Text></View>
          <View style={styles.row}><Text style={styles.key}>Sprache</Text><Text style={styles.val}>Deutsch</Text></View>
          <View style={styles.row}><Text style={styles.key}>Typ</Text><Text style={styles.val}>{item.kind}</Text></View>
        </View>

        <Pressable style={styles.save} onPress={save}><Text style={styles.saveText}>In Sammlung speichern</Text></Pressable>
        <Text style={styles.note}>Kaufdatum und Notizen ergänzen wir im nächsten Ausbau.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#080D19'},container:{padding:20,paddingBottom:36},back:{color:'#8193FF',fontWeight:'800',marginBottom:18},title:{color:'#F6F8FF',fontSize:28,fontWeight:'900'},subtitle:{color:'#78839D',marginTop:5,marginBottom:24},label:{color:'#6F7C97',fontSize:11,fontWeight:'900',letterSpacing:1,marginBottom:8,marginTop:16},input:{backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40',borderRadius:14,paddingHorizontal:14,paddingVertical:13,color:'#F6F8FF',fontSize:16},chips:{flexDirection:'row',gap:8,flexWrap:'wrap'},chip:{paddingHorizontal:14,paddingVertical:9,borderRadius:999,backgroundColor:'#11192A',borderWidth:1,borderColor:'#202A40'},chipActive:{backgroundColor:'#7C8FFF',borderColor:'#7C8FFF'},chipText:{color:'#A8B1C7',fontWeight:'800'},chipTextActive:{color:'#07101C'},summary:{backgroundColor:'#0F1727',borderRadius:18,padding:14,borderWidth:1,borderColor:'#1C263A',marginTop:24},row:{flexDirection:'row',justifyContent:'space-between',paddingVertical:9},key:{color:'#78839D'},val:{color:'#EFF3FF',fontWeight:'700'},save:{backgroundColor:'#7C8FFF',borderRadius:16,padding:16,alignItems:'center',marginTop:22},saveText:{color:'#07101C',fontWeight:'900'},note:{color:'#667085',fontSize:12,textAlign:'center',marginTop:10}
});
