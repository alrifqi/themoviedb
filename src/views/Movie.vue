<template>
  <div>
    <v-container fluid v-if="!loading">
      <div class="header">
        <v-container
          :style="{background: `lighblue url(${movieDetail.backdrop_path}) no-repeat fixed center`}"
          >
          <v-row no-gutters>
            <v-col
              cols="12"
              sm="3">
                <div class="img-container">
                  <img
                  class="white--text align-end img-movie"
                  :src="getPostPath(movieDetail.poster_path)" />
                </div>
            </v-col>
            <v-col sm="9">
              <div class="movie-title">
                <h1>{{ movieDetail.original_title }}</h1>
                <span class="grey--text movie-year">
                  ({{ Date(movieDetail.release_date) | moment("YYYY") }})
                </span>
              </div>

              <div class="movie-rating">
                <v-rating
                  :value="getRating(movieDetail.vote_average)"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  length="5"
                  size="14"
                ></v-rating>
                <div class="grey--text ml-4">
                  {{ movieDetail.vote_average }} ({{ movieDetail.vote_count }})
                </div>
              </div>

              <div class="movie-overview">
                <h2>Overview</h2>

                {{ movieDetail.overview }}
              </div>

              <div class="movie-crew">
                <v-container>
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      sm="4">
                      <h3>Producer</h3>
                      {{ producer.name }}
                    </v-col>
                    <v-col
                      v-if="executiveProducer"
                      cols="12"
                      sm="4">
                      <h3>Executive Producer</h3>
                      {{ executiveProducer.name }}
                    </v-col>
                  </v-row>
                </v-container>
              </div>

              <div class="movie-genres">
                <h2>Genre</h2>

                <div>
                  <v-chip
                    class="ma-2"
                    small
                    v-for="(genre, index) in movieDetail.genres"
                    :key="index"
                  >{{ genre.name }}</v-chip>
                </div>
              </div>

            </v-col>
          </v-row>
        </v-container>
      </div>

      <v-divider></v-divider>

      <div class="content">
        <v-container>
          <h1>Cast</h1>
          <v-row no-gutters>
            <v-col
              :key="index"
              v-for="(cast, index) in topCast"
              class="cast-content"
              sm="12" md="3">
              <v-card dark>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="cast-title"
                      v-text="cast.name"
                    ></v-card-title>

                    <v-card-subtitle v-text="cast.character"></v-card-subtitle>
                  </div>

                  <v-avatar
                    class="ma-3"
                    size="125"
                    tile
                  >
                    <v-img :src="getPostPath(cast.profile_path)"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-container>
  </div>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Movie',
  computed: {
    ...mapState({
      movieDetail: state => state.movie.movieDetail,
      casts: state => state.movie.casts,
      genres: state => state.movie.genres,
      loading: state => state.movie.loading,
    }),
    producer() {
      const producer = this.casts.crew.find(crew => crew.job === 'Producer');
      return producer;
    },
    executiveProducer() {
      const executiveProducer = this.casts.crew.find(crew => crew.job === 'Executive Producer');
      return executiveProducer;
    },
    topCast() {
      return this.casts.cast.slice(0, 5);
    },
  },
  mounted() {
    this.$store.dispatch('movie/getMovieCast', { movieId: this.$route.params.movieId });
    this.$store.dispatch('movie/getMovieDetail', { movieId: this.$route.params.movieId });
  },
  methods: {
    getPostPath(img) {
      return `http://image.tmdb.org/t/p/original/${img}`;
    },
    getRating(val) {
      return val / 2;
    },
    getProducer() {
      const producer = this.casts.crew.find(crew => crew.job === 'Producer');
      return producer;
    },
  },
};
</script>

<style scoped>
  .header {
    display: flex;
    justify-content: center;
  }

  .img-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 20px;
  }


  .movie-title {
    display: flex;
    align-items: center;
  }

  .movie-year {
    padding-left: 5px;
  }

  .movie-rating {
    display: flex;
    font-size: 12px;
  }

  .movie-overview {
    margin-top: 30px;
  }

  .img-cast {
    width: 50%;
  }

  .cast-content {
    padding-right: 5px;
    padding-bottom: 5px;
  }

  .cast-title {
    word-break: break-word;
  }

  .movie-genres {
    margin-top: 20px;
  }
</style>
