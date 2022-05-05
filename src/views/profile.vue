<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex row align-center class="pa-10">
      <v-card max-width="500" max-height="300">
        <v-container>
          <v-row align="center">
            <v-col md="6">
              <v-img
                  src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                  width="250"
                  height="150"
              ></v-img>
            </v-col>
            <v-col md="6" align="center">
              <v-row>
                <v-card-text> Nombre Apellido</v-card-text>
                <v-card-text> Dirección: </v-card-text>
                <v-card-text> Email: </v-card-text>
                <v-card-text> Número: </v-card-text>
                <v-card-text> Dinero: </v-card-text>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UserApiService from '../services/users-api.service';
export default {
  name: "profile",
  data() {
    return{
      profile: [],
      displayProfile: []
    }
  },

  methods: {
    retrieveProfile() {
      UserApiService.getAll()
          .then(response => {
            this.profile = response.data;
            this.displayProfile = response.data.map(this.getDisplayProfile);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProfile(profile) {
      return {
        id: profile.id,
        firstname: profile.firstname,
        lastname: profile.lastname,
        address: profile.address,
        email: profile.email,
        phone:profile.phone,
        postal_code:profile.postal_code
      };
    },

    refreshList() {
      this.retrieveProfile();
    },

  },
  mounted() {
    this.retrieveProfile();
  }
}

</script>