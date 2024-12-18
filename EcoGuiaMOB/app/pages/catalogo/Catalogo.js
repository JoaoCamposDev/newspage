import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Footer from '../../components/Footer';
import { Lixo, Recicla, TitleCatalogo, NewsBG } from '../../assets';

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Catalogo = ({ navigation }) => {
 
  const [selectedFilter, setSelectedFilter] = useState(null);
  
  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  return (
    <View style={styles.container}>
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.logoContainer}>
          <TitleCatalogo/>
          <Text style={styles.description}>
            Encontre toda informação necessária para ter uma vida mais sustentável e um consumo consciente!
          </Text>
        </View>

        {/* Filtro */}
        <ScrollView
          horizontal={true}
          style={styles.filterContainer}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Inicial' ? styles.selected : styles.unselected]}
            onPress={() => handleFilterPress('Inicial')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Inicial' ? styles.selectedText : styles.unselectedText]}>Inicial</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Notícias' ? styles.selected : styles.unselected]}
            onPress={() => handleFilterPress('Notícias')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Notícias' ? styles.selectedText : styles.unselectedText]}>Notícias</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Artigos' ? styles.selected : styles.unselected]}
            onPress={() => handleFilterPress('Artigos')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Artigos' ? styles.selectedText : styles.unselectedText]}>Artigos</Text>
          </TouchableOpacity>
          
           
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Faça você mesmo' ? styles.selected : styles.unselected]}
            onPress={() => handleFilterPress('Faça você mesmo')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Faça você mesmo' ? styles.selectedText : styles.unselectedText]}>Faça você mesmo</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Notícia */}
        <TouchableOpacity style={styles.newsContainer} onPress={() => navigation.navigate('NoticiasPage')}>
          <NewsBG style={styles.newsImage} />
          <Text style={styles.newsTitle}>Projeto do Einstein de transformação de resíduos impulsiona geração de renda em Paraisópolis</Text>
        </TouchableOpacity>

        {/* Lista de Materiais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReciclavelPage')}>
            <Recicla />
            <Text style={styles.buttonText}>Lista de Materiais Recicláveis.</Text>
            <Text style={styles.buttonDescription}>Confira e descubra.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DescartavelPage')}>
            <Lixo />
            <Text style={styles.buttonText}>Não descarte estes materiais!</Text>
            <Text style={styles.buttonDescription}>Veja e aprenda.</Text> 
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
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
    paddingBottom: 75,
  },

  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  description: {
    color: "#000",
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    fontSize: width * 0.04,  
    lineHeight: width * 0.05,
    marginTop: 10,
    paddingHorizontal: 20,
  },

  filterContainer: {
    marginBottom: 20,
  },

  filterButton: {
    height: height * 0.05,  
    paddingVertical: 1,
    paddingHorizontal: width * 0.02,  
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 10,
  },

  filterText: {
    fontSize: width * 0.035,  
    fontFamily: "Poppins_400Regular",
  },

  selected: {
    backgroundColor: "#4CAF50",
  },

  unselected: {
    backgroundColor: "#F1F1F1",
  },

  selectedText: {
    color: "#FFF",
    paddingHorizontal: 5,
  },

  unselectedText: {
    color: "#3F463E",
    paddingHorizontal: 5,
  },

  newsContainer: {
    padding: 10, 
    borderRadius: 5,
    backgroundColor: "#E2F2DF",
    elevation: 2,
    marginBottom: 20,
    alignItems: 'center', // Centraliza o conteúdo dentro do container
    width: '100%', // Ocupa a largura total do container pai
  },

  newsImage: {
    borderRadius: 5,
    width: '100%', // Ocupa toda a largura do container de notícias
    height: height * 0.25,  // Define uma altura proporcional
    resizeMode: 'cover', // Garante que a imagem cubra o espaço
  },

  newsTitle: {
    marginTop: 10,
    fontSize: width * 0.04,
    color: "#000",
    fontFamily: "Poppins_500Medium",
 
  },

  // ... o

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  
  button: {
    backgroundColor: "#F1F1F1",
    width: "48%",
    height: height * 0.25, 
    borderRadius: 5,
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 10,
    elevation: 2,
  },

  buttonText: {
    fontSize: width * 0.04,  
    color: "#000",
    fontFamily: "Poppins_500Medium",
    fontWeight: "600",
  },

  buttonDescription: {
    color: "#3F463E",
    fontSize: width * 0.03,  
    fontFamily: "Poppins_400Regular",
    fontWeight: "500",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default Catalogo;
