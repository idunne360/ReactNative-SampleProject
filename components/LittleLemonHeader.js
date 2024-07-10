import * as React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';



export default function LittleLemonHeader() {
  const window = useWindowDimensions();

  return (
    <View style={{ alignItems: 'center', width: window.width, flex: .14, backgroundColor: '#F4CE14' }}>
      <Text style={{ paddingTop: 50, fontSize: 30, color: 'black' }}
        numberOfLines={3}>
        <Text style={{fontWeight: 'bold' }}> Little Lemon </Text>
      </Text>
    </View>
  );
}