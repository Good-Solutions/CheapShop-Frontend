<template>
  <v-card>
    <v-card-title>Orders<v-spacer></v-spacer>
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
                    :items="displayOrders"
                    :items-per-page="10"
                    :search="search"
                    class="elevation-1" ref="ordersTable">
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="navigateToEditOrder(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteOrder(item.id)">mdi-delete</v-icon>
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
          @click="navigateToAddOrder"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import OrderApiService from '../../services/orders-api.service';
export default {
  name: "admin-orders",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'User Id', value: 'user_id'},
        {text: 'Amount', value: 'order_amount'},
        {text: 'Purchase Date', value: 'purchase_date'},
        {text: 'Delivery Date', value: 'delivery_date'},
        {text: 'Delivery Address', value: 'delivery_address'},
        {text: 'Actions', value: 'actions', sortable:false},
      ],
      orders: [],
      displayOrders: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        user_id: 0,
        order_amount: '',
        purchase_date: '',
        delivery_date: '',
        delivery_address: ''
      },
      defaultItem: {
        id: 0,
        user_id: 0,
        order_amount: '',
        purchase_date: '',
        delivery_date: '',
        delivery_address: ''
      },
    }
  },

  methods: {
    retrieveOrders() {
      OrderApiService.getAll()
          .then(response => {
            this.orders = response.data;
            this.displayOrders = response.data.map(this.getDisplayOrder);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayOrder(order) {
      return {
        id: order.id,
        user_id:order.user_id,
        order_amount:order.order_amount,
        purchase_date:order.purchase_date,
        delivery_date:order.delivery_date,
        delivery_address:order.delivery_address
      };
    },

    refreshList() {
      this.retrieveOrders();
    },

    save() {
      if (this.editedIndex > -1) {
        this.orders[this.editedIndex] = this.editedItem;
        this.displayOrders[this.editedIndex] = this.getDisplayOrder(this.orders[this.editedIndex]);
        OrderApiService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        OrderApiService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.orders.push(item);
              this.displayOrders.push(this.getDisplayOrder(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteOrder(id) {
      OrderApiService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddOrder() {
      this.$router.push({name: 'add-order'});
    },

    navigateToEditOrder(id) {
      this.$router.push({name: 'edit-order', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveOrders();
  }
}
</script>
<style scoped>

</style>
