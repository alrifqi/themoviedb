import axios from 'axios';

const Movie = {
  discover(page = 1) {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.VUE_APP_API_KEY}&language=en-US&page=${page}`);
  },
  getGenre() {
    return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`);
  },
  getMovieDetail(movie) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`);
  },
  getCast(movie) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`);
  },
  getMovieVideos(movie) {
    return axios.get(`https://api.themoviedb.org/3/movie/${movie.movieId}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`);
  },
  searchMovie(keyword, page) {
    return axios.get(`https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=${process.env.VUE_APP_API_KEY}&language=en-US&query=${keyword}&page=${page}`);
  },
};

export default Movie;
