// arquivo: components/CustomInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

// Estende as propriedades padrão do TextInput do React Native
interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry, 
  ...rest 
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999999"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b8860b',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
});