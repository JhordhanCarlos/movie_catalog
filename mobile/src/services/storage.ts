import AsyncStorage from "@react-native-async-storage/async-storage";

const WATCHED_MOVIES_KEY = "@watchedMovies";
const TO_WATCH_MOVIES_KEY = "@toWatchMovies";

export const addWatchedMovie = async (movie: any) => {
  try {
    // 1. Obtém a lista atual de filmes assistidos
    const currentMovies = await getWatchedMovies();

    // 2. Verifica se o filme já existe na lista para evitar duplicatas
    const isMovieAlreadyAdded = currentMovies.some(
      (m: any) => m.id === movie.id
    );

    if (!isMovieAlreadyAdded) {
      // 3. Adiciona o novo filme à lista
      const updatedMovies = [...currentMovies, movie];

      // 4. Salva a lista atualizada
      const jsonValue = JSON.stringify(updatedMovies);
      await AsyncStorage.setItem(WATCHED_MOVIES_KEY, jsonValue);
      console.log(`Filme '${movie.title}' adicionado à lista de assistidos.`);
    } else {
      console.log(`Filme '${movie.title}' já está na lista de assistidos.`);
    }
  } catch (e) {
    console.error("Erro ao adicionar filme aos assistidos:", e);
    throw e;
  }
};

export const addToWatchMovie = async (movie: any) => {
  try {
    const currentMovies = await getToWatchMovies();
    const isMovieAlreadyAdded = currentMovies.some(
      (m: any) => m.id === movie.id
    );

    if (!isMovieAlreadyAdded) {
      const updatedMovies = [...currentMovies, movie];
      const jsonValue = JSON.stringify(updatedMovies);
      await AsyncStorage.setItem(TO_WATCH_MOVIES_KEY, jsonValue);
      console.log(
        `Filme '${movie.title}' adicionado à lista de quero assistir.`
      );
    } else {
      console.log(`Filme '${movie.title}' já está na lista de quero assistir.`);
    }
  } catch (e) {
    console.error("Erro ao adicionar filme aos que quero assistir:", e);
    throw e;
  }
};

export const saveWatchedMovies = async (movies: any[]) => {
  try {
    const jsonValue = JSON.stringify(movies);
    await AsyncStorage.setItem(WATCHED_MOVIES_KEY, jsonValue);
    console.log("Filmes assistidos salvos com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar filmes assistidos:", e);
  }
};

export const getWatchedMovies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(WATCHED_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar filmes assistidos:", e);
    return [];
  }
};

export const saveToWatchMovies = async (movies: any[]) => {
  try {
    const jsonValue = JSON.stringify(movies);
    await AsyncStorage.setItem(TO_WATCH_MOVIES_KEY, jsonValue);
    console.log("Filmes para assistir salvos com sucesso!");
  } catch (e) {
    console.error("Erro ao salvar filmes para assistir:", e);
  }
};

export const getToWatchMovies = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TO_WATCH_MOVIES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao buscar filmes para assistir:", e);
    return [];
  }
};
