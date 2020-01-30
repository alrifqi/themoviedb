<template>
  <v-app-bar
    app
    color="grey darken-3"
    dark
    flat>
      <div class="d-flex align-center justify-center">
        <router-link :to="{ name: 'home' }">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/themoviedb.png"
            transition="scale-transition"
            width="40"/>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="search">
        <v-text-field
          v-model="keyword"
          v-on:keyup.enter="onEnter"
          placeholder="Search"
          filled
          dense
          rounded
          :shaped="false"
          :outlined="true"
          :solo="false"
          :single-line="false"
          :clearable="true"
          :persistent-hint="false"
          :loading="false"
          :flat="false"/>
      </div>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Headerbar',
  data: () => ({
    keyword: null,
  }),
  methods: {
    onEnter() {
      this.$store.dispatch('movie/getSearchMovie', { keyword: this.keyword, page: 1 });
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style>
  .search .v-input__control {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
</style>
