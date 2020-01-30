<template>
  <v-container fluid>
    <v-data-iterator
      :items="items.results"
      items-per-page.sync="getPageLength(items.results)"
      :page="items.page"
      hide-default-footer >

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="1"
            md="4"
            lg="4">
              <v-card >
                <progressive-img
                  class="white--text align-end"
                  :aspect-ratio="1"
                  :src="getPostPath(item.poster_path)"
                  :placeholder="getPlaceholderImg(item.poster_path)"
                  :blur="30"/>
                  <!--<img
                    class="white--text align-end img-movie"
                    :src="getPostPath(item.poster_path)"
                    :placeholder="getPlaceholderImg(item.poster_path)" />-->

                <v-card-title>{{ item.title }}</v-card-title>

                <v-card-text class="text--primary">
                  <v-row
                    align="center"
                    class="mx-0">
                    <v-rating
                      :value="getRating(item.vote_average)"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      length="5"
                      size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                      {{ item.vote_average }} ({{ item.vote_count }})
                    </div>
                  </v-row>

                  <div class="overview">
                    {{ item.overview | truncate(180) }}
                  </div>

                  <div class="genre">
                    <v-chip
                      class="ma-2"
                      small
                      v-for="(genre, index) in item.genre_ids"
                      :key="index"
                    >{{ getGenre(genre) }}</v-chip>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <router-link :to="{ name: 'movie', params: { movieId: item.id }}">
                    <v-btn
                      color="orange"
                      text>
                      More Info
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MovieList',
  props: ['items'],
  computed: mapState({
    genres: state => state.movie.genres,
  }),
  methods: {
    getPostPath(img) {
      return `http://image.tmdb.org/t/p/original/${img}`;
    },
    getPlaceholderImg(img) {
      return `http://image.tmdb.org/t/p/w154/${img}`;
    },
    getRating(val) {
      return val / 2;
    },
    getGenre(val) {
      const genre = this.genres.find(g => g.id === val);
      return genre.name;
    },
    getPageLength(page) {
      if (page) {
        return page.length;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
  .overview {
    min-height: 100px;
    height: 100px;
    max-height: 100px;
    margin-top: 10px;
  }

  .genre {
    min-height: 80px;
    max-height: 80px;
    height: 80px;
  }

  .img-movie {
    width: 80%;
    height: 80%;
  }
</style>
