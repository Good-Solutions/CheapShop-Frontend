<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex row align-center class="pa-10">
      <v-card>
        <v-container :item="this.item">
          <v-row align="center">
            <v-col md="6">
              <v-img
                src="https://gruposaedal.com/wp-content/uploads/2022/01/La-escasez-de-GPU-deberia-terminar-en-2022-dice-NVIDIA.jpg"
                width="800"
                height="300"
              ></v-img>
              </v-col>
            <v-col md="6" align="center">
              <v-row>
                <v-col md="6"> {{item.name}}</v-col>
                <v-col md="6"> Precio </v-col>
                <v-card-text>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </v-card-text>
                <v-col md="6"> 11/12 </v-col>
                <v-col md="6">
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

export default {
  name: "product-detail",

  methods: {
    retrieveProduct(id) {
      ProductsApiService.get(id)
          .then((response) => {
            this.item = response.data.content;
          })
          .catch(e => {
            console.log((e));
          })
    }
  },
  created() {
    this.retrieveProduct(this.$route.params.id);
  }
}
</script>

<style scoped></style>