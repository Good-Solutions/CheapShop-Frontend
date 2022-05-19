<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Order</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Order Id" type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.delivery_date" label="Delivery Date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.delivery_address" label="Delivery Address"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.purchase_date" label="Purchase Date"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.quantity" label="Quantity"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.user_id" label="User Id"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.product_id" label="Product Id"></v-text-field>
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
  name: "edit-order",
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
    retrieveOrder(id) {
      OrdersApiService.get(id)
          .then((response) => {
            this.item = response.data;
          })
          .catch(e => {
            console.log((e));
          })
    },

    save() {
      OrdersApiService.update(this.item.id, this.item)
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
      this.$router.push({name: 'admin-orders'});
    }
  },
  created() {
    this.retrieveOrder(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>