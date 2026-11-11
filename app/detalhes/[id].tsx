import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

// 1. BASE DE DADOS DETALHADA DOS SANTOS
const SAINTS_DATABASE: Record<string, {
  name: string;
  country: string;
  feastDate: string;
  title: string;
  biography: string;
  prayer: string;
}> = {
  '1': {
    name: 'São Frei Galvão',
    country: 'Brasil 🇧🇷',
    feastDate: '25 de Outubro',
    title: 'Padroeiro dos Construtores e Políticos',
    biography: 'Antônio de Sant\'Ana Galvão nasceu em Guaratinguetá (SP) em 1739. Conhecido por sua extrema caridade, dom da bilocação e de curas milagrosas. Fundou o Mosteiro da Luz em São Paulo e criou as famosas "Pílulas de Frei Galvão".',
    prayer: 'Lembrai-vos, ó puríssima Virgem Maria, que jamais se ouviu dizer que algum daqueles que têm recorrido à vossa proteção tenha sido por vós desamparado.',
  },
  '2': {
    name: 'Santa Teresa de Ávila',
    country: 'Espanha 🇪🇸',
    feastDate: '15 de Outubro',
    title: 'Doutora da Igreja e Mística',
    biography: 'Nascida em 1515, reformou a Ordem das Carmelitas e fundou o Carmelo Descalço. É uma das maiores figuras da mística cristã, autora de obras fundamentais como "O Castelo Interior".',
    prayer: 'Nada te turbe, nada te espante, tudo passa, Deus não muda. A paciência tudo alcança; quem a Deus tem, nada lhe falta: só Deus basta.',
  },
  '3': {
    name: 'São João Paulo II',
    country: 'Polônia 🇵🇱',
    feastDate: '22 de Outubro',
    title: 'Papa da Família e da Juventude',
    biography: 'Karol Wojtyła foi eleito Papa em 1978. Teve um dos papados mais marcantes e longos da história, percorrendo o mundo, promovendo a paz, o ecumenismo e criando a Jornada Mundial da Juventude.',
    prayer: 'Não tenhais medo! Abri, aliás, escancarai as portas a Cristo!',
  },
  '4': {
    name: 'Santa Rosa de Lima',
    country: 'Peru 🇵🇪',
    feastDate: '23 de Agosto',
    title: 'Padroeira da América Latina',
    biography: 'Primeira santa canonizada do continente americano. Dedicou sua vida à oração rigorosa, penitência e ao serviço dos mais necessitados e doentes em sua própria casa.',
    prayer: 'Senhor, aumentai meus sofrimentos, mas aumentai também na mesma medida o meu amor.',
  },
  '5': {
    name: 'São Patrício',
    country: 'Irlanda 🇮🇪',
    feastDate: '17 de Março',
    title: 'Apóstolo e Padroeiro da Irlanda',
    biography: 'Evangelizou a Irlanda no século V. Ficou famoso por utilizar a folha de trevo de três pontas para explicar a doutrina da Santíssima Trindade aos pagãos.',
    prayer: 'Cristo comigo, Cristo à minha frente, Cristo atrás de mim, Cristo em mim.',
  },
  '6': {
    name: 'Santa Josefina Bakhita',
    country: 'Sudão 🇸🇩',
    feastDate: '08 de Fevereiro',
    title: 'Padroeira das Vítimas do Tráfico Humano',
    biography: 'Nascida em Darfur, foi sequestrada e escravizada ainda criança. Mais tarde, na Itália, conheceu a fé católica, conquistou a liberdade e tornou-se freira canossiana.',
    prayer: 'Se eu encontrasse os escravagistas que me sequestraram, ajoelharia para beijar suas mãos, pois se isso não tivesse acontecido, eu não seria cristã.',
  },
  '7': {
    name: 'Santa Teresinha do Menino Jesus',
    country: 'França 🇫🇷',
    feastDate: '01 de Outubro',
    title: 'Doutora da Igreja e Padroeira das Missões',
    biography: 'Nascida em Alençon em 1873, ingressou no Carmelo de Lisieux aos 15 anos. Ensina a "Pequena Via", um caminho de santidade baseado na confiança e na entrega a Deus.',
    prayer: 'Minha vocação é o amor! No coração da Igreja, minha Mãe, eu serei o amor.',
  },
  '8': {
    name: 'São Bento de Núrsia',
    country: 'Itália 🇮🇹',
    feastDate: '11 de Julho',
    title: 'Patrono da Europa e Pai do Monacato Ocidental',
    biography: 'Fundador da Ordem dos Beneditinos e da Abadia de Monte Cassino. Escreveu a famosa Regra de São Bento, com o lema "Ora et Labora".',
    prayer: 'A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia.',
  },
  '9': {
    name: 'São Francisco de Assis',
    country: 'Itália 🇮🇹',
    feastDate: '04 de Outubro',
    title: 'Padroeiro da Ecologia e dos Animais',
    biography: 'Renunciou à riqueza de sua família para viver a pobreza evangélica. Fundou a Ordem dos Frades Menores e recebeu os estigmas da Paixão.',
    prayer: 'Senhor, fazei-me instrumento de vossa paz. Onde houver ódio, que eu leve o amor.',
  },
  '10': {
    name: 'São Antônio de Pádua',
    country: 'Portugal 🇵🇹',
    feastDate: '13 de Junho',
    title: 'Doutor da Igreja e Santo dos Milagres',
    biography: 'Nascido em Lisboa, tornou-se franciscano e destacou-se pela profunda sabedoria e conhecimento das Escrituras Sagradas.',
    prayer: 'Ó glorioso São Antônio, que tivestes a ventura de abraçar e afagar o Menino Jesus, alcançai-me a graça que vos peço.',
  },
  '11': {
    name: 'Santa Rita de Cássia',
    country: 'Itália 🇮🇹',
    feastDate: '22 de Maio',
    title: 'Padroeira das Causas Impossíveis',
    biography: 'Viveu como esposa, mãe, viúva e freira agostiniana. Suportou grandes sofrimentos com fé exemplar, recebendo o estigma do espinho de Cristo na testa.',
    prayer: 'Ó poderosa Santa Rita, chamada Santa dos Impossíveis, a vós me dirijo com confiança em minha aflição.',
  },
};

