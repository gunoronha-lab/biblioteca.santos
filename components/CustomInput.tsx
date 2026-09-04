// arquivo: components/CustomInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface CustomInputProps {
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export default function CustomInput({ label, placeholder, secureTextEntry = false }: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#95a5a6" // Cinza mais suave para o placeholder
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { 
    fontSize: 16, 
    color: '#2c3e50', // Azul-escuro padrão da tela principal
    marginBottom: 5, 
    fontWeight: 'bold' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0', // Borda sutil igual aos cards dos santos
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
    color: '#2c3e50',
  },
});