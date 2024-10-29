import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { NewsBG } from '../../assets';

const NoticiasPage = ({ route }) => {
  const { id } = route.params || {}; // Verifica se route.params existe
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Carregamento das fontes
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.post('/articles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }), // Passando o ID no corpo
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar as notícias');
        }

        const data = await response.json();
        setArticles(data); // Armazenando a lista de artigos
      } catch (error) {
        console.error('Erro ao buscar as notícias:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticles(); // Chama a função apenas se o id existir
    } else {
      setLoading(false); // Caso não tenha id, desativa o loading
    }
  }, [id]);

  if (!fontsLoaded || loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }

  if (articles.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Notícias não encontradas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {articles.map(article => (
          <View key={article.pk_IDarticle} style={styles.newsContainer}>
            <NewsBG source={{ uri: article.image_article }} width={'100%'} height={200} style={styles.newsImage} />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{article.title_article}</Text>
              <Text style={styles.newsSubtitle}>Por {article.reference_article}</Text>
              <Text style={styles.newsDate}>{new Date(article.date_article).toLocaleDateString()}</Text>
            </View>
            <View style={styles.newsContentContainer}>
              <Text style={styles.newsContent}>{article.description_article}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flexGrow: 1,
  },
  newsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start', 
    marginTop: 20,
    marginHorizontal: 10, 
    borderRadius: 5,
    marginBottom: 20,
  },
  newsImage: {
    width: '100%', 
    height: 200,
    borderRadius: 5, 
  },
  newsTextContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  newsTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Poppins_500Medium', 
  },
  newsSubtitle: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
  },
  newsDate: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Poppins_400Regular',
    marginTop: 5,
  },
  newsContentContainer: {
    borderRadius: 20, 
    padding: 10,
    marginHorizontal: 10, 
    backgroundColor: '#F1F1F1',
  },
  newsContent: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 10,
    lineHeight: 22, 
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoticiasPage;
