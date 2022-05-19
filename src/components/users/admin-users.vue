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
        {text: 'Postal Code', value: 'postalCode'},
        {text: 'Address', value: 'address'},
        {text: 'Phone Number', value: 'phoneNumber'},
        {text: 'Money', value: 'money'},
        {text: 'Actions', value: 'actions', sortable:false}
      ],
      users: [],
      displayUsers: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        firstname: '',
        lastname:'',
        postalCode:'',
        address:'',
        phoneNumber:'',
        money:'',
      },
      defaultItem: {
        id: 0,
        firstname: '',
        lastname:'',
        postalCode:'',
        address:'',
        phoneNumber:'',
        money:'',
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
        postalCode: user.postalCode,
        address: user.address,
        phoneNumber:user.phoneNumber,
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
