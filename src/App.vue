<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-toolbar-title>CheapShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/products">Productos</v-btn>
        <v-btn text to="/admin-products">Admin - Productos</v-btn>

        <v-btn text to="/admin-orders">Admin - Ordenes</v-btn>

        <v-btn text to="/categories">Categorias</v-btn>
        <v-btn text to="/admin-categories">Admin - Categoria</v-btn>

        <v-btn text to="/profile">Profile</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
