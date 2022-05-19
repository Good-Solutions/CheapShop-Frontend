<template>
  <v-layout align-center justify-center column fill-height>
    <v-flex row align-center class="pa-10">
      <v-card max-width="500">
        <v-container>
          <v-row align="center">
            <v-col md="7">
              <v-img
                  src="https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                  width="250"
                  height="150"
              />
            </v-col>
            <v-col md="5">
              <v-row>
                <v-card-title align="center"> {{user.firstname }} {{user.lastname}}</v-card-title>
                <v-card-text>
                  Postal Code: {{user.postalCode}} <br>
                  Address: {{user.address}} <br>
                  Phone: {{user.phoneNumber}} <br>
                  Money: {{user.money}}
                </v-card-text>
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
      user: {
        id: 0,
        firstname: 'firstname',
        lastname:'lastname',
        postalCode:'postalcode',
        address:'address',
        phoneNumber:'phone',
        money: 999,
      }
    }
  },

  methods: {
    retrieveProfile(id) {
      UserApiService.get(id)
          .then((response) => {
            this.user = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },
  },
  created() {
    this.retrieveProfile(this.$route.params.id);
  }
}

</script>