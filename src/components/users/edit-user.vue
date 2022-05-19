<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit User</span>
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
            <v-text-field v-model="item.postalCode" label="Postal Code"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.address" label="Address"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.phoneNumber" label="phoneNumber"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.money" label="Money"></v-text-field>
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
    name: "edit-user",
    data() {
      return {
        item: {
          id: 0,
          firstname: '',
          lastname:'',
          postalCode:'',
          dateOfBirth:'',
          address:'',
          phoneNumber:'',
          money:'',
        }
      }
    },
    methods: {
      retrieveUser(id) {
        UsersApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
            .catch(e => {
              console.log((e));
            })
      },
      save() {
        UsersApiService.update(this.item.id, this.item)
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
      },
    created() {
      this.retrieveUser(this.$route.params.id);
    }
  }
</script>