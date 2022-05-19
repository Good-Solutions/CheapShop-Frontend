<template>
  <v-card>
    <v-card-title>Products<v-spacer></v-spacer>
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
                    :items="displayProducts"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1" ref="productsTable">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="navigateToEditProduct(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteProduct(item.id)">mdi-delete</v-icon>
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
          @click="navigateToAddProduct"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProductApiService from '../../services/products-api.service';
export default {
  name: "admin-products",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Price', value: 'price'},
        {text: 'Description', value: 'description'},
        {text: 'URL Image', value: 'url_image'},
        {text: 'Minimum to Sold', value: 'minimum_to_sold'},
        {text: 'Vote Counter', value: 'vote_counter'},
        {text: 'Category Id', value: 'category_id'},
        {text: 'Supplier Id', value: 'supplier_id'},
        {text: 'Actions', value: 'actions', sortable:false}
      ],
      products: [],
      displayProducts: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        url_image:'',
        minimum_to_sold:0,
        vote_counter:0,
        category_id:0,
        supplier_id:0,
      },
      defaultItem: {
        id: 0,
        name: '',
        price: 0,
        description: '',
        url_image:'',
        minimum_to_sold:0,
        vote_counter:0,
        category_id:10,
        supplier_id:10,
      },
    }
  },

  methods: {
    retrieveProducts() {
      ProductApiService.getAll()
          .then(response => {
            this.products = response.data.content;
            this.displayProducts = response.data.content.map(this.getDisplayProduct);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProduct(product) {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        url_image:product.url_image,
        minimum_to_sold:product.minimum_to_sold,
        vote_counter:product.vote_counter,
        category_id:product.category_id,
        supplier_id:product.supplier_id
      };
    },

    refreshList() {
      this.retrieveProducts();
    },

    save() {
      if (this.editedIndex > -1) {
        this.products[this.editedIndex] = this.editedItem;
        this.displayProducts[this.editedIndex] = this.getDisplayProduct(this.products[this.editedIndex]);
        ProductApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        ProductApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.products.push(item);
              this.displayProducts.push(this.getDisplayProduct(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteProduct(id) {
      ProductApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddProduct() {
      this.$router.push({name: 'add-product'});
    },

    navigateToEditProduct(id) {
      this.$router.push({name: 'edit-product', params: { id: id}});
    }

  },
  mounted() {
    this.retrieveProducts();
  }
}

</script>

<style scoped>

</style>
