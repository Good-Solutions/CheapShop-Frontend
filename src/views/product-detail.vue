<template>
  <v-layout align-center justify-center column >
    <v-flex row align-center class="pa-10">
      <v-card>
        <v-container>
          <v-row align="center">
            <v-col md="6">
              <img v-bind:src="product_item.url_image" width="400" height="300"/>
              </v-col>
            <v-col md="6" align="center">
              <v-row>
                <v-col md="12">{{product_item.name}}</v-col>
                <v-col v-bind:key="getCategoryName(product_item)"></v-col>
                <v-col>${{product_item.price}}</v-col>
                <v-card-text>{{product_item.description}}</v-card-text>
                <v-col>Votos : {{product_item.vote_counter}} / {{product_item.minimum_to_sold}}</v-col>
                <v-col>
                  <v-btn color="secondary" elevation="6"> Comprar </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductsApiService from "@/services/products-api.service";
import CategoriesApiService from "@/services/categories-api.service";

export default {
  name: "product-detail",
  data() {
    return {
      product_item: {
        id: 0,
        name: 'Generic Product',
        price: 9999,
        description: 'Product Description',
        url_image:'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/overview/shop-2080-ti-300@2x.jpg',
        minimum_to_sold:999,
        vote_counter:99,
        category_id:99,
        supplier_id:99,
      },
      category_item:{
        id: 0,
        name: 'Generic Category',
        description: 'Category Description',
        url_image:'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/overview/shop-2080-ti-300@2x.jpg'
      }
    }
  },

  methods: {
    retrieveProduct(id) {
      ProductsApiService.get(id)
          .then((response) => {
            this.product_item = response.data.content;
          })
          .catch(e => {
            console.log((e));
          })
    },
    getCategoryName(id) {
      CategoriesApiService.get(id)
          .then((response) => {
            this.category_item = response.data.content;
          })
          .catch(e => {
            console.log((e));
          })
    }
  },
  created() {
    this.retrieveProduct(this.$route.params.id);
    this.getCategoryName(this.product_item.category_id)
  }
}
</script>

<style scoped></style>