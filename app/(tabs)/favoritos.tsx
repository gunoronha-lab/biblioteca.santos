import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Saint {
  id: string;
  name: string;
  country: string;
  feastDate: Date;
  description: string;
}

// BASE DE DADOS COMPLETA DE SANTOS (11 SANTOS)
const SAINTS_DATA: Saint[] = [
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
  },
  {
    id: '7',
    name: 'Santa Teresinha do Menino Jesus',
    country: 'França 🇫🇷',
    feastDate: new Date(2024, 9, 1),
    description: 'Doutora da Igreja conhecida pela "Pequena Via" da infância espiritual e por sua promessa de fazer chover rosas de graças.',
  },
  {
    id: '8',
    name: 'São Bento de Núrsia',
    country: 'Itália 🇮🇹',
    feastDate: new Date(2024, 6, 11),
    description: 'Pai do monacato ocidental e padroeiro da Europa. Criador da famosa regra "Ora et Labora" (Ora e Trabalha).',
  },
  {
    id: '9',
    name: 'São Francisco de Assis',
    country: 'Itália 🇮🇹',
    feastDate: new Date(2024, 9, 4),
    description: 'Fundador da Ordem dos Franciscanos, amava a pobreza, a paz e a criação, recebendo os estigmas de Cristo.',
  },
  {
    id: '10',
    name: 'São Antônio de Pádua',
    country: 'Portugal 🇵🇹',
    feastDate: new Date(2024, 5, 13),
    description: 'Grande pregador e Doutor da Igreja. Conhecido popularmente como o santo dos milagres e das coisas perdidas.',
  },
  {
    id: '11',
    name: 'Santa Rita de Cássia',
    country: 'Itália 🇮🇹',
    feastDate: new Date(2024, 4, 22),
    description: 'Conhecida como a "Santa das Causas Impossíveis", viveu o matrimônio, a maternidade e a vida religiosa com profunda fé.',
  },
];

export default function FavoritosScreen() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('@saints_favorites');
      if (savedFavorites !== null) {
        setFavoriteIds(JSON.parse(savedFavorites));
      } else {
        setFavoriteIds([]);
      }
    } catch (error) {
      console.error('Erro ao ler favoritos do AsyncStorage', error);
    }
  };

  const removeFavorite = async (id: string) => {
    try {
      const updatedFavorites = favoriteIds.filter((favId) => favId !== id);
      setFavoriteIds(updatedFavorites);
      await AsyncStorage.setItem('@saints_favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao remover favorito', error);
    }
  };

  const handleSelectSaint = (id: string) => {
    router.push(`/detalhes/${id}` as any);
  };

  const favoriteSaints = SAINTS_DATA.filter((saint) => favoriteIds.includes(saint.id));

  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <Ionicons name="sparkles" size={20} color="#d4af37" style={{ marginRight: 8 }} />
          <Text style={styles.headerTitle}>Minhas Devoções</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>
            {favoriteSaints.length} {favoriteSaints.length === 1 ? 'santo guardado' : 'santos guardados'}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ESTADO VAZIO */}
        {favoriteSaints.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="bookmark" size={42} color="#b8860b" />
            </View>
            <Text style={styles.emptyTitle}>Sua capela particular está vazia</Text>
            <View style={styles.goldDivider} />
            <Text style={styles.emptyDescription}>
              Você ainda não favoritou nenhum santo. Na tela principal de Santos, toque no marcador dourado para guardar suas devoções especiais aqui.
            </Text>
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/' as any)}
              activeOpacity={0.8}
            >
              <Ionicons name="book-outline" size={18} color="#ffffff" style={{ marginRight: 6 }} />
              <Text style={styles.exploreButtonText}>Explorar Galeria de Santos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* LISTAGEM DOS SANTOS FAVORITADOS */
          favoriteSaints.map((saint) => {
            const formattedFeast = format(saint.feastDate, "dd 'de' MMMM", { locale: ptBR });

            return (
              <TouchableOpacity
                key={saint.id}
                activeOpacity={0.85}
                onPress={() => handleSelectSaint(saint.id)}
                style={styles.card}
              >
                <View style={styles.cardGoldHeader} />

                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.saintName}>{saint.name}</Text>
                      <Text style={styles.country}>{saint.country}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeFavorite(saint.id)}
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      style={styles.bookmarkButton}
                    >
                      <Ionicons name="bookmark" size={24} color="#d4af37" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dateBadge}>
                    <Ionicons name="calendar-outline" size={13} color="#b8860b" style={{ marginRight: 6 }} />
                    <Text style={styles.dateText}>Festa Litúrgica: {formattedFeast}</Text>
                  </View>

                  <Text style={styles.description} numberOfLines={2}>
                    {saint.description}
                  </Text>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardFooterText}>Ver detalhes e oração</Text>
                    <Ionicons name="chevron-forward" size={14} color="#b8860b" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfbf7',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 60 : 45,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#f0e6d2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  countBadge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#f0e6d2',
    elevation: 2,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 175, 55, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  goldDivider: {
    height: 2,
    width: 50,
    backgroundColor: '#d4af37',
    marginVertical: 12,
    borderRadius: 1,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: '#b8860b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    elevation: 2,
  },
  exploreButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f0e6d2',
    overflow: 'hidden',
    elevation: 3,
  },
  cardGoldHeader: {
    height: 4,
    backgroundColor: '#d4af37',
  },
  cardBody: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
   justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  saintName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  country: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 2,
  },
  bookmarkButton: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 8,
    borderRadius: 20,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfbf7',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0e6d2',
  },
  dateText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f9f5ed',
  },
  cardFooterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#b8860b',
    marginRight: 4,
  },
});