import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { addToWatchMovie, addWatchedMovie } from "../../services/storage";

// Tipagem completa do filme, essencial para a persistência
type MovieProps = {
  movie: {
    id: number;
    title: string;
    poster_path: string | null;
  };
};

// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }: MovieProps) {
  const handleAddToWatch = async () => {
    try {
      await addToWatchMovie(movie);
      // Opcional: Adicionar feedback ao usuário, como um Toast ou alerta
    } catch (error) {
      console.error("Falha ao adicionar à watchlist:", error);
    }
  };

  const handleAddToWatched = async () => {
    try {
      await addWatchedMovie(movie);
      // Opcional: Adicionar feedback ao usuário
    } catch (error) {
      console.error("Falha ao adicionar aos assistidos:", error);
    }
  };

  // const posterSource = movie.poster_path
  //   ? { uri: `${IMAGE_BASE_URL}${movie.poster_path}` }
  //   : require("../../../assets/placeholder.png"); // Use uma imagem de placeholder local

  return (
    <View style={styles.container}>
      <View style={styles.movieInfo}>
        {/* <Image source={posterSource} style={styles.poster} resizeMode="cover" /> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
      </View>
      <View style={styles.buttonCardContainer}>
        <Pressable style={styles.buttonCard} onPress={handleAddToWatch}>
          <Feather name="plus" size={24} color="black" />
          <Text>Watchlist</Text>
        </Pressable>
        <Pressable style={styles.buttonCard} onPress={handleAddToWatched}>
          <Feather name="eye" size={24} color="black" />
          <Text>Watched</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  movieInfo: {
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonCardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  buttonCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
