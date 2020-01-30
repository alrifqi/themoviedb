import Movie from '@/services';

const state = {
  movies: [],
  movieDetail: null,
  genres: [],
  casts: [],
  keyword: null,
  isLoading: false,
};


const actions = {
  getDiscoverMovie({ commit }, page) {
    commit('setLoading', true);
    Movie.discover(page)
      .then((resp) => {
        commit('setMovies', resp.data);
        commit('setLoading', false);
      });
  },

  getGenre({ commit }) {
    Movie.getGenre()
      .then((resp) => {
        commit('setGenres', resp.data);
      });
  },

  getMovieDetail({ commit }, payload) {
    commit('setLoading', true);
    Movie.getMovieDetail(payload)
      .then((resp) => {
        commit('setMovieDetail', resp.data);
        commit('setLoading', false);
      });
  },
  getMovieCast({ commit }, payload) {
    Movie.getCast(payload)
      .then((resp) => {
        commit('setMovieCast', resp.data);
      });
  },
  getSearchMovie({ commit }, { keyword, page }) {
    commit('setKeyword', keyword);
    Movie.searchMovie(keyword, page)
      .then((resp) => {
        commit('setMovies', resp.data);
      });
  },
};

const mutations = {
  setMovies(stateVal, movies) {
    state.movies = movies;
  },
  setGenres(stateVal, genres) {
    state.genres = genres.genres;
  },
  setMovieDetail(stateVal, movie) {
    state.movieDetail = movie;
  },
  setMovieCast(stateVal, casts) {
    state.casts = casts;
  },
  setKeyword(stateVal, keyword) {
    state.keyword = keyword;
  },
  setLoading(stateVal, loading) {
    state.isLoading = loading;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
