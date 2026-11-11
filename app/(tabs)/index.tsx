import React, { useState, useEffect } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export interface Saint {
  id: string;
  name: string;
  country: string;
  region: 'Brasil' | 'Europa' | 'América' | 'África';
  feastDate: Date;
  description: string;
  image: string;
}


export const SAINTS_DATA: Saint[] = [
  {
    id: '1',
    name: 'São Frei Galvão',
    country: 'Brasil 🇧🇷',
    region: 'Brasil',
    feastDate: new Date(2024, 9, 25),
    description: 'Primeiro santo nascido no Brasil. Conhecido por sua caridade, dons de cura e pelas famosas "Pílulas de Frei Galvão".',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Frei_Galv%C3%A3o.jpg/300px-Frei_Galv%C3%A3o.jpg',
  },
  {
    id: '2',
    name: 'Santa Teresa de Ávila',
    country: 'Espanha 🇪🇸',
    region: 'Europa',
    feastDate: new Date(2024, 9, 15),
    description: 'Mística, fundadora das Carmelitas Descalças e Doutora da Igreja. Autora de obras clássicas de espiritualidade.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/StTeresaofAvila.jpg/300px-StTeresaofAvila.jpg',
  },
  {
    id: '3',
    name: 'São João Paulo II',
    country: 'Polônia 🇵🇱',
    region: 'Europa',
    feastDate: new Date(2024, 9, 22),
    description: 'Um dos papados mais longos da história. Defensor da vida, criador das Jornadas Mundiais da Juventude (JMJ).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/John_Paul_II_2004.jpg/300px-John_Paul_II_2004.jpg',
  },
  {
    id: '4',
    name: 'Santa Rosa de Lima',
    country: 'Peru 🇵🇪',
    region: 'América',
    feastDate: new Date(2024, 7, 23),
    description: 'Primeira santa da América. Dedicou sua vida à oração, penitência e ao cuidado dos enfermos e necessitados.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Santa_Rosa_de_Lima_Claudio_Coello.jpg/300px-Santa_Rosa_de_Lima_Claudio_Coello.jpg',
  },
  {
    id: '5',
    name: 'São Patrício',
    country: 'Irlanda 🇮🇪',
    region: 'Europa',
    feastDate: new Date(2024, 2, 17),
    description: 'Apóstolo da Irlanda. Usava o trevo para explicar o mistério da Santíssima Trindade aos pagãos.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/St_Patrick_window_at_St_Jordan%27s.jpg/300px-St_Patrick_window_at_St_Jordan%27s.jpg',
  },
  {
    id: '6',
    name: 'Santa Josefina Bakhita',
    country: 'Sudão 🇸🇩',
    region: 'África',
    feastDate: new Date(2024, 1, 8),
    description: 'Sequestrada na infância, encontrou a fé cristã na Itália, tornando-se freira e um símbolo de perdão.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Josephine_Bakhita.jpg/300px-Josephine_Bakhita.jpg',
  },
  {
    id: '7',
    name: 'Santa Teresinha do Menino Jesus',
    country: 'França 🇫🇷',
    region: 'Europa',
    feastDate: new Date(2024, 9, 1),
    description: 'Doutora da Igreja conhecida pela "Pequena Via" da infância espiritual e por sua promessa de fazer chover rosas de graças.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Saint_Th%C3%A9r%C3%A8se_de_Lisieux_1894.jpg/300px-Saint_Th%C3%A9r%C3%A8se_de_Lisieux_1894.jpg',
  },
  {
    id: '8',
    name: 'São Bento de Núrsia',
    country: 'Itália 🇮🇹',
    region: 'Europa',
    feastDate: new Date(2024, 6, 11),
    description: 'Pai do monacato ocidental e padroeiro da Europa. Criador da famosa regra "Ora et Labora" (Ora e Trabalha).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/St.Benedict.jpg/300px-St.Benedict.jpg',
  },
  {
    id: '9',
    name: 'São Francisco de Assis',
    country: 'Itália 🇮🇹',
    region: 'Europa',
    feastDate: new Date(2024, 9, 4),
    description: 'Fundador da Ordem dos Franciscanos, amava a pobreza, a paz e a criação, recebendo os estigmas de Cristo.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Cimabue_Assisi_San_Francesco_crop.jpg/300px-Cimabue_Assisi_San_Francesco_crop.jpg',
  },
  {
    id: '10',
    name: 'São Antônio de Pádua',
    country: 'Portugal 🇵🇹',
    region: 'Europa',
    feastDate: new Date(2024, 5, 13),
    description: 'Grande pregador e Doutor da Igreja. Conhecido popularmente como o santo dos milagres e das coisas perdidas.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/El_Greco_-_Saint_Anthony_of_Padua_-_Google_Art_Project.jpg/300px-El_Greco_-_Saint_Anthony_of_Padua_-_Google_Art_Project.jpg',
  },
  {
    id: '11',
    name: 'Santa Rita de Cássia',
    country: 'Itália 🇮🇹',
    region: 'Europa',
    feastDate: new Date(2024, 4, 22),
    description: 'Conhecida como a "Santa das Causas Impossíveis", viveu o matrimônio, a maternidade e a vida religiosa com profunda fé.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Santa_Rita_da_Cascia_pittura.jpg/300px-Santa_Rita_da_Cascia_pittura.jpg',
  },
];

