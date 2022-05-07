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
                <v-card-text> {{ user.firstname }} {{user.lastname}}</v-card-text>
                <v-card-text> Dirección: {{user.delivery_address}}</v-card-text>
                <v-card-text> Número: {{user.phone_number}}</v-card-text>
                <v-card-text> Dinero: {{user.money}}</v-card-text>
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
        delivery_address: 'delivery_address',
        date_of_birth:'birth_date',
        firstname:'firstname',
        lastname:'lastname',
        money:'money',
        phone_number:'phone',
        postal_code:'postal',
      }
    }
  },

  methods: {
    retrieveProfile(id) {
      UserApiService.get(id)
          .then((response) => {
            this.product_item = response.data.content;
          })
          .catch(e => {
            console.log((e));
          })
    },
  },
  mounted() {
    this.retrieveProfile();
  }
}

</script>