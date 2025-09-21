import { TextInput, View, Text, Pressable, FlatList } from "react-native";
import { styles } from "./styles";
import { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { searchMovies } from "../../api/index";
import { MovieCard } from "../../components/MovieCard";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [movies, setMovies] = useState<any | []>([]);

  async function handleSearch() {
    const response = await searchMovies(inputValue);

    setMovies(response);
  }

  return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search a movie and press the button..."
          onChangeText={setInputValue}
          value={inputValue}
          style={{ width: "90%" }}
        />
        <Pressable onPress={handleSearch}>
          <Feather name="search" size={24} color="black" />
        </Pressable>
      </View>

      {movies.length === 0 || movies.length === null ? (
        <Text style={{ alignContent: "center", justifyContent: "center" }}>
          No movies searched yet
        </Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={({ item: movie }) => (
            <MovieCard key={movie.id} movie={movie} />
          )}
        />
      )}
    </View>
  );
}