const FILTER_OPTIONS = ['Todos', 'Brasil', 'Europa', 'América', 'África'];

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const router = useRouter();

  const tecnologias = [
    '@expo/vector-icons',
    'date-fns',
    '@react-native-async-storage/async-storage',
    'react-native-toast-message',
    'lottie-react-native',
  ];

  useEffect(() => {
    loadFavorites();
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

  const toggleFavorite = async (saint: Saint) => {
    try {
      const isCurrentlyFavorite = favorites.includes(saint.id);
      let newFavorites;

      if (isCurrentlyFavorite) {
        newFavorites = favorites.filter((id) => id !== saint.id);
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

  const handleSelectSaint = (id: string) => {
    router.push(`/detalhes/${id}` as any);
  };

  const filteredSaints = SAINTS_DATA.filter((saint) => {
    const matchesSearch =
      saint.name.toLowerCase().includes(searchText.toLowerCase()) ||
      saint.country.toLowerCase().includes(searchText.toLowerCase()) ||
      saint.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesRegion =
      selectedFilter === 'Todos' || saint.region === selectedFilter;

    return matchesSearch && matchesRegion;
  });

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#d4af37', dark: '#b5952f' }}
        headerImage={
          <Ionicons size={200} name="book" color="#ffffff" style={styles.headerImage} />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Santos da Igreja</ThemedText>
          <HelloWave />
        </ThemedView>

        {/* BARRA DE BUSCA EM TEMPO REAL */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#b8860b" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, país ou palavra-chave..."
            placeholderTextColor="#95a5a6"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color="#95a5a6" />
            </TouchableOpacity>
          )}
        </View>

        {/* FILTROS RÁPIDOS POR REGIÃO */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContentContainer}
        >
          {FILTER_OPTIONS.map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.7}
                onPress={() => setSelectedFilter(filter)}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextSelected,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* LISTAGEM DOS SANTOS FILTRADOS COM IMAGEM DE AVATAR */}
        {filteredSaints.length === 0 ? (
          <ThemedView style={styles.notFoundCard}>
            <Ionicons name="search-outline" size={36} color="#d4af37" style={{ marginBottom: 8 }} />
            <Text style={styles.notFoundTitle}>Nenhum santo encontrado</Text>
            <Text style={styles.notFoundSub}>Tente alterar o termo da busca ou o filtro selecionado.</Text>
          </ThemedView>
        ) : (
          filteredSaints.map((saint) => {
            const isFav = favorites.includes(saint.id);
            const formattedFeast = format(saint.feastDate, "dd 'de' MMMM", {
              locale: ptBR,
            });

            return (
              <TouchableOpacity
                key={saint.id}
                activeOpacity={0.8}
                onPress={() => handleSelectSaint(saint.id)}
              >
                <ThemedView style={styles.card}>
                  <View style={styles.cardHeader}>
                    {/* IMAGEM DO SANTO COM BORDA DOURADA */}
                    <Image
                      source={{ uri: saint.image }}
                      style={styles.saintAvatar}
                      contentFit="cover"
                      transition={300}
                    />

                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <ThemedText type="subtitle">{saint.name}</ThemedText>
                      <Text style={styles.country}>{saint.country}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => toggleFavorite(saint)}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Ionicons
                        name={isFav ? 'bookmark' : 'bookmark-outline'}
                        size={28}
                        color={isFav ? '#d4af37' : '#95a5a6'}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dateBadge}>
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#2c3e50"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.dateText}>Dia de festa: {formattedFeast}</Text>
                  </View>

                  <ThemedText>{saint.description}</ThemedText>
                </ThemedView>
              </TouchableOpacity>
            );
          })
        )}

        {/* SEÇÃO DE TECNOLOGIAS */}
        <ThemedView style={styles.techCard}>
          <ThemedText type="subtitle" style={{ marginBottom: 15 }}>
            Tecnologias utilizadas:
          </ThemedText>
          {tecnologias.map((tech, index) => (
            <View key={index} style={styles.techItem}>
              <Ionicons name="checkmark-circle" size={20} color="#27ae60" />
              <ThemedText style={styles.techText}>{tech}</ThemedText>
            </View>
          ))}
        </ThemedView>

        {/* LINK EXTERNO */}
        <ThemedView style={styles.externalLinkCard}>
          <ThemedText type="subtitle" style={{ marginBottom: 6 }}>
            Portal Católico Oficial
          </ThemedText>
          <ThemedText style={styles.externalLinkDescription}>
            Acompanhe notícias, encíclicas e ensinamentos da Igreja diretamente no portal oficial do Vaticano:
          </ThemedText>

          <Link href="https://www.vaticannews.va/pt.html" style={styles.externalLinkButton}>
            <View style={styles.linkContent}>
              <Ionicons name="globe-outline" size={20} color="#ffffff" style={{ marginRight: 8 }} />
              <Text style={styles.externalLinkText}>Visitar Vatican News</Text>
            </View>
          </Link>
        </ThemedView>
      </ParallaxScrollView>

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
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    borderWidth: 1,
    borderColor: '#d4af37',
    marginBottom: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
  },
  filterScrollView: {
    marginBottom: 16,
  },
  filterContentContainer: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  filterChipSelected: {
    backgroundColor: '#b8860b',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  filterChipTextSelected: {
    color: '#ffffff',
  },
  card: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // ESTILO DO AVATAR ARREDONDADO DO SANTO
  saintAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#d4af37',
    backgroundColor: '#f9f5ed',
  },
  country: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
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
  notFoundCard: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notFoundTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  notFoundSub: {
    fontSize: 13,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 4,
  },
  techCard: {
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#d4af37',
    elevation: 2,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
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
  externalLinkCard: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 2,
  },
  externalLinkDescription: {
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  externalLinkButton: {
    backgroundColor: '#b8860b',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  externalLinkText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
