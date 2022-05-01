<template>
  <v-card>
    <v-card-title>Categories<v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <!-- Tabla-->
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displayCategories"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1" ref="categoriesTable">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="navigateToEditCategory(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteCategory(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <!-- Add Button-->
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          x-small
          @click="navigateToAddCategory"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CategoryApiService from '../../services/categories-api.service';
export default {
  name: "admin-categories",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'URL Image', value: 'url_image'},
        {text: 'Actions', value: 'actions', sortable:false}
      ],
      categories: [],
      displayCategories: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        url_image:''
      },
      defaultItem: {
        id: 0,
        name: '',
        url_image:''
      },
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

    save() {
      if (this.editedIndex > -1) {
        this.categories[this.editedIndex] = this.editedItem;
        this.displayCategories[this.editedIndex] = this.getDisplayCategory(this.categories[this.editedIndex]);
        CategoryApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        CategoryApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.categories.push(item);
              this.displayCategories.push(this.getDisplayCategory(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteCategory(id) {
      CategoryApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddCategory() {
      this.$router.push({name: 'add-category'});
    },

    navigateToEditCategory(id) {
      this.$router.push({name: 'edit-category', params: { id: id}});
    }

  },
  mounted() {
    this.retrieveCategories();
  }
}

</script>

<style scoped>

</style>
