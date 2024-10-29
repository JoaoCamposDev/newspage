import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { TitleWatch } from '../assets';
import api from '../services/api';

const { width, height } = Dimensions.get('window');

const Horarios = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState('');
  const [loading, setLoading] = useState(false);

  const getTime = async () => {
    setLoading(true);
    try {
      console.log(cep);
      const response = await api.post('/pickupTime', { cep });
      setDados(response.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      )}
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.logoContainer}>
          <TitleWatch />
          <Text style={styles.description}>
            Confira os horários da coleta na tabela abaixo. O caminhão da coleta estará disponível conforme indicado!
          </Text>
        </View>

        <View style={styles.cepContainer}>
          <Text style={styles.cepLabel}>CEP :</Text>
          <TextInput
            style={styles.cepInput}
            placeholder="Digite o CEP"
            value={cep}
            onChangeText={setCep}
            keyboardType="numeric"
            onEndEditing={getTime}
          />
        </View>

        <View style={styles.tabelaContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Dia</Text>
            <Text style={styles.tableHeaderText}>Comum</Text>
            <Text style={styles.tableHeaderText}>Seletiva</Text>
          </View>

          {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((dia, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{dia}</Text>
              <Text style={styles.tableCell}> 
                {dados && dados[dia] ? dados[dia].diurno : '-'}
              </Text>
              <Text style={styles.tableCell}> 
                {dados && dados[dia] ? dados[dia].noturno : '-'}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.newsContainer}>
          <Text style={styles.subtitle}>Qual é a diferença entre coleta seletiva e comum?</Text>
          <View style={styles.containerInfo}>
            <Text style={styles.info}>
              Coleta Seletiva: A coleta seletiva separa materiais recicláveis para serem reaproveitados.
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.info}>
              Coleta Comum: A coleta comum leva os resíduos não recicláveis para descarte adequado.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: "center",
  },
  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.04,
    lineHeight: width * 0.05,
    marginTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  newsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.03,
    borderRadius: 5,
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
    backgroundColor: "#E2F2DF",
    elevation: 2,
    borderColor: '#A6D89B',
    borderWidth: 0.5,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.045,
    textAlign: 'center',
    padding: width * 0.009,
  },
  containerInfo: {
    flex: 1,
    width: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.04,
    borderRadius: 5,
    marginBottom: height * 0.01,
    marginTop: height * 0.01,
    backgroundColor: "#6BBF59",
    minHeight: 80, 
  },
  info: {
    fontFamily: "Poppins_600SemiBold",
    color: 'white',
    fontSize: width * 0.035,
    marginVertical: height * 0.001,
  }, 
  tabelaContainer: {
    borderColor: '#A6D89B',
    borderWidth: 0.5,
    borderRadius: 5,
    marginTop: height * 0.02,
  }, 
  cepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  cepLabel: {
    fontFamily: 'Poppins_500Medium',
    fontSize: width * 0.045,
    color: '#000',
    marginRight: 10,
  },
  cepInput: {
    flex: 1,
    height: 40,
    borderColor: '#A6D89B',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: width * 0.04,
    backgroundColor: '#E2F2DF',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#E2F2DF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    borderRadius: 5,
  },
  tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    fontSize: width * 0.04,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    fontSize: width * 0.04,
  },
  loaderContainer: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    marginTop: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
    color: '#ffffff',
  },
});

export default Horarios;
