import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export type SantoCardProps = {
  id: string;
  name: string;
  country: string;
  description: string;
  isFav: boolean;
  onToggleFavorite: () => void;
};

export function SantoCard({
  id,
  name,
  country,
  description,
  isFav,
  onToggleFavorite,
}: SantoCardProps) {
  const router = useRouter();

  // Função disparada ao clicar no nome ou no card
  const handlePress = () => {
    router.push({
      pathname: '/detalhes/[id]',
      params: { id },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          {/* Clique direto no nome do santo */}
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.country}>{country}</Text>
        </View>

        {/* Botão do favorito isolado para não disparar a navegação */}
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation(); // Impede a abertura da tela de detalhes
            onToggleFavorite();
          }}
        >
          <Ionicons
            name={isFav ? 'bookmark' : 'bookmark-outline'}
            size={26}
            color={isFav ? '#d4af37' : '#95a5a6'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  country: {
    fontSize: 13,
    color: '#7f8c8d',
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    marginTop: 8,
  },
});