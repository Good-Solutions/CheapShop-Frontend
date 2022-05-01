<template>
  <v-container>
    <v-data-iterator
        :items="displayCategories"
        :footer-props="{'items-per-page-options':opts}"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="auto"
          >
            <v-card>
              <img v-bind:src="item.url_image" width="250" height="150"/>
              <v-card-title> {{ item.name }} </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
</template>

<script>
import CategoryApiService from '../services/categories-api.service';
export default {
  name: "categories",
  data() {
    return{
      opts:[15,30,-1],
      categories: [],
      displayCategories: []
    }
  },

  methods: {
    retrieveCategories() {
      CategoryApiService.getAll()
          .then(response => {
            this.categories = response.data;
            this.displayCategories = response.data.map(this.getDisplayCategory);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayCategory(category) {
      return {
        id: category.id,
        name: category.name,
        url_image:category.url_image
      };
    },

    refreshList() {
      this.retrieveCategories();
    },

  },
  mounted() {
    this.retrieveCategories();
  }
}

</script>