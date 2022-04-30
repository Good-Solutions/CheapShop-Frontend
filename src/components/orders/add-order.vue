<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Order</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.user_Id" label="User Id" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.order_amount" label="Amount" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.purchase_date" label="Purchase Date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.delivery_date" label="Delivery Date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.delivery_address" label="Delivery Address"></v-text-field>
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
import OrdersApiService from "@/services/orders-api.service";

export default {
  name: "add-order",
  data() {
    return {
      item: {
        id: 0,
        user_Id: 0,
        order_amount: 0,
        purchase_date:'',
        delivery_date: '',
        delivery_address: ''
      }
    }
  },
  methods: {
    save() {
      OrdersApiService.create(this.item)
          .then(() => {
            this.navigateToOrders();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToOrders();
    },
    navigateToOrders() {
      this.$router.push({name: 'orders'});
    }
  }
}
</script>

<style scoped>

</style>