export default function DetalhesSantoScreen() {
  // 2. CAPTURA O PARÂMETRO 'id' PASSADO NA ROTA
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // 3. BUSCA O SANTO ESPECÍFICO PELO ID
  const santo = id ? SAINTS_DATABASE[id] : null;

  return (
    <ScrollView style={styles.container}>
      {/* Configura o título no topo com o nome do Santo */}
      <Stack.Screen options={{ title: santo ? santo.name : 'Detalhes' }} />

      {santo ? (
        <View style={styles.content}>
          {/* Cabeçalho */}
          <View style={styles.headerCard}>
            <Text style={styles.name}>{santo.name}</Text>
            <Text style={styles.country}>{santo.country}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{santo.title}</Text>
            </View>
          </View>

          {/* Dia de Festa */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>📅 Dia de Festa Celebração</Text>
            <Text style={styles.infoText}>{santo.feastDate}</Text>
          </View>

          {/* Biografia Específica */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>📖 Biografia</Text>
            <Text style={styles.bodyText}>{santo.biography}</Text>
          </View>

          {/* Citação / Oração */}
          <View style={styles.prayerCard}>
            <Text style={styles.prayerTitle}>💭 Citação / Oração</Text>
            <Text style={styles.prayerText}>"{santo.prayer}"</Text>
          </View>
        </View>
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>Nenhum santo encontrado com o ID: {id}</Text>
        </View>
      )}

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Voltar para a lista</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  content: {
    gap: 16,
  },
  headerCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4af37',
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#b8860b',
    textAlign: 'center',
  },
  country: {
    fontSize: 16,
    color: '#7f8c8d',
    marginTop: 4,
  },
  badge: {
    backgroundColor: 'rgba(212, 175, 55, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 10,
  },
  badgeText: {
    color: '#b8860b',
    fontWeight: 'bold',
    fontSize: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  bodyText: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 22,
  },
  prayerCard: {
    backgroundColor: '#fdfbf7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d4af37',
  },
  prayerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b8860b',
    marginBottom: 6,
  },
  prayerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    lineHeight: 20,
  },
  notFoundContainer: {
    padding: 20,
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#c62828',
  },
  backButton: {
    backgroundColor: '#2c3e50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});