// arquivo: app/cadastro.tsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, ScrollView, SafeAreaView, Pressable, Switch } from 'react-native';
import CustomInput from '@/components/CustomInput';

export default function CadastroScreen() {
  // =========================================================================
  // 1. EXEMPLO DE STATE (Estado)
  // O State é a memória reativa do componente. Quando o valor de 'nome' ou 
  // 'aceitaTermos' é alterado pelas funções modificadoras, a interface 
  // recarrega (re-renderiza) para exibir as novas informações na tela.
  // =========================================================================
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);

  // Estados para feedbacks visuais de interação
  const [isEmailFocado, setIsEmailFocado] = useState(false);
  const [mensagemTeclado, setMensagemTeclado] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  function handleEmailFocus() {
    setIsEmailFocado(true);
  }

  function handleEmailBlur() {
    setIsEmailFocado(false);
  }

  function handleSubmitTelefone() {
    setMensagemTeclado('🚀 Teclado acionado no campo Telefone.');
  }

  // Função disparada pelo Evento de clique/toque no botão de envio
  function handleSave() {
    if (!aceitaTermos) {
      setMensagemSucesso('⚠️ Você precisa aceitar os termos para se cadastrar.');
      return;
    }
    
    if (!email.includes('@')) {
      setMensagemSucesso('⚠️ Digite um e-mail válido.');
      return;
    }

    setMensagemSucesso(`✅ Cadastro realizado com sucesso!`);
  }

  function handleLongPress() {
    console.log('Pressão prolongada no botão de cadastro');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formWrapper}>
          
          <View style={styles.header}>
            <Text style={styles.mainTitle}>Cadastro de Fiel</Text>
            <Text style={styles.subtitle}>Junte-se à nossa comunidade</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>

            {/* 
              =================================================================
              2. RELAÇÃO: PROPS, EVENTO E STATE EM INPUT DE TEXTO
              - PROP: 'label' e 'placeholder' enviam dados estáticos para o componente filho.
              - STATE PASSADO COMO PROP: 'value={nome}' envia o estado atual ao input.
              - EVENTO: 'onChangeText={setNome}' passa a função modificadora do State. 
                Quando o usuário digita, o evento dispara 'setNome' -> altera o State -> atualiza a tela.
              =================================================================
            */}
            <CustomInput 
              label="Nome completo"                 // PROP
              placeholder="Digite seu nome completo" // PROP
              value={nome}                          // PROP ligada ao STATE
              onChangeText={setNome}               // EVENTO que altera o STATE
            />
            
            <CustomInput label="Data de nascimento" placeholder="DD/MM/AAAA" />
            <CustomInput label="CPF" placeholder="Apenas números" />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contato</Text>
            
            <CustomInput 
              label="E-mail" 
              placeholder="exemplo@igreja.com" 
              value={email}
              onChangeText={setEmail}
              onFocus={handleEmailFocus}   // EVENTO: Captura quando o campo ganha foco
              onBlur={handleEmailBlur}     // EVENTO: Captura quando o campo perde foco
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={[
              styles.focusBadge, 
              isEmailFocado ? styles.focusBadgeActive : styles.focusBadgeInactive
            ]}>
              <Text style={styles.focusBadgeText}>
                {isEmailFocado ? '📧 Digitando no E-mail (EM FOCO)' : '💤 Campo E-mail inativo'}
              </Text>
            </View>

            <CustomInput 
              label="Telefone" 
              placeholder="(00) 00000-0000" 
              value={telefone}
              onChangeText={setTelefone}
              onSubmitEditing={handleSubmitTelefone} // EVENTO: Captura a tecla 'Concluir' do teclado
              returnKeyType="done"
            />

            {mensagemTeclado !== '' && (
              <View style={styles.keyboardBadge}>
                <Text style={styles.keyboardBadgeText}>{mensagemTeclado}</Text>
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acesso & Termos</Text>
            <CustomInput label="Senha" placeholder="Crie uma senha forte" secureTextEntry={true} />
            <CustomInput label="Confirmação de senha" placeholder="Repita a senha" secureTextEntry={true} />

            <View style={styles.switchBox}>
              <View style={styles.switchRow}>
                <Text style={styles.switchLabel}>Aceitar termos de uso</Text>
                
                {/* 
                  =============================================================
                  3. RELAÇÃO: PROPS, EVENTO E STATE NO COMPONENTE SWITCH
                  - PROP / STATE: 'value={aceitaTermos}' passa o estado booleano.
                  - EVENTO: 'onValueChange={setAceitaTermos}' captura a alternância da chave.
                =============================================================
                */}
                <Switch 
                  value={aceitaTermos}             // PROP ligada ao STATE
                  onValueChange={setAceitaTermos}  // EVENTO que altera o STATE
                  trackColor={{ false: '#d1c7a5', true: '#b8860b' }}
                  thumbColor={aceitaTermos ? '#fdfbf7' : '#ffffff'}
                />
              </View>

              <Text style={[
                styles.switchStatusText,
                aceitaTermos ? styles.acceptedText : styles.unacceptedText
              ]}>
                {aceitaTermos ? '✅ Termos aceitos' : '❌ Termos não aceitos'}
              </Text>
            </View>
          </View>

          {mensagemSucesso !== '' && (
            <View style={styles.successMessageContainer}>
              <Text style={styles.successMessageText}>{mensagemSucesso}</Text>
            </View>
          )}

          {/* 
            =================================================================
            4. EXEMPLO DE EVENTO DE TOQUE (Pressable)
            - PROP: 'delayLongPress' ajusta o tempo do clique longo.
            - EVENTO: 'onPress={handleSave}' recebe a referência da função que 
              será executada pelo React Native no toque do usuário.
            =================================================================
          */}
          <Pressable 
            style={({ pressed }) => [
              styles.submitButton,
              pressed && styles.submitButtonPressed
            ]}
            onPress={handleSave}             // EVENTO de clique simples
            onLongPress={handleLongPress}     // EVENTO de clique longo
            delayLongPress={600}             // PROP estática
          >
            <Text style={styles.buttonText}>Realizar Cadastro</Text>
          </Pressable>

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
  formWrapper: {
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
    padding: 20, 
    backgroundColor: '#fdfbf7', 
    borderRadius: 12, 
    borderWidth: 1.5,
    borderColor: '#b8860b', 
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: { 
    fontSize: 18, 
    color: '#b8860b', 
    fontWeight: 'bold', 
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0e6c8',
    paddingBottom: 8,
  },
  focusBadge: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: 'center',
  },
  focusBadgeActive: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  focusBadgeInactive: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  focusBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  keyboardBadge: {
    backgroundColor: '#ede7f6',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#673ab7',
  },
  keyboardBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#512da8',
    textAlign: 'center',
  },
  switchBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f6ed',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8dcae',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2c3e50',
  },
  switchStatusText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  acceptedText: {
    color: '#2e7d32',
  },
  unacceptedText: {
    color: '#c62828',
  },
  successMessageContainer: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4caf50',
    alignItems: 'center',
  },
  successMessageText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 15,
  },
  submitButton: { 
    marginBottom: 40,
    backgroundColor: '#b8860b', 
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonPressed: {
    backgroundColor: '#8a6308', 
  },
  buttonText: {
    color: '#fdfbf7',
    fontSize: 18,
    fontWeight: 'bold',
  }
});