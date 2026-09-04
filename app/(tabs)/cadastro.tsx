// arquivo: app/cadastro.tsx
import React from 'react';
import { View, Text, ScrollView, Button, StyleSheet, SafeAreaView } from 'react-native';
import CustomInput from '@/components/CustomInput';

export default function CadastroScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Cadastro de Fiel</Text>
          <Text style={styles.subtitle}>Junte-se à nossa comunidade</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>
          <CustomInput label="Nome completo" placeholder="Digite seu nome completo" />
          <CustomInput label="Data de nascimento" placeholder="DD/MM/AAAA" />
          <CustomInput label="CPF" placeholder="Apenas números" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <CustomInput label="E-mail" placeholder="Digite seu e-mail" />
          <CustomInput label="Telefone" placeholder="(00) 00000-0000" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acesso</Text>
          <CustomInput label="Senha" placeholder="Crie uma senha forte" secureTextEntry={true} />
          <CustomInput label="Confirmação de senha" placeholder="Repita a senha" secureTextEntry={true} />
        </View>

        <View style={styles.buttonContainer}>
          {/* Usando a cor dourada nativa do tema no botão */}
          <Button 
            title="Realizar Cadastro" 
            color="#d4af37" 
            onPress={() => alert('Cadastro realizado com sucesso!')} 
          />
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6f8', // Fundo padrão da tela de santos
  },
  scrollContainer: { 
    padding: 20, 
  },
  header: {
    marginBottom: 25,
    alignItems: 'center',
  },
  mainTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: '#2c3e50', // Azul escuro
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 5,
  },
  section: { 
    marginBottom: 20, 
    padding: 18, 
    backgroundColor: '#ffffff', // Card branco
    borderRadius: 12, 
    borderWidth: 1,
    borderColor: '#e0e0e0',
    // Sombras idênticas aos cards dos santos
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: { 
    fontSize: 18, 
    color: '#d4af37', // Dourado
    fontWeight: 'bold', 
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  buttonContainer: { 
    marginTop: 10, 
    marginBottom: 40,
    borderRadius: 8,
    overflow: 'hidden', // Garante que o botão respeite o arredondamento em alguns dispositivos
  },
});