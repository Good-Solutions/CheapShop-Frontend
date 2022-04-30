<template>
  <v-container>
    <v-data-iterator
        :items="displayProducts">

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
          >
            <v-card>
              <v-img
                  height="250"
                  src='Url aqui'
              ></v-img>
              <v-card-title> {{ item.name }} </v-card-title>
              <v-divider></v-divider>
              <v-card-title class="grey--text ms-4"> $ {{item.price}}</v-card-title>
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
  name: "home",
  data() {
    return {
      products: [],
      displayProducts: []
    }
  },

  methods: {
    retrieveProducts() {
      ProductApiService.getAll()
          .then(response => {
            this.products = response.data;
            this.displayProducts = response.data.map(this.getDisplayProduct);
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

  },
  mounted() {
    this.retrieveProducts();
  }
}

</script>