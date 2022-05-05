<template>
  <v-container>
    <v-data-iterator
        :items="displayProducts"
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
              <v-divider></v-divider>
              <v-card-title class="grey--text ms-4"> $ {{item.price}}</v-card-title>
              <v-btn @click="navigateProductDetail(item.id)"></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
</template>

<script>
import ProductApiService from '../services/products-api.service';
export default {
  name: "products",
  data() {
    return{
      opts:[15,30,-1],
      products: [],
      displayProducts: []
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
        url_image:product.url_image
      };
    },

    refreshList() {
      this.retrieveProducts();
    },

    navigateProductDetail(id) {
      this.$router.push({name: 'product-detail', params: { id: id}});
    }

  },
  mounted() {
    this.retrieveProducts();
  }
}

</script>