<template>
  <v-container>
    <v-data-iterator
        :items="displayProfile"
        class="d-flex justify-center ma-4"
        :hide-default-footer="true"
    >
      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="auto"
          >
            <v-card
                width="250"
                align="left"
            >
              <v-col>
                <v-container>
                  <v-card-title>{{item.firstname }} {{item.lastname}}</v-card-title>
                  <v-card-text>Dirección: {{item.address}}</v-card-text>
                  <v-card-text>Código Postal: {{item.postal_code}}</v-card-text>
                  <v-card-text>Télefono: {{item.phone}}</v-card-text>
                </v-container>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </template>

    </v-data-iterator>
  </v-container>
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