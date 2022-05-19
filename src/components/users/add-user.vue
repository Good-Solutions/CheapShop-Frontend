<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add User</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.firstname" label="First Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.lastname" label="Last Name"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.postalCode" label="postalCode"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.address" label="address"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.money" label="money"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UsersApiService from "@/services/users-api.service";

export default {
  name: "add-user",
  data() {
    return {
      item: {
        id: 0,
        firstname: '',
        lastname:'',
        postalCode:'',
        address:'',
        phoneNumber:'',
        money:'',
      }
    }
  },
  methods: {

    save() {
      UsersApiService.create(this.item)
          .then(() => {
            this.navigateToUsers();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToUsers();
    },
    navigateToUsers() {
      this.$router.push({name: 'admin-users'});
    }
  }
}
</script>

<style scoped>

</style>
