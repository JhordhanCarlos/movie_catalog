import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getWatchedMovies, getToWatchMovies } from "../../services/storage"; // Importe suas funções
import { useFocusEffect } from "@react-navigation/native";

// Defina a tipagem para o objeto de filme
interface Movie {
  id: number;
  title: string;
  // Adicione outras propriedades do filme que você utiliza (ex: poster_path)
}

// Tipagem para os tipos de filtro
type FilterType = "watched" | "toWatch" | null;

const MyListScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("watched"); // Filtro padrão

  // Função para buscar os filmes do AsyncStorage com base no filtro
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      let fetchedMovies: Movie[] = [];
      if (filter === "watched") {
        fetchedMovies = await getWatchedMovies();
      } else if (filter === "toWatch") {
        fetchedMovies = await getToWatchMovies();
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Erro ao carregar a lista de filmes:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  // useEffect para carregar os filmes quando o filtro mudar
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // useFocusEffect para recarregar a lista sempre que a tela for focada
  // (ex: quando o usuário volta para esta tela)
  useFocusEffect(
    useCallback(() => {
      fetchMovies();
    }, [fetchMovies])
  );

  // Componente para renderizar cada item da lista
  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "watched" && styles.activeButton,
          ]}
          onPress={() => setFilter("watched")}
        >
          <Text style={styles.buttonText}>Já Assistido</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "toWatch" && styles.activeButton,
          ]}
          onPress={() => setFilter("toWatch")}
        >
          <Text style={styles.buttonText}>Quero Assistir</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {movies.length > 0 ? (
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <Text style={styles.emptyText}>
              Nenhum filme encontrado na sua lista.
            </Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: "#007AFF", // Cor de destaque para o botão ativo
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  movieItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});

export default MyListScreen;
