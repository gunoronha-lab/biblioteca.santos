// arquivo: app/botao-inteligente.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, SafeAreaView, Pressable } from 'react-native';

export default function BotaoInteligenteScreen() {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const [statusTexto, setStatusTexto] = useState('Aguardando toque...');
  const [contadorCliques, setContadorCliques] = useState(0); // Novo estado para o clique simples

  // 1. Evento: Toque simples (Rápido)
  const handlePress = () => {
    setContadorCliques(prev => prev + 1);
    setStatusTexto('Estado: Clique curto detectado!');
  };

  // 2. Evento: Segurar o botão (Prolongado)
  const handleLongPress = () => {
    setIsLongPressed(true);
    setStatusTexto('Estado: Pressionado por muito tempo (VERDE)');
  };

  // 3. Evento: Soltar o botão (Após qualquer tipo de clique)
  const handlePressOut = () => {
    setIsLongPressed(false); // Retorna a cor para azul
    // Não alteramos o texto aqui para não sobrescrever a mensagem do handlePress
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerWrapper}>
          
          <View style={styles.header}>
            <Text style={styles.mainTitle}>Botão Inteligente</Text>
            <Text style={styles.subtitle}>Gerenciamento de Múltiplos Eventos</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interação</Text>

            <Text style={styles.statusText}>{statusTexto}</Text>
            
            {/* Exibe quantas vezes o clique simples ocorreu */}
            <Text style={styles.counterText}>
              Cliques curtos: {contadorCliques}
            </Text>

            <Pressable
              onPress={handlePress}           // Dispara no clique rápido
              onLongPress={handleLongPress}   // Dispara após 500ms segurando
              onPressOut={handlePressOut}     // Dispara ao soltar o dedo
              delayLongPress={500}
              style={[
                styles.smartButton,
                { backgroundColor: isLongPressed ? '#2e7d32' : '#1976d2' } 
              ]}
            >
              <Text style={styles.buttonText}>
                {isLongPressed ? 'SEGURANDO (VERDE)' : 'NORMAL (AZUL)'}
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d4af37', 
  },
  scrollContainer: { 
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 16,
    alignItems: 'center', 
  },
  containerWrapper: {
    width: '100%',
    maxWidth: 550, 
    alignSelf: 'center',
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  mainTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fdfbf7', 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#f5efdf', 
    marginTop: 6,
    textAlign: 'center',
  },
  section: { 
    marginBottom: 24, 
    padding: 24, 
    backgroundColor: '#fdfbf7', 
    borderRadius: 12, 
    borderWidth: 1.5,
    borderColor: '#b8860b',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  sectionTitle: { 
    fontSize: 18, 
    color: '#b8860b', 
    fontWeight: 'bold', 
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e6c8',
    paddingBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  statusText: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
    textAlign: 'center',
  },
  counterText: {
    fontSize: 18,
    color: '#1976d2', // Azul para combinar com o botão normal
    marginBottom: 20,
    fontWeight: 'bold',
  },
  smartButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});