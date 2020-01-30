<template>
  <div>
    <MovieList :items='movies' />
    <Pagination
      v-if="movies.total_results >= 1"
      :page='movies.page'
      :total-page='movies.total_pages'/>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import MovieList from '@/components/MovieList.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'home',
  components: {
    MovieList,
    Pagination,
  },
  computed: mapState({
    movies: state => state.movie.movies,
  }),

  async created() {
    this.$store.dispatch('movie/getDiscoverMovie', 1);
  },
};
</script>
