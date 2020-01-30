<template>
  <v-app>
    <Headerbar />

    <v-progress-circular
      v-if="loading"
      indeterminate
      color="green"
    ></v-progress-circular>

    <v-content v-else>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Headerbar from '@/components/Header/Headerbar.vue';


export default {
  name: 'App',

  components: {
    Headerbar,
  },
  computed: {
    ...mapState({
      loading: state => state.movie.loading,
    }),
  },

  async mounted() {
    this.$store.dispatch('movie/getGenre');
  },

  data: () => ({
    //
  }),
};
</script>
