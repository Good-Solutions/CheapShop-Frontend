<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Category</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Category Id" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.name" label="Category Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Category Description"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.url_image" label="URL Image"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CategoriesApiService from "@/services/categories-api.service";

export default {
  name: "edit-category",
  data() {
    return {
      item: {
        id: 0,
        name: '',
        description: '',
        url_image:'',
      }
    }
  },
  methods: {
    retrieveCategory(id) {
      CategoriesApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      CategoriesApiService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToCategories();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToCategories();
    },
    navigateToCategories() {
      this.$router.push({name: 'admin-categories'});
    }
  },
  created() {
    this.retrieveCategory(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
