<template>
  <v-app>
    <v-app-bar app dark fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>CheapShop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/home">Home</v-btn>
        <v-btn text to="/products">Admin - Products</v-btn>
        <v-btn text to="/orders">Admin - Orders</v-btn>
        <v-btn text to="/categories">Admin - Categories</v-btn>
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
