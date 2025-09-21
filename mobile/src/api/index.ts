import axios from "axios";
/**
 * Busca filmes pelo nome na API do TMDb.
 * @param {string} movieName - O nome do filme a ser buscado.
 * @returns {Promise<Object>} Os dados da resposta da API.
 */
export async function searchMovies(movieName: string): Promise<Object> {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/search/movie",
    params: { query: movieName },
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGNiNmY3N2QyNzU0NzgzZDlmN2Q2NGQyMzY4MmViMiIsIm5iZiI6MTc1ODM2Mjk3MS40MzUwMDAyLCJzdWIiOiI2OGNlN2Q1YjU1NGY2MGIyNGM5N2QxNTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wO1qGAPKY3XBoEsyBmwWU1v9Kd9AVmjRXXlhzTAwrAo",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar o filme:", error);
    throw error; // Rejeita a Promise para que o erro seja tratado por quem chamar a função
  }
}
