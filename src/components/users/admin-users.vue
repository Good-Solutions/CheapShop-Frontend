<template>
  <v-card>
    <v-card-title>Users<v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <!-- Tabla-->
    <v-card-text>
      <v-data-table :headers="headers"
                    :items="displayUsers"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1" ref="usersTable">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="navigateToEditUser(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <!-- Add Button-->
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          x-small
          @click="navigateToAddUser"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserApiService from '../../services/users-api.service';
export default {
  name: "admin-users",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Firstname', value: 'firstname'},
        {text: 'Lastname', value: 'lastname'},
        {text: 'Birth Date', value: 'date_of_birth'},
        {text: 'Delivery Address', value: 'delivery_address'},
        {text: 'Postal Code', value: 'postal_code'},
        {text: 'Phone Number', value: 'phone_number'},
        {text: 'Money', value: 'money'},
        {text: 'Actions', value: 'actions', sortable:false}
      ],
      users: [],
      displayUsers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        delivery_address: '',
        date_of_birth:'',
        firstname:'',
        lastname:'',
        money:'',
        phone_number:'',
        postal_code:'',
      },
      defaultItem: {
        id: 0,
        delivery_address: '',
        date_of_birth:'',
        firstname:'',
        lastname:'',
        money:'',
        phone_number:'',
        postal_code:'',
      },
    }
  },

  methods: {
    retrieveUsers() {
      UserApiService.getAll()
          .then(response => {
            this.users = response.data.content;
            this.displayUsers = response.data.content.map(this.getDisplayUser);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayUser(user) {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        delivery_address: user.delivery_address,
        postal_code:user.postal_code,
        phone_number: user.phone_number,
        date_of_birth:user.date_of_birth,
        money:user.money,
      };
    },

    refreshList() {
      this.retrieveUsers();
    },

    save() {
      if (this.editedIndex > -1) {
        this.users[this.editedIndex] = this.editedItem;
        this.displayUsers[this.editedIndex] = this.getDisplayUser(this.users[this.editedIndex]);
        UserApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        UserApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.users.push(item);
              this.displayUsers.push(this.getDisplayUser(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteUser(id) {
      UserApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddUser() {
      this.$router.push({name: 'add-user'});
    },

    navigateToEditUser(id) {
      this.$router.push({name: 'edit-user', params: { id: id}});
    }

  },
  mounted() {
    this.retrieveUsers();
  }
}

</script>

<style scoped>

</style>
