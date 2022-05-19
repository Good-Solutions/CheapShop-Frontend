<template>
  <v-layout align-center justify-center column >
    <v-flex row align-center class="pa-10">
      <v-card width="1000">
        <v-container>
          <v-row align="center">
            <v-col md="6">
              <v-img
                  v-bind:src="product_item.url_image"
                  max-width="500"
                  max-height="500"
              />
            </v-col>
            <v-col md="6">
              <v-row>
                <v-col md="9">
                  <h2>{{product_item.name}}</h2>
                </v-col>
                <v-col md="3">
                  <h2>${{product_item.price}}</h2>
                </v-col>
              </v-row>
              <br>
              <div>
                <h3>Categoria: {{getCategoryName(product_item)}}</h3>
                <p>Descripcion: {{product_item.description}}</p>
              </div>
              <br>
              <v-row>
                <v-col md="8">
                  <h3>Votos: {{product_item.vote_counter}} de {{product_item.minimum_to_sold}}</h3>
                </v-col>
                <v-col md="4">
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
        price: 0,
        description: 'Product Description',
        url_image:'https://www.nvidia.com/content/dam/en-zz/Solutions/geforce/geforce-rtx-turing/overview/shop-2080-ti-300@2x.jpg',
        minimum_to_sold:0,
        vote_counter:0,
        category_id:0,
        supplier_id:0,
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
            this.product_item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },
    getCategoryName(id) {
      CategoriesApiService.get(id)
          .then((response) => {
            this.category_item = response.data;
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