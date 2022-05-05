<template>
  <v-app app dark fixed>
    <v-card color="grey lighten-4" flat height="50px" tile>
      <v-app-bar dense dark>
        <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title > CheapShop </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title> Good Solutions </v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer" temporary dark width="200">
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-item-action>
              <v-list-item-title>{{link.text}}</v-list-item-title>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data() {
    return{
      drawer:false,
      links:[
        {text: 'Products', route: '/products'},
        {text: 'Categories', route: '/categories'},
        {text: 'Profile', route: '/profile'},

        {text: 'Admin-Products', route: '/admin-products'},
        {text: 'Admin-Categories', route: '/admin-categories'},
        {text: 'Admin-Orders', route: '/admin-orders'},
        {text: 'Admin-Users', route: '/admin-users'},
      ]
    }
  },
};
</script>