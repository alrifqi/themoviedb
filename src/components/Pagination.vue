<template>
  <div class="text-center pb-10">
    <v-pagination
      v-model="pageData"
      :length="totalPage"
      total-visible="10"
      circle
      :next="changePage()"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Pagination',
  props: ['page', 'totalPage'],
  computed: {
    ...mapState({
      movies: state => state.movie.movies,
      keyword: state => state.movie.keyword,
    }),
  },
  data: () => ({
    pageData: 1,
  }),
  methods: {
    changePage() {
      if (this.keyword === null) {
        this.$store.dispatch('movie/getDiscoverMovie', this.pageData);
      } else {
        this.$store.dispatch('movie/getSearchMovie', { keyword: this.keyword, page: this.pageData });
      }
    },
  },
};
</script>
