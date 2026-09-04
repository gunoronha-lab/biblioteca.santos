// 1. Suas importações originais mantidas
import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

// 2. Importação do date-fns + idioma
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// 3. Importação dos demais pacotes obrigatórios do seu trabalho
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import React, { useState, useEffect } from 'react';

// --- DADOS DA APLICAÇÃO ---
const SAINTS_DATA = [
  {
    id: '1',
    name: 'São Frei Galvão',
    country: 'Brasil 🇧🇷',
    feastDate: new Date(2024, 9, 25),
    description: 'Primeiro santo nascido no Brasil. Conhecido por sua caridade, dons de cura e pelas famosas "Pílulas de Frei Galvão".',
  },
  {
    id: '2',
    name: 'Santa Teresa de Ávila',
    country: 'Espanha 🇪🇸',
    feastDate: new Date(2024, 9, 15),
    description: 'Mística, fundadora das Carmelitas Descalças e Doutora da Igreja. Autora de obras clássicas de espiritualidade.',
  },
  {
    id: '3',
    name: 'São João Paulo II',
    country: 'Polônia 🇵🇱',
    feastDate: new Date(2024, 9, 22),
    description: 'Um dos papados mais longos da história. Defensor da vida, criador das Jornadas Mundiais da Juventude (JMJ).',
  },
  {
    id: '4',
    name: 'Santa Rosa de Lima',
    country: 'Peru 🇵🇪',
    feastDate: new Date(2024, 7, 23),
    description: 'Primeira santa da América. Dedicou sua vida à oração, penitência e ao cuidado dos enfermos e necessitados.',
  },
  {
    id: '5',
    name: 'São Patrício',
    country: 'Irlanda 🇮🇪',
    feastDate: new Date(2024, 2, 17),
    description: 'Apóstolo da Irlanda. Usava o trevo para explicar o mistério da Santíssima Trindade aos pagãos.',
  },
  {
    id: '6',
    name: 'Santa Josefina Bakhita',
    country: 'Sudão 🇸🇩',
    feastDate: new Date(2024, 1, 8),
    description: 'Sequestrada na infância, encontrou a fé cristã na Itália, tornando-se freira e um símbolo de perdão.',
  }
];

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const tecnologias = [
    '@expo/vector-icons',
    'date-fns',
    '@react-native-async-storage/async-storage',
    'react-native-toast-message',
    'lottie-react-native'
  ];

  useEffect(() => {
    loadFavorites();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('@saints_favorites');
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Erro ao ler AsyncStorage', error);
    }
  };

  const toggleFavorite = async (saint: any) => {
    try {
      const isCurrentlyFavorite = favorites.includes(saint.id);
      let newFavorites;

      if (isCurrentlyFavorite) {
        newFavorites = favorites.filter(id => id !== saint.id);
      } else {
        newFavorites = [...favorites, saint.id];
      }

      setFavorites(newFavorites);
      await AsyncStorage.setItem('@saints_favorites', JSON.stringify(newFavorites));

      Toast.show({
        type: isCurrentlyFavorite ? 'info' : 'success',
        text1: isCurrentlyFavorite ? 'Removido das devoções' : 'Adicionado às devoções',
        text2: `${saint.name} foi atualizado.`,
        position: 'bottom',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível salvar sua preferência.',
      });
    }
  };

 /* if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        {Platform.OS !== 'web' && (
          <LottieView
            source={{ uri: 'https://assets5.lottiefiles.com/packages/lf20_us143X.json' }}
            autoPlay
            loop
            style={styles.lottie}
          />
        )}
        <ThemedText style={{ marginTop: 10 }}>Carregando Biblioteca Católica...</ThemedText>
      </ThemedView>
    );
  }*/

  return (
    // Usando o componente Parallax do seu template para um efeito visual incrível
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#d4af37', dark: '#b5952f' }}
        headerImage={
          <Ionicons size={200} name="book" color="#ffffff" style={styles.headerImage} />
        }>
        
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Santos da Igreja</ThemedText>
          <HelloWave />
        </ThemedView>

        {SAINTS_DATA.map((saint) => {
          const isFav = favorites.includes(saint.id);
          const formattedFeast = format(saint.feastDate, "dd 'de' MMMM", { locale: ptBR });

          return (
            <ThemedView key={saint.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <ThemedText type="subtitle">{saint.name}</ThemedText>
                  <Text style={styles.country}>{saint.country}</Text>
                </View>
                
                <TouchableOpacity onPress={() => toggleFavorite(saint)}>
                  <Ionicons
                    name={isFav ? 'bookmark' : 'bookmark-outline'}
                    size={28}
                    color={isFav ? '#d4af37' : '#95a5a6'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.dateBadge}>
                <Ionicons name="calendar-outline" size={16} color="#2c3e50" style={{ marginRight: 5 }} />
                <Text style={styles.dateText}>Dia de festa: {formattedFeast}</Text>
              </View>

              <ThemedText>{saint.description}</ThemedText>
            </ThemedView>
          );
        })}

        {/* Seção Tecnologias Utilizadas (Obrigatório para o seu Print) */}
        <ThemedView style={styles.techCard}>
          <ThemedText type="subtitle" style={{ marginBottom: 15 }}>Tecnologias utilizadas:</ThemedText>
          {tecnologias.map((tech, index) => (
            <View key={index} style={styles.techItem}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <ThemedText style={styles.techText}>{tech}</ThemedText>
            </View>
          ))}
        </ThemedView>

      </ParallaxScrollView>
      
      {/* O Toast precisa ficar solto no nível principal, fora do ScrollView */}
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -50,
    left: -20,
    position: 'absolute',
    opacity: 0.3,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 150,
    height: 150,
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  country: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  techCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: '#d4af37',
    elevation: 2,
    backgroundColor: 'rgba(212, 175, 55, 0.1)', // Um fundo dourado bem suave
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  techText: {
    marginLeft: 10,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});